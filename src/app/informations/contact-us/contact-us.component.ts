import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pmp-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: [],
})
export class ContactUsComponent implements OnInit {
  contactUsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.contactUsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
