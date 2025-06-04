import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})

export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup;
  isEdit = false;
  invoiceId: string = '';

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.invoiceForm = this.fb.group({
      transactionDate: ['', Validators.required],
      discount: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      products: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.paramMap.get('id') || '';
    this.isEdit = !!this.invoiceId;

    if (this.isEdit) {
      this.invoiceService.getInvoiceById(this.invoiceId).subscribe(invoice => {
        this.invoiceForm.patchValue({
          transactionDate: invoice.transactionDate,
          discount: invoice.discount
        });
        invoice.items.forEach(item => {
          this.addItem(item.productName, item.quantity, item.price);
        });
      });
    } else {
      this.addItem(); // Add one row by default
    }
  }

  get items(): FormArray {
    return this.invoiceForm.get('products') as FormArray;
  }

  addItem(productName: string = '', quantity: any = '', price: any = ''): void {
    this.items.push(this.fb.group({
      productName: [productName, Validators.required],
      quantity: [quantity, [Validators.required, Validators.min(1)]],
      price: [price, [Validators.required, Validators.min(0)]]
    }));
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onSubmit(): void {
    if (this.invoiceForm.invalid) return;

    const payload = {
      ...this.invoiceForm.value,
      products: this.invoiceForm.value.products.map((item: any) => ({
        ...item,
        productId: crypto.randomUUID()
      }))
    };

    const request = this.isEdit
      ? this.invoiceService.updateInvoice(this.invoiceId, payload)
      : this.invoiceService.createInvoice(payload);

    request.subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.error('Error saving invoice', err)
    });
  }
}