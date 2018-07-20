import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AddProduit } from '../shared/models/addProduit.model';

@Injectable()
export class AddProduitService {

  constructor(private http: HttpClient) { }

  getAddProduits(): Observable<AddProduit[]> {
    return this.http.get<AddProduit[]>('/api/addProduits');
  }

  countAddProduits(): Observable<number> {
    return this.http.get<number>('/api/addProduits/count');
  }

  addAddProduit(addProduit: AddProduit): Observable<AddProduit> {
    return this.http.post<AddProduit>('/api/addProduit', addProduit);
  }
  getAddProduit(addProduit: string): Observable<AddProduit> {
    return this.http.get<AddProduit>(`/api/addProduit/${addProduit}`);
  }

  editAddProduit(addProduit: AddProduit): Observable<string> {
    return this.http.put(`/api/addProduit/${addProduit._id}`, addProduit, { responseType: 'text' });
  }

  deleteAddProduit(addProduit: AddProduit): Observable<string> {
    return this.http.delete(`/api/addProduit/${addProduit._id}`, { responseType: 'text' });
  }

}
