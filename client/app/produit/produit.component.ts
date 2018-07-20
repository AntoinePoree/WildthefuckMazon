import { AddProduitService } from './../services/addProduit.service';
import { Component, OnInit } from '@angular/core';
import { AddProduit } from '../shared/models/addProduit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
})
export class ProduitComponent implements OnInit {
  addProduit;
  addProduits: AddProduit[];
  isLoading = true;
  isEditing = false;
  user: User;

  constructor(
    private auth: AuthService,
    private addProduitService: AddProduitService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.getAddProduit();
    this.getUser();
  }
  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }
  getAddProduit() {
    this.addProduitService.getAddProduits().subscribe(
        data => (this.addProduits = data, console.log(data)),
        error => console.log(error),
        () => (this.isLoading = false),
      );
  }
  buyitem(addProduit) {
    // this.addProduits = addProduit;
    // this.user.sold -= addProduit.price;
    // this.admin.sold += addProduit.price;
    console.log(this.addProduit);
    console.log(this.user.sold);
  }
}
