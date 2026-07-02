import { computed, inject } from '@angular/core';
import { decrementTotal, getApiErrorMessage } from '@libs/utils';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, exhaustMap, finalize, map, of, pipe, switchMap, tap } from 'rxjs';
import { IDeleteProjectPayload, IProject, IProjectQuery, IProjectsState, ISaveProjectPayload } from '../interfaces';
import { ProjectsService } from './projects.service';

const initialState: IProjectsState = {
  data: [[], 0],
  error: null,
  isLoading: false,
  isSaving: false,
  project: null,
  success: null
};

function matchesProjectQuery(project: IProject, query?: IProjectQuery): boolean {
  const search = query?.q?.toString().trim().toLowerCase();

  return !search || project.name.toLowerCase().includes(search) || project.summary.toLowerCase().includes(search);
}

export const ProjectsStore = signalStore(
  withState(initialState),
  withComputed(({ data }) => ({
    projects: computed(() => data()[0]),
    total: computed(() => data()[1])
  })),
  withProps(() => ({
    projectsService: inject(ProjectsService)
  })),
  withMethods(({ projectsService, ...store }) => ({
    loadProject: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { error: null, isLoading: true, project: null })),
        exhaustMap((projectId) =>
          projectsService.findOne(projectId).pipe(
            tap((project) => patchState(store, { project })),
            catchError((error: Error) => {
              patchState(store, { error: getApiErrorMessage(error, 'Unable to load the project') });
              return of(null);
            }),
            finalize(() => patchState(store, { isLoading: false }))
          )
        )
      )
    ),
    loadProjects: rxMethod<IProjectQuery>(
      pipe(
        tap(() => patchState(store, { error: null, isLoading: true })),
        exhaustMap((query) =>
          projectsService.findAll(query).pipe(
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
    deleteProject: rxMethod<IDeleteProjectPayload>(
      pipe(
        tap(() => patchState(store, { error: null, success: null })),
        exhaustMap(({ projectId }) =>
          projectsService.delete(projectId).pipe(
            tap(() => {
              const [projects, total] = store.data();
              const nextProjects = projects.filter((project) => project.id !== projectId);
              const wasDeleted = nextProjects.length !== projects.length;

              patchState(store, {
                data: [nextProjects, wasDeleted ? decrementTotal(total) : total],
                success: 'Project deleted.'
              });
            }),
            catchError((error: Error) => {
              patchState(store, { error: getApiErrorMessage(error, 'Unable to delete the project') });
              return of(null);
            })
          )
        )
      )
    ),
    saveProject: rxMethod<ISaveProjectPayload>(
      pipe(
        tap(() => patchState(store, { error: null, isSaving: true, success: null })),
        exhaustMap(({ image, payload, projectId, query }) => {
          const request = projectId ? projectsService.update(projectId, payload) : projectsService.create(payload);

          return request.pipe(
            switchMap((savedProject) =>
              image
                ? projectsService.uploadImage(savedProject.id, image).pipe(
                    map((projectWithImage) => ({
                      project: projectWithImage,
                      uploadFailed: false
                    })),
                    catchError((error: Error) => {
                      patchState(store, {
                        error: getApiErrorMessage(
                          error,
                          'Project saved, but the image could not be uploaded. Try replacing the image again.'
                        )
                      });
                      return of({ project: savedProject, uploadFailed: true });
                    })
                  )
                : of({ project: savedProject, uploadFailed: false })
            ),
            tap(({ project, uploadFailed }) => {
              const [projects, total] = store.data();

              if (projectId) {
                const projectExists = projects.some((item) => item.id === projectId);
                const nextProjects = matchesProjectQuery(project, query)
                  ? projects.map((item) => (item.id === projectId ? project : item))
                  : projects.filter((item) => item.id !== projectId);

                patchState(store, {
                  data: [
                    nextProjects,
                    projectExists && !matchesProjectQuery(project, query) ? decrementTotal(total) : total
                  ],
                  project,
                  success: uploadFailed ? null : 'Project updated.'
                });

                return;
              }

              patchState(store, {
                data: matchesProjectQuery(project, query) ? [[project, ...projects], total + 1] : [projects, total],
                project,
                success: uploadFailed ? null : 'Project created.'
              });
            }),
            catchError((error: Error) => {
              patchState(store, {
                error: getApiErrorMessage(
                  error,
                  projectId ? 'Unable to update the project' : 'Unable to create the project'
                )
              });
              return of(null);
            }),
            finalize(() => patchState(store, { isSaving: false }))
          );
        })
      )
    ),
    clearMessages(): void {
      patchState(store, { error: null, success: null });
    },
    clearProject(): void {
      patchState(store, { project: null });
    }
  }))
);
