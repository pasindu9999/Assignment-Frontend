import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Invoice } from 'src/app/models/invoice.model';
import { Location } from '@angular/common'; // Import Location service

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css']
})
export class InvoiceViewComponent implements OnInit {
  invoice: Invoice | undefined;
  isLoading = true; // To show a loading indicator

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private location: Location, // Inject Location service
    private router: Router // Inject Router for explicit navigation if needed
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.invoiceService.getInvoiceById(id).subscribe({
        next: (data) => {
          this.invoice = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching invoice:', err);
          this.isLoading = false;
          // Optionally, navigate to a not-found page or show an error message
        }
      });
    } else {
      console.error('Invoice ID not found in route parameters');
      this.isLoading = false;
      // Handle cases where ID is not present, e.g., navigate back or to an error page
      this.router.navigate(['/']); // Example: navigate to home/list
    }
  }

  goBack(): void {
    this.location.back(); // Use Location service to go back to the previous page
  }
}