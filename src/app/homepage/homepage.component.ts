import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../shared/userservice.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  UserData: any=[];
  states=["Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra"];
  countries=["Afghanistan", "Algeria", "Australia", "Bangladesh", "Brazil", "Burundi", "China", "Egypt", "India"]
  myModel = 0;
  // formatLabel(value: number) {
  //   if (value >= 1000) {
  //     return Math.round(value / 1000);
  //   }

  //   return value;
  // }
  
  UserForm:any=FormGroup;

  showHomepage:Boolean=true;
showUserprofile:Boolean=false;
showAddbutton:Boolean=true;
showUpdatebutton:Boolean=false;
  updateId: any;

  constructor(private formbuilder:FormBuilder, private userservice:UserserviceService, private router:Router) { }

  ngOnInit(): void {
this.getAllUser();

    this.UserForm=this.formbuilder.group({
      image:['',Validators.required],
      fname:['',Validators.required],
      lname:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
      age:['', Validators.required],
      state:['',Validators.required],
      country:['',Validators.required],
      address:['',Validators.required],
      hobies:['',Validators.required]
      
    })
  }

  getAllUser(){
this.userservice.getUser().subscribe(res=>{
  this.UserData=res;
})
  }

  postUserDetails(){
    console.log(this.UserForm.value, "post");
    
this.userservice.postUser(this.UserForm.value).subscribe(res=>{

  alert("User Added Successfully!");
  this.UserForm.reset();
  this.getAllUser();
  this.showUser();
  // this.router.navigate(['/userprofile']);
  
  })
}


onEdit(data:any){
 
  this.showAddbutton=false;
this.showUpdatebutton=true;

    this.updateId=data.id

  this.UserForm.patchValue(data)
}

updateUserDetails(){


this.userservice.updateUser(this.UserForm.value,this.updateId)
.subscribe((res: any)=>{
console.log(res);

alert("Record Updated Successfully!")
this.UserForm.reset();
this.getAllUser()
this.showUser()
})
}


  get getfname(){
    return this.UserForm.controls;
  }
 
url="/assets/images/profile.png"

onSelectFile(e:any){
if(e.target.files){
var reader = new FileReader();
reader.readAsDataURL(e.target.files[0]);
reader.onload=(event:any)=>{
  this.url=event.target.result;
}
}
}


showHome(){
  this.showHomepage=true;
  this.showUserprofile=false;

}
showUser(){
  this.showHomepage=false;
  this.showUserprofile=true;
 
}

}
