import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
 displayedColumns: string[] = ['LoanNo', 'BorrowerName', 'dob', 'PropAddress', 'Cost', 'FloodRisk'];
 dataSource: MatTableDataSource<any[]>;
 @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
 @ViewChild(MatSort, {static: false}) sort: MatSort;

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
      this.loanservice.postUsers(obj)
      .subscribe((res) => {
        console.log('Res: ', res);
      },
      err=>{ 
        if(err?.error?.message) 
           this.errorMsg = err.error.message
      }
      );
    };

    reader.readAsBinaryString(target.files[0]);
  }

  onGet(): void {
    this.loanservice.getUsers().subscribe((data) => {
      this.clear = false;
      const users =  JSON.parse(JSON.stringify(data));
      users.map((user) => this.floodRisk += user.floodRisk ? user.floodRisk : '' );
      if (this.floodRisk === '' && this.displayedColumns.length === 6) {
        this.displayedColumns.pop();
      } 
      //To check reverse scenario(uploading excel file with flood risk first and then uploading another file without flood risk)
      else if (this.floodRisk !== '' && this.displayedColumns.length === 5) {
        this.displayedColumns.push('FloodRisk');
      }
      this.dataSource = new MatTableDataSource<any[]>(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.users = users;
    });
  }

}
