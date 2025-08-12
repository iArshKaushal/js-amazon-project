// Following is a "NAMED" export approach
import {cart, removeFromCart} from "../data/cart.js";
import {products} from "../data/products.js";
import * as util from "/scripts/utils/money.js"
import {hello} from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";

// this is another way to import files & it is known as "default import".
// we can use it when we want to import only 1 thing from the file.
// Each file can have only 1 DEFAULT
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {deliveryOptions} from "../data/deliveryOptions.js";


/** *************************
 * Import Ends Here
 * ************************** */




const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format("dddd, MMMM D"));



let cartSummaryHtml = '';

cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach( (product) => {
        if(product.id === productId){
            matchingProduct = product;
        }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option)=>{
        if(option.id === deliveryOptionId){
            deliveryOption = option;
        }
    });
    const today = dayjs();
    const deliveryDate = today.add( deliveryOption.deliveryDays,'days');
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHtml +=`<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${util.formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
                <!--Generate Delivery options dynamically -->
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
    `;
});




function deliveryOptionsHTML(matchingProduct, cartItem){

    let html = '';

    deliveryOptions.forEach((deliveryOption)=>{
        const today = dayjs();
        const deliveryDate = today.add( deliveryOption.deliveryDays,'days');
        const dateString = deliveryDate.format("dddd, MMMM D");
        const priceString = deliveryOption.priceCents === 0
            ? "FREE"
            : `$${util.formatCurrency(deliveryOption.priceCents)}`;


        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `
             <div class="delivery-option">
                  <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
                </div>
        `;
    });
    return html;
}


document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;



// Delete link
// deleting items form the cart and HTML page
document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
       link.addEventListener('click', ()=>{
           const productId = link.dataset.productId;
           removeFromCart(productId);

           // removing product form HTML [use the DOM to get the element to remove]
           const container = document.querySelector(
               `.js-cart-item-container-${productId}`
           );

           // use .remove()
           container.remove();
       })
    });
