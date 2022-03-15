import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'catalyst-team';
  sidePanel = false;

  receiveSidePanel($event) {
    this.sidePanel = $event;
  }

  toggleSidepanel() {
    this.sidePanel = !this.sidePanel;
  }

  closeSidepanel() {
    if(this.sidePanel = true) {
      this.sidePanel = false;
    }
  }

}
