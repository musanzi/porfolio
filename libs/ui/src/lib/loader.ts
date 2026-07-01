import { Component } from '@angular/core';

@Component({
  selector: 'ui-loader',
  template: `<div
    class="fixed inset-0 z-50 grid place-items-center bg-gray-50 text-gray-950 dark:bg-zinc-800 dark:text-gray-50"
    role="status"
    aria-live="polite"
    aria-label="Loading Wilfried Musanzi portfolio">
    <div class="grid justify-items-center gap-6">
      <div class="relative grid size-28 place-items-center">
        <span
          class="absolute inset-0 rounded-full border border-gray-200 dark:border-zinc-700"
          aria-hidden="true"></span>
        <span
          class="absolute inset-0 rounded-full border-2 border-transparent border-t-gray-950 border-r-gray-950 animate-spin motion-reduce:animate-none dark:border-t-gray-50 dark:border-r-gray-50"
          aria-hidden="true"></span>
        <span
          class="grid size-22 place-items-center overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm dark:border-zinc-600 dark:bg-zinc-700"
          aria-hidden="true">
          <img class="size-full object-cover object-[50%_17%]" src="/wilfried.jpeg" width="853" height="1280" alt="" />
        </span>
      </div>

      <div class="h-1 w-36 overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-700" aria-hidden="true">
        <span class="app-loader-progress block h-full w-16 rounded-full bg-gray-950 dark:bg-gray-50"></span>
      </div>

      <span class="sr-only">Loading Wilfried Musanzi portfolio</span>
    </div>
  </div> `
})
export class Loader {}
