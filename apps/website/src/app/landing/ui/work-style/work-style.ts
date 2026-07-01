import { Component } from '@angular/core';
import { workPrinciples } from '../../data';

@Component({
  selector: 'work-style',
  templateUrl: './work-style.html'
})
export class WorkStyle {
  readonly workPrinciples = workPrinciples;
}
