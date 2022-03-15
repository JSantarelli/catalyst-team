import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalystService } from '../../../services/catalyst.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router'

// Firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Designer {
  id: string;
  name: string;
  lastName: string;
  location: string;
  lat: number;
  lng: number;
  email: string;
  phone: string;
  photo: string;
  guild: string;
  skills: string;
  otherSkill: string;
  verticals: string;
  otherVertical: string;
  tools: string;
  otherTool: string;
  interests: string;
  projects: string;
  goToPerson: string;
  bio: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailDesignerComponent implements OnInit {

  public editForm: FormGroup;
  designerRef: any;
  
  form: FormGroup;
  public designerForm: FormGroup;

  public designerList: Designer[];

  constructor(
    public designerService: CatalystService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    
  ) {
    this.editForm = this.formBuilder.group({
      name: [''],
      lastName: [''],
      location: [''],
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

  ngOnInit() {

    const id = this.act.snapshot.paramMap.get('id');

    this.designerService.getDesignerDoc(id).subscribe(res => {
      this.designerRef = res;
      this.editForm = this.formBuilder.group({
        name:[this.designerRef.name],
        lastName:[this.designerRef.lastName],
        location:[this.designerRef.location],
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
}