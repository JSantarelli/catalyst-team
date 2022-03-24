import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CatalystService } from '../../../services/catalyst.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditDesignerComponent implements OnInit {
  public editForm: FormGroup;
  designerRef: any;
  
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

  constructor(
    public catalystService: CatalystService,
    public formBuilder: FormBuilder,
    private router: Router,
    private act: ActivatedRoute
  ) {
    this.editForm = this.formBuilder.group({
      name: [''],
      lastName: [''],
      country: [''],
      city: [''],
      email: [''],
      phone: [''],
      photo: [''],
      guild: [''],
      skills: this.formBuilder.array([], [Validators.required]),
      otherSkill: [''],
      verticals: [''],
      otherVertical: [''],
      tools: this.formBuilder.array([], [Validators.required]),
      otherTool: [''],
      interests: [''],
      projects: [''],
      goToPerson: [''],
      bio: ['']
    })
   }
   
   onSelect(value) {
    this.dropdownCity = this.catalystService.cities.filter(i => i.country == value);
  }

  ngOnInit() {
    const id = this.act.snapshot.paramMap.get('id');

    this.catalystService.getDesignerDoc(id).subscribe(res => {
      this.designerRef = res;
      this.editForm = this.formBuilder.group({
        name:[this.designerRef.name],
        lastName:[this.designerRef.lastName],
        country:[this.designerRef.country],
        city:[this.designerRef.city],
        email:[this.designerRef.email],
        phone:[this.designerRef.phone],
        photo:[this.designerRef.photo],
        guild:[this.designerRef.guild],
        skills:[this.designerRef.skills],
        otherSkill: [this.designerRef.otherSkill],
        verticals: [this.designerRef.verticals],
        otherVertical: [this.designerRef.otherVertical],
        tools: [this.designerRef.tools],
        otherTool: [this.designerRef.otherTool],
        interests: [this.designerRef.interests],
        projects: [this.designerRef.projects],
        goToPerson: [this.designerRef.goToPerson],
        bio:[this.designerRef.bio],
      })
    })
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

  onSubmit() {
    const id = this.act.snapshot.paramMap.get('id');
    this.catalystService.updateDesigner(this.editForm.value, id);
    this.router.navigate(['list-designer']);
  }

}
