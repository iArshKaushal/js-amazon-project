import {formatCurrency} from "../scripts/utils/money.js";


console.log("Test Suit : formatCurrency");

// Test Case 1
console.log("Convert cents into Dollars");

if(formatCurrency(2095) === '20.95'){
    console.log("Test case 1 : Passed");
}else{
    console.log("Test case 1 : Failed");
}

// Test Case 2
console.log("Work with 0");

if(formatCurrency(0) === '0.00'){
    console.log("Test case 2 : Passed");
}else{
    console.log("Test case 2 : Failed");
}


// Test Case 3
console.log("Round up to the nearest cent");

if(formatCurrency(2000.5) === '20.01'){
    console.log("Test case 3 : Passed");
}else{
    console.log("Test case 3 : Failed");
}

// Test Case 4
if(formatCurrency(2000.4) === '20.00'){
    console.log("Test case 4 : Passed");
}else{
    console.log("Test case 4 : Failed");
}

