import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { RegisterService } from '../service/register.service';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import {  TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { DetailsService } from '../service/details.service';
import { User, UserFlatDetails } from '../modal';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,ToastModule,InputTextModule,TableModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
})
export class RegisterComponent {
  registerForm! : FormGroup;
  allUsers :any[]=[]
  detailsOfUsers: UserFlatDetails[] = [];
  constructor(private form: FormBuilder,private userService : RegisterService,private detailsService : DetailsService, private messageService:MessageService,private route : Router) {}

  ngOnInit() {
    this.registerForm = this.form.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });
    this.getAllUserDetails();
    this.getListOfAllUsersWithDetails();
  }
  addUser(){
    if(this.registerForm.valid){
      this.userService.addUsers(this.registerForm.value).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User Added Successfully',
          });
          this.registerForm.reset();
          setTimeout(() => {
            this.route.navigateByUrl('/details')
          }, 2000);
         
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
getAllUserDetails(){
  this.userService.geAllUsers().subscribe({
    next:(response)=>{
      this.allUsers =response
    },
    error:(error)=>{

    }
  })
}
getListOfAllUsersWithDetails(){
  this.userService.geAllUsersWithDetails().subscribe({
    next: (response: User[]) => {
      this.detailsOfUsers = response.flatMap(user =>
        user.details.map(detail => ({
          id: user.id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          address: detail.address,
          description: detail.description,
          gender: detail.gender
        }))
      );

      console.log(this.detailsOfUsers);
      

    },
    error:(error)=>{

    }
  })
}

}