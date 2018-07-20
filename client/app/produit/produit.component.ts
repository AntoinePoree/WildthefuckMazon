import { AddProduit } from './../shared/models/addProduit.model';
import { AddProduitService } from './../services/addProduit.service';
import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
})
export class ProduitComponent implements OnInit {

  user: User;
  admin: any;
  addProduit: any;
  isLoading = true;
  addProduits = [];

  constructor(
    private addProduitService: AddProduitService,
    private auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService) { }

  ngOnInit() {
    this.addProduitService.getAddProduits().subscribe((data) => {
      this.addProduits = data;
    });
    this.getUser();
    this.getAdmin();
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      (data) => {
        this.user = data;
        // console.log(this.user);
      },
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  getAdmin() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.admin = data.filter(user => user.role === 'admin');
        this.admin = this.admin[0];
        // console.log(this.admin);
      },
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  editUser() {
    this.userService.editUser(this.user).subscribe(
      (res) => {
        this.toast.setMessage('account settings saved!', 'success');
      },
      error => console.log(error),
    );
  }

  editAdmin() {
    this.userService.editUser(this.admin).subscribe(
      (res) => {
        this.toast.setMessage('account settings saved!', 'success');
      },
      error => console.log(error),
    );
  }

  editProduct(addProduit) {
    this.addProduitService.editAddProduit(addProduit).subscribe(
      (res) => {
        this.toast.setMessage('account settings saved!', 'success');
      },
      error => console.log(error),
    );
  }

  buy(addProduit) {
    this.user.sold -= addProduit.price;
    this.admin.sold += addProduit.price;
    addProduit.stock -= 1;
    console.log('Prix', addProduit.price);
    console.log('Mon solde', this.user.sold);
    this.editUser();
    this.editAdmin();
    this.editProduct(addProduit);
  }
}
