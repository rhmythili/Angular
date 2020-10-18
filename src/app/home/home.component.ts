import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { LoanserviceService } from '../loanservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 data: [][];
 users: any;
 floodRisk: string = '';
 errorMsg = '';
 clear = true;

  constructor(
    private loanservice : LoanserviceService 
  ) { }

  ngOnInit(): void {
  }
  onFileChange(evt:any){
    const target : DataTransfer = <DataTransfer>(evt.target);

    if(target.files.length!== 1) throw new Error('Cannot upload multiple files');

    const reader:FileReader = new FileReader();
    reader.onload = (e: any)=> {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook =XLSX.read(bstr, {type: 'binary'});
      const wsname :string = wb.SheetNames[0];
      const ws:XLSX.WorkSheet = wb.Sheets[wsname];
      console.log("wsss",ws);
      this.data = (XLSX.utils.sheet_to_json(ws, {header:1}));
      
      this.clear = true;
      const obj = [];
      this.data.shift();
      this.data
        .filter(entry => entry.length)
        .map((entry: any) => {
        obj.push({
          "loanNumber": entry[0],
          "borrowerName": entry[1],
          "dob": entry[2],
          "propertyAddress": entry[3],
          "propertyValue": entry[4],
          "floodRisk": entry[5]
        })
      });
      //console.log('obj: ', obj)
      this.loanservice.postUsers(obj)
      .subscribe((res) => {
        console.log('Res: ', res);
      },
      err => this.errorMsg = err.error.message
      );
    };

    reader.readAsBinaryString(target.files[0]);
  }

  onGet(): void {
    this.loanservice.getUsers().subscribe((data) => {
      this.clear = false;
      console.log("data",data);
      const users =  JSON.parse(JSON.stringify(data));
      console.log("users",users);
      users.map((user) => this.floodRisk += user.floodRisk ? user.floodRisk : '' );
      console.log('flood risk: ', this.floodRisk);
      console.log('Response', users);
      this.users = users;
    });
  }

}
