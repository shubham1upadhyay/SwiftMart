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
const listContainer = document.querySelector('.list-container');
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
function displayCart(cart){
    itemContainer.innerHTML='';
    listContainer.innerHTML='';
    if(cartItem.length==0){
        itemContainer.innerHTML=`
        <h4 class="e-msg">Cart is empty !</h4>
        `;
        console.log(totalPrice);
        totalPrice.innerHTML='0';
    }

    cart.forEach((pro)=>{
        itemContainer.innerHTML+=`
        <div class="product">
        <div class="product-img">
        <img src = "${pro.image}" />
        <div>
        <div class="product-details">
         <p id="p-desc">${pro.title}</>
         <p class="price">$${pro.price}</p>
         <p class="rating-rate">Rating: ${Math.floor(pro.rating.rate)}</p>
         </div>
         <button id="addBtn" onClick='removeFromCart(${pro.id})'>Remove From Cart</button>
          </div> 
        `;
    })
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

  localStorage.setItem('cartArr',JSON.stringify(cartItem));
  displayCart(cartItem);
}

if(cartItem.length==0){
  itemContainer.innerHTML=`
  <h4 class="e-msg">Cart is empty !</h4>
  `;
}
