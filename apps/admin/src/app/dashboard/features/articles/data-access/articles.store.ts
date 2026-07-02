import { computed, inject } from '@angular/core';
import { decrementTotal, getApiErrorMessage } from '@libs/utils';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, exhaustMap, finalize, map, of, pipe, switchMap, tap } from 'rxjs';
import { IArticle, IArticleQuery, IArticlesState, IDeleteArticlePayload, ISaveArticlePayload } from '../interfaces';
import { ArticlesService } from './articles.service';

const initialState: IArticlesState = {
  article: null,
  data: [[], 0],
  error: null,
  isLoading: false,
  isSaving: false,
  success: null
};

function matchesArticleQuery(article: IArticle, query?: IArticleQuery): boolean {
  const search = query?.q?.toString().trim().toLowerCase();
  const matchesSearch =
    !search ||
    article.title.toLowerCase().includes(search) ||
    article.summary.toLowerCase().includes(search) ||
    article.content?.toLowerCase().includes(search);
  const matchesTag = !query?.tagId || article.tags.some((tag) => tag.id === query.tagId);
  const matchesStatus =
    !query?.status ||
    query.status === 'all' ||
    (query.status === 'published' && article.published) ||
    (query.status === 'draft' && !article.published);

  return Boolean(matchesSearch && matchesTag && matchesStatus);
}

export const ArticlesStore = signalStore(
  withState(initialState),
  withComputed(({ data }) => ({
    articles: computed(() => data()[0]),
    total: computed(() => data()[1])
  })),
  withProps(() => ({
    articlesService: inject(ArticlesService)
  })),
  withMethods(({ articlesService, ...store }) => ({
    loadArticle: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { article: null, error: null, isLoading: true })),
        exhaustMap((articleId) =>
          articlesService.findOne(articleId).pipe(
            tap((article) => patchState(store, { article })),
            catchError((error: Error) => {
              patchState(store, { error: getApiErrorMessage(error, 'Unable to load the article') });
              return of(null);
            }),
            finalize(() => patchState(store, { isLoading: false }))
          )
        )
      )
    ),
    loadArticles: rxMethod<IArticleQuery>(
      pipe(
        tap(() => patchState(store, { error: null, isLoading: true })),
        exhaustMap((query) =>
          articlesService.findAll(query).pipe(
            tap((data) => patchState(store, { data })),
            catchError(() => {
              patchState(store, { data: [[], 0] });
              return of(null);
            }),
            finalize(() => patchState(store, { isLoading: false }))
          )
        )
      )
    ),
    deleteArticle: rxMethod<IDeleteArticlePayload>(
      pipe(
        tap(() => patchState(store, { error: null, success: null })),
        exhaustMap(({ articleId }) =>
          articlesService.delete(articleId).pipe(
            tap(() => {
              const [articles, total] = store.data();
              const nextArticles = articles.filter((article) => article.id !== articleId);
              const wasDeleted = nextArticles.length !== articles.length;

              patchState(store, {
                data: [nextArticles, wasDeleted ? decrementTotal(total) : total],
                success: 'Article deleted.'
              });
            }),
            catchError((error: Error) => {
              patchState(store, { error: getApiErrorMessage(error, 'Unable to delete the article') });
              return of(null);
            })
          )
        )
      )
    ),
    saveArticle: rxMethod<ISaveArticlePayload>(
      pipe(
        tap(() => patchState(store, { error: null, isSaving: true, success: null })),
        exhaustMap(({ articleId, cover, payload, query }) => {
          const request = articleId ? articlesService.update(articleId, payload) : articlesService.create(payload);

          return request.pipe(
            switchMap((savedArticle) =>
              cover
                ? articlesService.uploadCover(savedArticle.id, cover).pipe(
                    map((articleWithCover) => ({
                      article: articleWithCover,
                      uploadFailed: false
                    })),
                    catchError((error: Error) => {
                      patchState(store, {
                        error: getApiErrorMessage(
                          error,
                          'Article saved, but the cover could not be uploaded. Try replacing the cover again.'
                        )
                      });
                      return of({ article: savedArticle, uploadFailed: true });
                    })
                  )
                : of({ article: savedArticle, uploadFailed: false })
            ),
            tap(({ article, uploadFailed }) => {
              const [articles, total] = store.data();

              if (articleId) {
                const articleExists = articles.some((item) => item.id === articleId);
                const nextArticles = matchesArticleQuery(article, query)
                  ? articles.map((item) => (item.id === articleId ? article : item))
                  : articles.filter((item) => item.id !== articleId);

                patchState(store, {
                  article,
                  data: [
                    nextArticles,
                    articleExists && !matchesArticleQuery(article, query) ? decrementTotal(total) : total
                  ],
                  success: uploadFailed ? null : 'Article updated.'
                });

                return;
              }

              patchState(store, {
                article,
                data: matchesArticleQuery(article, query) ? [[article, ...articles], total + 1] : [articles, total],
                success: uploadFailed ? null : 'Article created.'
              });
            }),
            catchError((error: Error) => {
              patchState(store, {
                error: getApiErrorMessage(
                  error,
                  articleId ? 'Unable to update the article' : 'Unable to create the article'
                )
              });
              return of(null);
            }),
            finalize(() => patchState(store, { isSaving: false }))
          );
        })
      )
    ),
    clearArticle(): void {
      patchState(store, { article: null });
    },
    clearMessages(): void {
      patchState(store, { error: null, success: null });
    }
  }))
);
