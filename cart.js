// variables and constants
const cartContainer = document.querySelector('.cart-container');
const productList = document.querySelector('.product-list');
const cartList = document.querySelector('.cart-list');
const cartTotal = document.getElementById('cart-total-value');
let cartItemID = 1;
let cartitems=[]
// load product items content form JSON file
function loadJSON(){
    fetch('products.json')
    .then(response => response.json())
    .then(data =>{
        let html = ``;
        data.forEach(product => {
            html += `
                <div class = "product-item">
                    <div class = "product-img">
                        <img src = "${product.img_src}" alt = "product image">
                        <button type = "button" class = "add-to-cart-btn">
                            <i class = "fas fa-shopping-cart"></i>Add To Cart
                        </button>
                    </div>
                    <div class = "product-content">
                        <h3 class = "product-name">${product.Name}</h3>
                        <p class = "product-price">EGP ${product.Price}</p>
                    </div>
                </div>
            `;
        });
        productList.innerHTML = html;
    })
    .catch(error => {
        alert(`Error.......`);
    })
}
// get product info after add to cart button click
function getProductInfo(product){
    let productInfo = {
        Id: cartItemID,
        img_src: product.querySelector('.product-img img').src,
        Name: product.querySelector('.product-name').textContent,
        Price: product.querySelector('.product-price').textContent
    }
    cartItemID++;
    addToCartList(productInfo);
}
// add the selected product to the cart list
function addToCartList(productInfo){
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    // cartItem.setAttribute('data-id', `${productInfo.Id}`);
    if(checkout(productInfo.Name)[0]){
    cartitems.push(productInfo);
    cartItem.innerHTML = `
        <img src = "${productInfo.img_src}" alt = "product image">
        <div class = "cart-item-info">
            <h3 class = "cart-item-name">${productInfo.Name}</h3>
            <span class = "cart-item-price">${productInfo.Price}</span>
        </div>
        <div class='xcount'>Items : <input type="number" min="1" value="1" class="ins">
        </div>
        <button type = "button" class = "cart-item-del-btn">
            <i class = "fas fa-times"></i>
        </button>
    `;
    cartList.appendChild(cartItem);
    updateTotalPrice()
    }
    else alert(`${productInfo.Name} already exists in cart !!`)
}
//check product is in cart
let checkout=(name)=>{
    for (let product of cartitems) {
        if (product.Name == name)
            return [false, product]
    }
    return [true, false]
}
// purchase product
function purchaseProduct(e){
    if(e.target.classList.contains('add-to-cart-btn')){
        let product = e.target.parentElement.parentElement;
        getProductInfo(product); 
    } 
}
//update total price
let updateTotalPrice = () => {
    let inputs = document.querySelectorAll('input');
    let total = 0 ;
    for (let i =0;i<inputs.length; i++) {
      total += Number(cartitems[i].Price.replace('EGP', '')) * Number(inputs[i].value);
    }
    cartTotal.innerText = `${total}EGP`
}
// delete product from cart list and local storage
function deleteProduct(e){
    let cartItem;
    if(e.target.tagName === "BUTTON"){
        cartItem = e.target.parentElement;
        cartItem.remove();
    } else if(e.target.tagName === "I"){
        cartItem = e.target.parentElement.parentElement;
        cartItem.remove();
    }
    updateTotalPrice()
}
// all event listeners
function eventListeners(){
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
    });
    // toggle navbar when toggle button is clicked
    document.querySelector('.navbar-toggler').addEventListener('click', () => {
        document.querySelector('.navbar-collapse').classList.toggle('show-navbar');
    });

    // show/hide cart container
    document.getElementById('cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container');
    });

    productList.addEventListener('click', purchaseProduct);

    // delete from cart
    cartList.addEventListener('click', deleteProduct);
}
eventListeners();

