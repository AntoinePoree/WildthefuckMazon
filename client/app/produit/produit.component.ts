import { AddProduitService } from './../services/addProduit.service';
import { Component, OnInit } from '@angular/core';
import { AddProduit } from '../shared/models/addProduit.model';

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
  ) {

  }

  ngOnInit() {
    this.getAddProduits();

  }
  getAddProduits() {
    this.addProduitService.getAddProduits().subscribe(
      data => this.addProduits = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }
}
