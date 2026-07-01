import { Component, computed, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Theming } from '@libs/core';

@Component({
  selector: 'ui-theme-toggle',
  imports: [MatIcon],
  template: `
    <button
      class="group relative grid size-10 cursor-pointer place-items-center overflow-hidden rounded-full text-gray-950 transition-colors duration-300 hover:bg-gray-950/5 focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:outline-none dark:text-gray-50 dark:hover:bg-white/10 dark:focus-visible:ring-gray-50 dark:focus-visible:ring-offset-zinc-900"
      type="button"
      [attr.aria-label]="scheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
      [attr.title]="scheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
      (click)="updateScheme()">
      <span
        class="absolute inset-1 rounded-full bg-gray-950/5 opacity-0 scale-50 transition duration-300 group-hover:scale-100 group-hover:opacity-100 dark:bg-white/10"></span>
      <span
        class="absolute transition duration-300 ease-out"
        [class.rotate-0]="scheme() === 'dark'"
        [class.scale-100]="scheme() === 'dark'"
        [class.opacity-100]="scheme() === 'dark'"
        [class.rotate-90]="scheme() !== 'dark'"
        [class.scale-50]="scheme() !== 'dark'"
        [class.opacity-0]="scheme() !== 'dark'">
        <mat-icon svgIcon="sun-moon" class="size-5 inline-block" />
      </span>
      <span
        class="absolute transition duration-300 ease-out"
        [class.rotate-0]="scheme() !== 'dark'"
        [class.scale-100]="scheme() !== 'dark'"
        [class.opacity-100]="scheme() !== 'dark'"
        [class.-rotate-90]="scheme() === 'dark'"
        [class.scale-50]="scheme() === 'dark'"
        [class.opacity-0]="scheme() === 'dark'">
        <mat-icon svgIcon="moon" class="size-5 inline-block" />
      </span>
    </button>
  `
})
export class ThemeToggle {
  private theming = inject(Theming);

  protected scheme = computed(() => this.theming.scheme());

  updateScheme() {
    this.theming.scheme.update((sc) => (sc === 'light' ? 'dark' : 'light'));
  }
}
