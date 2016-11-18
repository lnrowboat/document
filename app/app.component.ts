import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <div class="header-bar"></div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
}
