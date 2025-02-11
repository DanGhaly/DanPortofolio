import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  scriptURL = 'https://script.google.com/macros/s/AKfycby3A8Wqf64uLz03VxsI0dGeciop6bKwthIGF05zi_4N2zM62mUfl6siZDzqeyH7JY06Ew/exec';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); 
      return;
    }

    const formData = new FormData();
    formData.append('Name', this.contactForm.value.name);
    formData.append('Email', this.contactForm.value.email);
    formData.append('Message', this.contactForm.value.message);

    this.http.post(this.scriptURL, formData).subscribe({
      next: (response) => {
        console.log('Success!', response);
        alert('Form submitted successfully!');
        this.contactForm.reset();
      },
      error: (error) => {
        console.error('Error!', error.message);
      }
    });
  }
}
