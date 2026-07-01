import { Component } from '@angular/core';
import { skillGroups } from '../../data';

@Component({
  selector: 'skills',
  templateUrl: './skills.html'
})
export class Skills {
  readonly skillGroups = skillGroups;
}
