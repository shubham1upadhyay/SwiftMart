const homeBtn = document.getElementById("home");
const productBtn = document.getElementById("product");
const helpBtn = document.getElementById("help");
const profileBtn = document.getElementById("profile");

// redirections
homeBtn.addEventListener('click', ()=>{
  location.href = "/"
});
productBtn.addEventListener('click', ()=>{
  location.href = "/products"
});
helpBtn.addEventListener('click', ()=>{
    window.location.href = "/help/";
})
profileBtn.addEventListener('click', ()=>{
    location.href = "/profile"
  });

  // restrictions
if (!sessionStorage.getItem('activeUser')) {
    window.location.href = '/login';
  }

const itemContainer = document.querySelector('.items');
const checkoutContainer = document.getElementById('checkout-container');
const totalPrice = document.getElementById('total-price');

var cartItem=[];


if(localStorage.getItem('cartArr')){
    let myCart =JSON.parse(localStorage.getItem('cartArr'));
    cartItem=myCart;
    displayCart(cartItem);
}
else{
    totalPrice.innerHTML='0';
}


// display function
function displayCart(Arr){
    itemContainer.innerHTML='';
    checkoutContainer.innerHTML = '';
    if(cartItem.length==0){
        itemContainer.innerHTML=`
        <h4 class="e-msg">Cart is empty !</h4>
        `;
        console.log(totalPrice);
        totalPrice.innerHTML='0';
    }

    Arr.forEach((pro, index)=>{
        itemContainer.innerHTML+=`
        <div class="product">
        <div class="product-img">
        <img src = "${pro.image}" alt="product" />
        <div>
        <div class="product-details">
         <p id="p-desc">${pro.title}</>
         <p class="price">$${pro.price}</p>
         <p class="rating-rate">Rating: ${Math.floor(pro.rating.rate)}</p>
         </div>
         <button id="addBtn" onClick='removeFromCart(${pro.id})'>Remove From Cart</button>
          </div> 
        `;

        checkoutContainer.innerHTML += `
         <div class="checkout-box">

         <div class="index">${index+1}.</div>
         <div class="checkout-title">${pro.title}</div>
         <div><img class="checkout-img" src="${pro.image}"/></div>
         <span class="checkout-price">$${pro.price}</span>
         </div>
        `
    })
    totalPrice.innerHTML = calculateTotalPrice();
}

// remove function
function removeFromCart(id){
  let itemToRemove;
  let indexToRemove;
  cartItem.forEach((item,index)=>{
      if(item.id==id){
          itemToRemove=item;
          indexToRemove=index;
      }
  })
  cartItem.splice(indexToRemove,1);
 popup();
  localStorage.setItem('cartArr',JSON.stringify(cartItem));
  displayCart(cartItem);
}

if(cartItem.length==0){
  itemContainer.innerHTML=`
  <h4 class="e-msg">Cart is empty !</h4>
  `;
}

function popup(){
  let popupContainer = document.createElement('div');
  popupContainer.textContent = 'Product removed from cart 😒';
  popupContainer.classList.add('popup');

  document.body.appendChild(popupContainer);

  setTimeout(function() {
    document.body.removeChild(popupContainer);
  }, 2000);
  }

// calculate total price
function calculateTotalPrice(){
  return cartItem.reduce((acc,item)=>{
      return acc+item.price;
  },0)
}

document.getElementById("rzp-button1").onclick = function (e) {
  var options = {
    key: "rzp_test_PV1oQ0oMtgXOsq", 
    amount: calculateTotalPrice() * 100, 
    currency: "INR",
    name: "Swift Mart",
    description: "This is your order",
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var payment = new Razorpay(options);
  payment.open();
  e.preventDefault();

    localStorage.removeItem('cartArr');
    cartItem = [];
    displayCart(cartItem);
  displayCart(cartItem);
}

