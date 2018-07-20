import { AddProduitService } from './../services/addProduit.service';
import { Component, OnInit } from '@angular/core';
import { AddProduit } from '../shared/models/addProduit.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-see-produit',
  templateUrl: './see-produit.component.html',
  styleUrls: ['./see-produit.component.css'],
})
export class SeeProduitComponent implements OnInit {
  addProduit = new AddProduit();
  // addProduits: AddProduit[] = [];
  isLoading = true;
  isEditing = false;
  id: any;
  addProduits: AddProduit;

  constructor(
    private addProduitService: AddProduitService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getAddProduit();
  }
  getAddProduit() {
    this.addProduitService.getAddProduit(this.addProduit._id).subscribe(
      data => this.addProduit = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
    console.log(this.addProduit);
  }
}
