import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { projects } from '../../data';

@Component({
  selector: 'projects',
  imports: [MatIcon, NgClass],
  templateUrl: './projects.html'
})
export class Projects {
  readonly projects = projects;
}
