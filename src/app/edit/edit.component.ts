import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { puts } from 'util';
// import 'rxjs/add/operator/filter';

declare var require;
var config = require('../studentData.json')

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  studentName: string;
  rollNo : string;
  section: string;
  internalMarks1: string;
  internalMarks2: string;
  internalMarks3: string;
  students: any;
  id : any;
  
  constructor(private http : HttpClient,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
        console.log("id", res)
        this.id = res.id
        console.log("id-global", this.id)

    })
  }
  editStudent(){
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
    this.http.put("http://localhost:4000/putStudent/"+this.id,studentDetails)
    .subscribe(res => {
      console.log("successfully updated ");
      window.alert("Edited successfully")
      
    },err => {
      console.log("err",err); 
      window.alert("failed")
  })

}
  }

