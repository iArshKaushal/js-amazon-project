

const xhr = new XMLHttpRequest();

xhr.addEventListener('load', ()=>{
    console.log(xhr.response);
});


// URLs: https://supersimplebackend.dev/products/first
xhr.open('GET', 'https://supersimplebackend.dev/products/first');
xhr.send();
//xhr.response; // Async code