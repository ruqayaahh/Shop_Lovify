let nameofNewGood = document.querySelector("#newgoodname");
let priceofNewGood = document.querySelector("#price-n-good");
nameofNewGood.addEventListener('onkeypress', checkNewGood);
priceofNewGood.addEventListener('onkeypress', checkPrice);


function checkNewGood(e) {
    let regexName = /^[A-z]+$/;
    let check = regexName.test(e.target.value);
    if (!check) {
        this.nextElementSibling.textContent  = "Only letters are allowed";
    }
    else {
        this.nextElementSibling.textContent = "";
    }
}

function checkPrice(e) {
    let regexPrice = /^[0-9]+$/;
    let check = regexPrice.test(e.target.value);
    if (!check) {
        this.nextElementSibling.textContent = "Only numbers are allowed";
    }
    else {
        this.nextElementSibling.textContent =
            "";
    }
}

let enterNewGood = document.querySelector("#newgood");
enterNewGood.addEventListener('click', stockGood);

function stockGood() {

    let productName = nameofNewGood.value.trim().toLowerCase();
    let productPrice = priceofNewGood.value;

    function incrementId(nameOfTable) {
        let table = JSON.parse(localStorage.getItem(nameOfTable));
    
        if (table != null) {
            return table[table.length - 1].id + 1;
        } else {
            return 1;
        }
    }

    let newProduct = {
        id: incrementId('products'),
        productName,
        productPrice
    };

    if (!productName || !productPrice) {
        console.log('Fill all fields');
    }
    else { 
        createGood(newProduct);
        console.log(newProduct);
    }    
}


function createGood(newProduct) {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    products.push(newProduct)
    localStorage.setItem('products', JSON.stringify(products));

    console.log(JSON.parse(localStorage.getItem('products')))
}  


// SEARCHING FOR PRODUCTS

function lookForGood(e) {
    let search = document.querySelector('#search').value;

    let products = JSON.parse(localStorage.getItem("products")) || [];

    const found = products.filter(p=>p.productName === search)  

    let price = document.querySelector('#price');
    if(!found.length)  {
            price.value = ""
            alert("Product not found")
        }
    else{
            price.value = Number(found[0].productPrice);
        }
    return false; 
}

// AMOUNT CALCULATE
function calculateAmount() {
    var price = parseFloat(document.getElementById("price").value);
    var quantity = parseFloat(document.getElementById("qty").value);
  
  if (price * quantity == parseFloat(price * quantity))
      document.getElementById("total").value = price * quantity;
  else
      document.getElementById("total").value = '';
  }
  
// ADD TO CART
const tbody = document.querySelector('#item-list');

let cartList = [];

function addItem() {
    let productName = document.querySelector("#search").value.trim().toLowerCase();
    let price = parseFloat(document.querySelector("#price").value);
    let qty = parseFloat(document.querySelector('#qty').value);
    let amount = parseFloat(document.querySelector('#total').value);

    const newItem = {};
    newItem['itemName'] = productName;
    newItem['itemPrice'] = price;
    newItem['itemQty'] = qty;
    newItem['itemAmount'] = amount;

    
    cartList.push(newItem);
     
    tbody.insertAdjacentHTML('beforeend', `
        <tr>
            <td>${newItem['itemName']}</td>
            <td>${newItem['itemPrice']}</td>
            <td>${newItem['itemQty']}</td>
            <td>${newItem['itemAmount']}</td>
        </tr>`
    )  
}

const checkout = document.querySelector('#checkout');

const checkOutSaveSale = (e) => {
    let sales = JSON.parse(localStorage.getItem('sales')) || []
    sales.push({
        id: sales.length === 0 ? 1 : sales[sales.length - 1].id + 1,
        totalAmount: cartList.reduce((totalAmount, item) => {
            totalAmount += item.itemAmount;
            return totalAmount;
        }, 0),
        products: [...cartList]
    });
    localStorage.setItem('sales', JSON.stringify(sales));
    cartList = [];
    tbody.innerHTML = '';
}

checkout.addEventListener('click', checkOutSaveSale);

