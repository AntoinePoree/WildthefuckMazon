import { AddProduitService } from './../services/addProduit.service';
import { Component, OnInit } from '@angular/core';
import { AddProduit } from '../shared/models/addProduit.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
})
export class ProduitComponent implements OnInit {
  addProduit = new AddProduit();
  addProduits: AddProduit[] = [];
  isLoading = true;
  isEditing = false;

  constructor(
    private addProduitService: AddProduitService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getAddProduits();
  }
  getAddProduits() {
    this.addProduitService.getAddProduits().subscribe(
        data => (this.addProduits = data, console.log(data)),
        error => console.log(error),
        () => (this.isLoading = false),
      );
  }
  buyitem() {
    console.log('1');
  }
}
