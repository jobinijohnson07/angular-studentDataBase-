import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var require;          
var config = require('../studentData.json')
@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {
  studentName: string;
  rollNo : string;
  section: string;
  internalMarks1: string;
  internalMarks2: string;
  internalMarks3: string;
  students: any;
  constructor(private http : HttpClient) { }

  ngOnInit() {}

  setStudent(){
    debugger
    var studentDetails = {
      "name" : this.studentName,
      "roll_no" : this.rollNo,
      "section":this.section,
      "mark_1":this.internalMarks1,
      "mark_2":this.internalMarks2,
      "mark_3":this.internalMarks3
    }
    console.log("det",studentDetails)
    // this.students.push(studentDetails)
    this.http.post("http://localhost:4000/addStudent", studentDetails)
    .subscribe(res => {
      console.log("success",res);
      window.alert("create successfully")
    },err => {
      console.log("err",err);
      window.alert("failed")
    })
  }
  
}
