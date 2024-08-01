import { Component } from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor(private adminService: AdminService, private fb: FormBuilder) {}

  ngOnInit(){
    this.getAllProducts();
    this.searchProductForm=this.fb.group({
      title: [null, [Validators.required]]
    })
  }

  getAllProducts(){
    this.products=[];
    this.adminService.getAllProducts().subscribe(res =>{
      res.forEach(element => {
        element.processedImg= 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      console.log(this.products);
    })
  }

  submitForm(){
    this.products=[];
    const title =this.searchProductForm.get('title')!.value;
    this.adminService.getAllProductsByName(title).subscribe(res =>{
      res.forEach(element => {
        element.processedImg= 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      console.log(this.products);
    })
  }

}
