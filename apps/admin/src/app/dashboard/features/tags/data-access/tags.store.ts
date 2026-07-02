import { computed, inject } from '@angular/core';
import { decrementTotal, getApiErrorMessage } from '@libs/utils';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, exhaustMap, finalize, of, pipe, tap } from 'rxjs';
import { IDeleteTagPayload, ISaveTagPayload, ITag, ITagQuery, ITagsState } from '../interfaces';
import { TagsService } from './tags.service';

const initialState: ITagsState = {
  data: [[], 0],
  error: null,
  isLoading: false,
  success: null
};

function matchesTagQuery(tag: ITag, query?: ITagQuery): boolean {
  const search = query?.q?.toString().trim().toLowerCase();

  return !search || tag.name.toLowerCase().includes(search);
}

export const TagsStore = signalStore(
  withState(initialState),
  withComputed(({ data }) => ({
    tags: computed(() => data()[0]),
    total: computed(() => data()[1])
  })),
  withProps(() => ({
    tagsService: inject(TagsService)
  })),
  withMethods(({ tagsService, ...store }) => ({
    loadTags: rxMethod<ITagQuery>(
      pipe(
        tap(() => patchState(store, { error: null, isLoading: true })),
        exhaustMap((query) =>
          tagsService.findAll(query).pipe(
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
    deleteTag: rxMethod<IDeleteTagPayload>(
      pipe(
        tap(() => patchState(store, { error: null, success: null })),
        exhaustMap(({ tagId }) =>
          tagsService.delete(tagId).pipe(
            tap(() => {
              const [tags, total] = store.data();
              const nextTags = tags.filter((tag) => tag.id !== tagId);
              const wasDeleted = nextTags.length !== tags.length;

              patchState(store, {
                data: [nextTags, wasDeleted ? decrementTotal(total) : total],
                success: 'Tag deleted.'
              });
            }),
            catchError((error: Error) => {
              patchState(store, { error: getApiErrorMessage(error, 'Unable to delete the tag') });
              return of(null);
            })
          )
        )
      )
    ),
    saveTag: rxMethod<ISaveTagPayload>(
      pipe(
        tap(() => patchState(store, { error: null, success: null })),
        exhaustMap(({ payload, query, tagId }) => {
          const request = tagId ? tagsService.update(tagId, payload) : tagsService.create(payload);

          return request.pipe(
            tap((savedTag) => {
              const [tags, total] = store.data();

              if (tagId) {
                const tagExists = tags.some((tag) => tag.id === tagId);
                const nextTags = matchesTagQuery(savedTag, query)
                  ? tags.map((tag) => (tag.id === tagId ? savedTag : tag))
                  : tags.filter((tag) => tag.id !== tagId);

                patchState(store, {
                  data: [nextTags, tagExists && !matchesTagQuery(savedTag, query) ? decrementTotal(total) : total],
                  success: 'Tag updated.'
                });

                return;
              }

              patchState(store, {
                data: matchesTagQuery(savedTag, query) ? [[savedTag, ...tags], total + 1] : [tags, total],
                success: 'Tag created.'
              });
            }),
            catchError((error: Error) => {
              patchState(store, {
                error: getApiErrorMessage(error, tagId ? 'Unable to update the tag' : 'Unable to create the tag')
              });
              return of(null);
            })
          );
        })
      )
    ),
    clearMessages(): void {
      patchState(store, { error: null, success: null });
    }
  }))
);
