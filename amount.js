errorMessages = document.querySelector('#errorMessages');

amount = document.addEventListener('onkeyup', calculateAmount);

function calculateAmount(){
    let price = parseFloat(document.querySelector("#price").value);
    let qty = parseFloat(document.querySelector('#qty').value);
    let amount = document.querySelector('#total');

    if(!price) {
        qty.value = ""
        errorMessages.textContent = "No product selected";  
    }
    else if (price * qty == parseFloat(price * qty)) {
        amount.value = price * qty;
        // console.log(amount.value);
    }
    else {
        amount.value = '';
    }
}

