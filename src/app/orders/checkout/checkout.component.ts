import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { UserService } from '../../core/services/user.service';
import { BaseProduct } from '../../shared/model/BaseProduct';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../shared/model/Order';
import { Address } from '../../shared/model/User';

@Component({
  selector: 'pmp-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [],
})
export class CheckoutComponent implements OnInit {
  orderForm!: FormGroup;
  cartProducts: BaseProduct[] = [];
  productIDs: number[] = [];
  totalPrice = 0;
  orderComplete = false;

  orderId = 0;
  orderStatus = '';

  isUserLoggedIn = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      customerFirstName: ['', [Validators.required, Validators.minLength(3)]],
      customerLastName: ['', [Validators.required, Validators.minLength(3)]],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
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
          this.orderForm.patchValue({
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
      this.totalPrice = cart.cartTotalPrice;
    });
  }

  saveOrder(): void {
    if (this.orderForm.valid) {
      const order: Order = new Order(
        this.orderForm.get('customerFirstName')?.value,
        this.orderForm.get('customerLastName')?.value,
        this.orderForm.get('customerPhone')?.value,
        this.orderForm.get('customerEmail')?.value,
        new Address(
          this.orderForm.get('deliveryAddress.street')?.value,
          this.orderForm.get('deliveryAddress.city')?.value,
          this.orderForm.get('deliveryAddress.state')?.value,
          this.orderForm.get('deliveryAddress.zip')?.value
        )
      );

      this.orderService.sendOrderRequest(order).subscribe((orderDto) => {
        this.orderId = orderDto.id;
        this.orderStatus = orderDto.status;
      });

      this.orderComplete = true;

      this.cartService.clearCart();
    } else {
      this.orderForm.markAllAsTouched();
    }
  }
}
