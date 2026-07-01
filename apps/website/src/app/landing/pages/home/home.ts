import { Component } from '@angular/core';
import { About } from '../../ui/about/about';
import { Contact } from '../../ui/contact/contact';
import { Footer } from '../../ui/footer/footer';
import { Hero } from '../../ui/hero/hero';
import { Projects } from '../../ui/projects/projects';
import { Services } from '../../ui/services/services';
import { Skills } from '../../ui/skills/skills';
import { WorkStyle } from '../../ui/work-style/work-style';
import { ThemeToggle } from '@libs/ui';

@Component({
  selector: 'app-home',
  imports: [About, Contact, Footer, Hero, Projects, Services, Skills, WorkStyle, ThemeToggle],
  templateUrl: './home.html'
})
export class Home {}
