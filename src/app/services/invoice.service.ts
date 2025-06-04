import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice.model';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:5020/api/Invoice'

  constructor(private http: HttpClient) {}

  getAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl);
  }

  getInvoiceById(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`);
  }

  createInvoice(invoice: Invoice): Observable<any> {
    return this.http.post(this.apiUrl, invoice);
  }

  updateInvoice(id: string, invoice: Invoice): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, invoice);
  }

  deleteInvoice(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}