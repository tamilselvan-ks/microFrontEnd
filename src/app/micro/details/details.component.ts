import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { Select } from 'primeng/select';
import { DetailsService } from '../service/details.service';
import { Router } from '@angular/router';

interface genders {
  gender: string;
  code: string;
}
@Component({
  selector: 'app-details',
  imports: [CommonModule,ToastModule,FormsModule,ReactiveFormsModule,DropdownModule,Select],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  providers:[MessageService,]
})

export class DetailsComponent {
  detailsForm! : FormGroup;
  gender : genders[] | undefined;
  allUsers:any[] = []
  constructor(
    private formDetails:FormBuilder,private detailsService :DetailsService, private messageService : MessageService,private route : Router
  ) {}
  ngOnInit() {
    this.detailsForm = this.formDetails.group({
      gender: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      userId :new FormControl('', [Validators.required])
    });
    this.getAllUserDetails();
    this.gender = [
      { gender: 'Male', code: 'M' },
      { gender: 'Female', code: 'FM' },
      { gender: 'Other', code: 'O' },
      
  ];


  }
addUserDetails(){
  if(this.detailsForm.valid){
    
    
    this.detailsService.addUserDetails(this.detailsForm.value).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User Added Successfully',
        });
        this.detailsForm.reset();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        })
      }
    })
      
     
  
}

  }
  getAllUserDetails() {
    this.detailsService.getAllUsers().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.allUsers = response.map((user: any) => ({
            label: user.name, // Display name in dropdown
            value: user.id,   // Store user ID as value
          }));
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
  backToRegister(){
this.route.navigateByUrl('/');
  }
  
}

