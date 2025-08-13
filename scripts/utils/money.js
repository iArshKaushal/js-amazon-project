

/*
* Here toFixed() method have some issues to ROUND off the numbers,
* Here are few examples,
* ---------- 6.005.toFixed(2);  => '6.00' ===== INCORRECT
* ---------- 7.005.toFixed(2);  => '7.00' ===== INCORRECT
* ---------- 8.005.toFixed(2);  => '8.01' ===== CORRECT
*
* so to fixed the issue we will ROUND OFF the priceCents first
* */

export function formatCurrency(priceCents){
    //return (priceCents / 100).toFixed(2);
    return (Math.round( priceCents) / 100).toFixed(2);
}