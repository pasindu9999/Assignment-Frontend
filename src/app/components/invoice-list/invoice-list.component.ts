import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})

export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe({
      next: (data) => this.invoices = data,
      error: (err) => console.error('Error loading invoices', err)
    });
  }

  edit(id: string): void {
    this.router.navigate(['/update', id]);
  }

  delete(id: string): void {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(id).subscribe({
        next: () => this.loadInvoices(),
        error: (err) => console.error('Error deleting invoice', err)
      });
    }
  }

  view(id: string): void {
    this.router.navigate(['/invoice', id]);
  }
}
