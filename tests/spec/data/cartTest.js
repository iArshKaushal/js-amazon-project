import {addToCart, cart, loadFromStorage} from "../../../data/cart.js";

describe('Test Suite: addToCart', ()=>{

    // TEST_CASE_1
    it('Add an existing product to the cart', ()=>{

        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2); // Updated from 1 to 2
    });


    // TEST_CASE_2
    // This function is used to create TEST_CASE
    it('Add a new product to the cart', ()=>{

        spyOn(localStorage, 'setItem');

        // This method is used to create MOCKs, basically we are MOCKING localStorage.getItem()
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();


        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        //console.log(cart.length);
        expect(cart.length).toEqual(1);

        // Following code check how many times a given method been called
        // in this case given method id localStorage.setItem() and ii should get called 1 time
        // NOTE: following code will work only if the given method is Mocked using spyOn()
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });

});