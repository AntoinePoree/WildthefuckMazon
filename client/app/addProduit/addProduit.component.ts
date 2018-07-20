import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AddProduitService } from '../services/addProduit.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { AddProduit } from '../shared/models/addProduit.model';

@Component({
  selector: 'app-addproduits',
  templateUrl: './addProduit.component.html',
  styleUrls: ['./addProduit.component.css'],
})
export class AddProduitsComponent implements OnInit {

  addProduit = new AddProduit();
  addProduits: AddProduit[] = [];
  isLoading = true;
  isEditing = false;

  addAddProduitForm: FormGroup;
  name = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  img = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);

  constructor(private addProduitService: AddProduitService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getAddProduits();
    this.addAddProduitForm = this.formBuilder.group({
      name: this.name,
      price: this.price,
      img: this.img,
      description: this.description,
    });
  }

  getAddProduits() {
    this.addProduitService.getAddProduits().subscribe(
      data => this.addProduits = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  addAddProduit() {
    this.addProduitService.addAddProduit(this.addAddProduitForm.value).subscribe(
      (res) => {
        this.addProduits.push(res);
        this.addAddProduitForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  enableEditing(addProduit: AddProduit) {
    this.isEditing = true;
    this.addProduit = addProduit;
  }

  cancelEditing() {
    this.isEditing = false;
    this.addProduit = new AddProduit();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the addProduits to reset the editing
    this.getAddProduits();
  }

  editAddProduit(addProduit: AddProduit) {
    this.addProduitService.editAddProduit(addProduit).subscribe(
      () => {
        this.isEditing = false;
        this.addProduit = addProduit;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  deleteAddProduit(addProduit: AddProduit) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.addProduitService.deleteAddProduit(addProduit).subscribe(
        () => {
          const pos = this.addProduits.map(elem => elem._id).indexOf(addProduit._id);
          this.addProduits.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }

}
