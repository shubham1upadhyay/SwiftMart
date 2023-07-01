const homeBtn = document.getElementById("home");
const mycartBtn = document.getElementById("my-cart");
const helpBtn = document.getElementById("help");
const profileBtn = document.getElementById("profile");
const searchBar = document.getElementById("search-input");
const productContainer = document.getElementById("product-container");
const wContainer = document.getElementById("women-section");
const eContainer = document.getElementById("electronics-section");
const jContainer = document.getElementById("jewelery-section");
const allBtn = document.getElementById("all");
const menBtn = document.getElementById("men");
const womenBtn = document.getElementById("women");
const electronicsBtn = document.getElementById("electronics");
const jwelleryBtn = document.getElementById("jwellery");


// reidirections
homeBtn.addEventListener("click", () => {
  location.href = "/";
});
mycartBtn.addEventListener("click", () => {
  location.href = "/cart";
});
helpBtn.addEventListener("click", () => {
  window.location.href = "/help/";
});
profileBtn.addEventListener("click", () => {
  location.href = "/profile";
});

var productArr=[];

if(localStorage.getItem('cartArr')){
  var cartArr=JSON.parse(localStorage.getItem('cartArr'));
}
else{
  var cartArr=[];
}


fetch("https://fakestoreapi.com/products")
.then((resp)=>resp.json())
.then((data)=>{
  productArr=data;
  localStorage.setItem('productArr',JSON.stringify(productArr));
  displayProducts(productArr);
});


// function to display the products

function displayProducts(product){
  productContainer.innerHTML = '';
  product.forEach(pro =>{
    productContainer.innerHTML += `
    <div class="product">
    <div class="product-img">
    <img src = "${pro.image}" />
    <div>
    <div class="product-details">
     <p id="p-desc">${pro.title}</>
     <p class="price">$${pro.price}</p>
    <p class="color">Colors:</p>
     <p class="rating-rate">Rating: ${Math.floor(pro.rating.rate)}</p>
     </div>
      <button class="addCart" id="add-cart" onClick='addToCart(${pro.id})'>Add to Cart</button>   
      </div>   
    `;
  })
}

// search bar functionality
searchBar.addEventListener('input',()=>{
  myArr = productArr.filter(ele=>{
    if(ele.title.toLowerCase().includes(searchBar.value.trim().toLowerCase())){
      return ele;
    }
  })
  if(myArr.length==0){
    productContainer.innerHTML=`
    <p class="e-msg"> No any product found ! 🥺</P>
    `
    return;
  }
  productContainer.innerHTML = '';
  displayProducts(myArr);
})


allBtn.addEventListener('click', ()=>{
  myArr = JSON.parse(localStorage.getItem('productArr'));
  allBtn.style.backgroundColor='black';
  allBtn.style.color='white';
  menBtn.style.color='black';
  menBtn.style.backgroundColor='bisque';
  womenBtn.style.color='black';
  womenBtn.style.backgroundColor='bisque';
  jwelleryBtn.style.color='black';
  jwelleryBtn.style.backgroundColor='bisque';
  electronicsBtn.style.color='black';
  electronicsBtn.style.backgroundColor='bisque';
  displayProducts(myArr)
})

menBtn.addEventListener('click', ()=>{

   myArr = productArr.filter(ele=>{
      if(ele.category === "men's clothing"){
        return ele;
       
      }
  });
  allBtn.style.backgroundColor='bisque';
  allBtn.style.color='black';
  menBtn.style.color='white';
  menBtn.style.backgroundColor='black';
  womenBtn.style.color='black';
  womenBtn.style.backgroundColor='bisque';
  jwelleryBtn.style.color='black';
  jwelleryBtn.style.backgroundColor='bisque';
  electronicsBtn.style.color='black';
  electronicsBtn.style.backgroundColor='bisque';
  displayProducts(myArr)
})

womenBtn.addEventListener('click', ()=>{
  myArr = productArr.filter(ele=>{
    if(ele.category ==="women's clothing"){
      return ele;
      console.log(ele)
    }
  })
  allBtn.style.backgroundColor='bisque';
  allBtn.style.color='black';
  menBtn.style.color='black';
  menBtn.style.backgroundColor='bisque';
  womenBtn.style.color='white';
  womenBtn.style.backgroundColor='black';
  jwelleryBtn.style.color='black';
  jwelleryBtn.style.backgroundColor='bisque';
  electronicsBtn.style.color='black';
  electronicsBtn.style.backgroundColor='bisque';
  displayProducts(myArr)
})

electronicsBtn.addEventListener('click', ()=>{
  product = productArr.filter(ele=>{
    if(ele.category=="electronics"){
      return ele;
    }
  })
  allBtn.style.backgroundColor='bisque';
  allBtn.style.color='black';
  menBtn.style.color='black';
  menBtn.style.backgroundColor='bisque';
  womenBtn.style.color='black';
  womenBtn.style.backgroundColor='bisque';
  jwelleryBtn.style.color='black';
  jwelleryBtn.style.backgroundColor='bisque';
  electronicsBtn.style.color='white';
  electronicsBtn.style.backgroundColor='black';
  displayProducts(product)
})

jwelleryBtn.addEventListener('click', ()=>{
  myArr = productArr.filter(ele=>{
    if(ele.category=="jewelery"){
      return ele;
    }
  })
  allBtn.style.backgroundColor='bisque';
  allBtn.style.color='black';
  menBtn.style.color='black';
  menBtn.style.backgroundColor='bisque';
  womenBtn.style.color='black';
  womenBtn.style.backgroundColor='bisque';
  jwelleryBtn.style.color='white';
  jwelleryBtn.style.backgroundColor='black';
  electronicsBtn.style.color='black';
  electronicsBtn.style.backgroundColor='bisque';
  displayProducts(myArr)
})


range.addEventListener('input',()=>{
  if(range.value==0){
    displayProducts(productArr);
    return;
  }else{
    productContainer.innerHTML = '';
  }
  myArr = productArr.filter(ele=>{
    if(Math.floor(ele.rating.rate)==range.value){
      return ele;
    }else{
      productContainer.innerHTML = '';
    }
  })
  if(myArr.length==0){
    productContainer.innerHTML=`
    <p class="e-msg"> No any product found ! 🥺</P>
    `
    return;
  }
  displayProducts(myArr);
})
range2.addEventListener('input',()=>{
  if(range2.value==0){
    displayProducts(productArr);
    return;
  }else{
    productContainer.innerHTML = '';
  }
  myArr = productArr.filter(ele=>{
    if(Math.floor(ele.rating.rate)==range2.value){
      return ele;
    }else{
      productContainer.innerHTML = '';
    }
  })
  if(myArr.length==0){
    productContainer.innerHTML=`
    <p class="e-msg"> No any product found ! 🥺</P>
    `
    return;
  }
  displayProducts(myArr);
})


document.querySelectorAll('input[type="checkbox"]').forEach(c => {
  c.addEventListener('change', filterProducts);
});


function filterProducts() {
  const checkboxes = Array.from(document.querySelectorAll('input[name="prange"]'));
  const checkedRanges = checkboxes.filter(c => c.checked).map(c => c.value);

  if (checkedRanges.length === 0) {
    displayProducts(productArr);
    return;
  }


  const filteredProducts = productArr.filter(p => {
    const price = p.price;
    for (const range of checkedRanges) {
      if (range === '100+' && price >= 100) {
        return true;
      }
      const [min, max] = range.split('-').map(parseFloat);
      if (price >= min && price <= max) {
        return true;
      }
    }
    return false;
  });


  myArr = productArr.filter(p =>{
    if(filteredProducts.includes(p)){
      return p;
    }
  })
  displayProducts(myArr);
}


// adding product to my cart
function addToCart(id){
  let item;
  productArr.forEach((ele)=>{
    if(ele.id===id){
      item=ele;
    }
  })
  popup();
  cartArr.push(item);
  localStorage.setItem('cartArr',JSON.stringify(cartArr));
}


function popup(){
  if (!sessionStorage.getItem('activeUser')) {
    let popupContainer = document.createElement('div');
    popupContainer.textContent = 'Please log in first !';
    popupContainer.classList.add('popup');
    document.body.appendChild(popupContainer);
    setTimeout(function() {
      document.body.removeChild(popupContainer);
    }, 2000);
    return;
  }
  let popupContainer = document.createElement('div');
  popupContainer.textContent = 'Product added to cart 😀';
  popupContainer.classList.add('popup');

  document.body.appendChild(popupContainer);

  setTimeout(function() {
    document.body.removeChild(popupContainer);
  }, 2000);
  }