import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Designer } from 'src/app/models/designer';
import { CatalystService } from 'src/app/services/catalyst.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListDesignersComponent implements OnInit {

  Designer: Designer[] = [];
  searchText: any;
  sidePanel: boolean = true;
  searchBar = false;

  active: boolean;
  @Output() sidePanelEvent = new EventEmitter<boolean>();
  @ViewChild("card", {static: false}) card: ElementRef;

  constructor(
    private catalystService: CatalystService,
    private router: Router
  ) { 
  }

  ngOnInit(){
    this.catalystService.currentBarValue.subscribe(searchBar => this.searchBar = searchBar)

    this.catalystService.getDesignersList().subscribe(res =>{ this.Designer = res.map( e => { return {
        id : e.payload.doc.id,
        ...e.payload.doc.data() as{}
        } as Designer;
        })
      });
    }

    removeDesigner(Designer: Designer) {
      if(confirm("Are you sure to delete " + Designer.name)){
        this.catalystService.deleteDesigner(Designer);
      }
    }

    editDesigner(Designer: Designer) {
      this.sidePanelEvent.emit(this.sidePanel);
      this.router.navigate(['/edit/:id', { id: Designer.id }]);
      console.log(this.sidePanel)
    }

    previousIndex: number = -1;
    public details: boolean = false;

    viewDesigner(index) {
    if (this.previousIndex >= 0 && this.previousIndex != index) {
      this.Designer[this.previousIndex].details = false;
    }

    // Updating index
    this.previousIndex = index;
    this.Designer[index].details = !this.Designer[index].details;
   }

   hideSearchBar() {
    this.catalystService.changeBarValue(false);
  }

  }
