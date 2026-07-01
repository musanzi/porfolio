import { Component } from '@angular/core';
import { services } from '../../data';

@Component({
  selector: 'services',
  templateUrl: './services.html'
})
export class Services {
  readonly services = services;
}
