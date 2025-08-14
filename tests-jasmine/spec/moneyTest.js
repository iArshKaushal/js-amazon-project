import {formatCurrency} from "../../scripts/utils/money.js";

describe('Test Suite: formatCurrency', ()=> {
    it('Converts Cents to Dollars', ()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('Work with 0', ()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('Round up to the nearest cent', ()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});




// it() function is used to create a TEST
