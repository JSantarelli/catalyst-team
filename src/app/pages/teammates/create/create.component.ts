import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CatalystService } from '../../../services/catalyst.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateDesignerComponent implements OnInit {
  
  form: FormGroup;
  public designerForm: FormGroup;
  countries: any;
  cities: any;
  selectedCountry: any = {
      id: 0, name: ''
    };
  selectedCity: any = {
    id: 0, name: ''
  };
  dropdownCity: any = [];
  moreSkills = false;

  constructor(
    public designerService: CatalystService,
    private formBuilder: FormBuilder,
    public router: Router
  ) {
    this.designerForm = this.formBuilder.group({
      name: [''],
      lastName: [''],
      country: [''],
      city: [''],
      email: [''],
      phone: [''],
      photo: [''],
      guild: [''],
      skills: this.formBuilder.array([], [Validators.required]),
      verticals: [''],
      otherSkill: [''],
      otherVertical: [''],
      tools: this.formBuilder.array([], [Validators.required]),
      otherTool: [''],
      interests: [''],
      projects: [''],
      goToPerson: [''],
      bio: ['']
    })
  }

  ngOnInit(): void {
    // this.showAll();
    // this.onSelect(this.selectedCountry.id);
  }

  showAll() {
    this.designerService.getAll().subscribe(
    (data:any)=> {
      this.countries = data;
      console.log(this.countries)
    }
    )
  }

  onSelect(value) {
    this.dropdownCity = this.designerService.cities.filter(i => i.country == value);
  }

  onCheckboxChange(e) {
    const skills: FormArray = this.designerForm.get('skills') as FormArray;
    if (e.target.checked) {
      skills.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      skills.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          skills.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onToolsChange(e) {
    const tools: FormArray = this.designerForm.get('tools') as FormArray;
    if (e.target.checked) {
      tools.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      tools.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          tools.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  
  showMore() {
    this.moreSkills = !this.moreSkills;
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.designerForm.value)

    this.designerService.createDesigner(this.designerForm.value);
    this.router.navigate(['list-designer']);
  }

}
