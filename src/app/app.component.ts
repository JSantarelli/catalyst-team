import { Component } from '@angular/core';
import { CatalystService } from 'src/app/services/catalyst.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'catalyst-team';
  sidePanel = false;
  searchBar = false;

  constructor(
    private catalystService: CatalystService
  ) { 
  }

  ngOnInit(){
    this.catalystService.currentBarValue.subscribe(searchBar => this.searchBar = searchBar)
  }

  receiveSidePanel($event) {
    this.sidePanel = $event;
  }

  toggleSidepanel() {
    this.sidePanel = !this.sidePanel;
  }

  newBarValue() {
    this.catalystService.changeBarValue(true);
  }

  closeSidepanel() {
    if(this.sidePanel = true) {
      this.sidePanel = false;
    }
  }
}
