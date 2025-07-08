export const cart = [];


/**
 * Function
 * */
// Add to Cart
export function addToCart(productId){
    let matchingItem;
    //
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    //
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1
        });
    }
}