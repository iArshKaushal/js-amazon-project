import {renderOrderSummary} from "../../../scripts/checkout/orderSummary.js";
import {addToCart, cart, loadFromStorage} from "../../../data/cart.js";



describe('Test Suits: renderOrderSummary', ()=>{

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    const productId3 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

    /** Hooks - in jasmine */
    // 1. beforeEach Hook
    beforeEach(()=>{
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML =
            `
                <div class="js-order-summary"></div>
                <div class="js-payment-summary"></div>
            `;

        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: productId2,
                    quantity: 1,
                    deliveryOptionId: '2'
                },
                {
                    productId: productId3,
                    quantity: 3,
                    deliveryOptionId: '1'
                }
            ]);
        });
        loadFromStorage();

        // Running the function to be tested
        renderOrderSummary();
    });

    // 2. afterEach Hook
    afterEach(()=>{
        // Following code is used to remove the HTML code that we have shown above earlier, to make page clean
        document.querySelector('.js-test-container').innerHTML = '';
    });

    // TEST_CASE_1
    it('display the cart', ()=>{
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(3);

        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');

        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');

    });


    // TEST_CASE_2 : Test Remove product link
    it('Removes a product', ()=>{

        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        // Here we are expecting the selected product1 returned to be null because we have deleted it
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);

        // Here we are expecting the selected product2 returned to be not null
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);

        // after deleting first product we are checking if the cart is updated or not
        // means initially cart has 3 product now it should have 2
        expect(cart.length).toEqual(2);

        // here we are checking that now product2 will be at the first position in the cart
        expect(cart[0].productId).toEqual(productId2);

        /** TODO start video from 17:19:52 */

    });

});


