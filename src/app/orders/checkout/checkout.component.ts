import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { UserService } from '../../core/services/user.service';
import { BaseProduct } from '../../shared/model/BaseProduct';
import { OrderService } from '../../core/services/order.service';
import { CustomerOrderDetails } from '../../shared/model/Order';
import { Address } from '../../shared/model/User';

@Component({
  selector: 'pmp-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [],
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cartProducts: BaseProduct[] = [];
  private productIDs: number[] = [];
  totalPrice = 0;
  orderComplete = false;

  orderId = 0;
  orderStatus = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      customerFirstName: ['', [Validators.required, Validators.minLength(3)]],
      customerLastName: ['', [Validators.required, Validators.minLength(3)]],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.pattern('[- +()0-9]+'),
        ],
      ],
      deliveryAddress: this.formBuilder.group({
        street: ['', [Validators.required, Validators.minLength(3)]],
        state: ['', [Validators.required, Validators.minLength(3)]],
        city: ['', [Validators.required, Validators.minLength(3)]],
        zip: ['', [Validators.required, Validators.minLength(3)]],
      }),
    });

    this.authService.isUserLoggedIn.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.userService.getUserAccountDetails().subscribe((userData) => {
          this.checkoutForm.patchValue({
            customerFirstName: userData.firstName,
            customerLastName: userData.lastName,
            customerEmail: userData.email,
            customerPhone: userData.phone,
            deliveryAddress: {
              street: userData.address.street,
              city: userData.address.city,
              state: userData.address.state,
              zip: userData.address.zip,
            },
          });
        });
      }
    });

    this.cartService.currentCart.subscribe((cart) => {
      cart.products.forEach((cartItem) => this.productIDs.push(cartItem.id));
      this.cartProducts = cart.products;
      this.totalPrice = cart.totalPrice;
    });
  }

  saveOrder(): void {
    if (this.checkoutForm.valid) {
      const order: CustomerOrderDetails = new CustomerOrderDetails(
        this.checkoutForm.get('customerFirstName')?.value,
        this.checkoutForm.get('customerLastName')?.value,
        this.checkoutForm.get('customerPhone')?.value,
        this.checkoutForm.get('customerEmail')?.value,
        new Address(
          this.checkoutForm.get('deliveryAddress.street')?.value,
          this.checkoutForm.get('deliveryAddress.city')?.value,
          this.checkoutForm.get('deliveryAddress.state')?.value,
          this.checkoutForm.get('deliveryAddress.zip')?.value
        )
      );

      this.orderService.saveOrder(order).subscribe((orderDto) => {
        this.orderId = orderDto.id;
        this.orderStatus = orderDto.status;

        this.cartService.clearCart();
      });

      this.orderComplete = true;
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}
