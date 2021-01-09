import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


declare var require;
var config = require('../studentData.json')

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {
  students : any;
  constructor(
    private http : HttpClient,
    private router : Router,
    ) { }

  ngOnInit() {
    this.getStudent()
    }   
    
  getStudent(){
    this.http.get("http://localhost:4000/getStudent").subscribe(res => {
      this.students=res;
      console.log("result is",res)
    },err => {
     console.log("error is", err)
    })
  }
  edit(data){
    this.router.navigate(['/edit'],  { queryParams: { id : data }})
    
  }
 
  delete(id){
    // this.router.navigate(['/delete'],  { queryParams: { id : data }})
    console.log("dataaaaa",id)
    this.http.delete("http://localhost:4000/deleteStudent/"+ id)
    .subscribe(res => {
      window.alert("success")
      this.getStudent();
      console.log("deleted ");
    },err => {
      window.alert("failed")
      console.log("err",err); 
  })

  }
}
