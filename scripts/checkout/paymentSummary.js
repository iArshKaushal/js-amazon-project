import {cart} from "../../data/cart.js";
import {getProduct} from "../../data/products.js";
import {getDeliveryOptions} from "../../data/deliveryOptions.js";
import * as util from "../utils/money.js"



export function renderPaymentSummary(){

    let productPriceCents = 0;
    let shippingPriceCents = 0;

    // STEP 1: Save the Data = MODEL
    cart.forEach((cartItem)=>{
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        let deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1; // 10% tax
    const totalCents = totalBeforeTaxCents + taxCents;

    // Generate the HTML = VIEW
    const paymentSummaryHTML =
        `
           <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${util.formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${util.formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${util.formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${util.formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${util.formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button> 
        `;


    // Make it interactive
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

}