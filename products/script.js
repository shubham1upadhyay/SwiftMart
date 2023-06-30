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
  console.log(productArr);
});


// function to display the products

function displayProducts(products){
  products.forEach(pro =>{
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
  product = productArr.filter(ele=>{
    if(ele.title.toLowerCase().includes(searchBar.value.trim().toLowerCase())){
      return ele;
    }
  })
  if(product.length==0){
    productContainer.innerHTML=`
    <p class="e-msg"> No any product found ! 🥺</P>
    `
    return;
  }
  productContainer.innerHTML = '';
  displayProducts(product);
})

// product = JSON.parse(localStorage.getItem('productArr'));
// displayProducts(product);


allBtn.addEventListener('click', ()=>{
  product = JSON.parse(localStorage.getItem('productArr'));
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
  displayProducts(product)
})

menBtn.addEventListener('click', ()=>{
  product = productArr.filter(ele=>{
    if(ele.category=="men's clothing"){
      return ele;
    }
  })
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
  displayProducts(product)
})

womenBtn.addEventListener('click', ()=>{
  product = productArr.filter(ele=>{
    if(ele.category=="women's clothing"){
      return ele;
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
  displayProducts(product)
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
  product = productArr.filter(ele=>{
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
  displayProducts(product)
})


range.addEventListener('input',()=>{
  console.log(range.value);
  if(range.value==0){
    displayProducts(productArr);
    return;
  }
  product = productArr.filter(ele=>{
    if(Math.floor(ele.rating.rate)==range.value){
      return ele;
    }
  })
  if(product.length==0){
    productContainer.innerHTML=`
    <p class="e-msg"> No any product found ! 🥺</P>
    `
    return;
  }
  displayProducts(product);
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


  productArr = productArr.filter(p =>{
    if(filteredProducts.includes(p)){
      return p;
    }
  })
  displayProducts(productArr);
}


function addToCart(id){
  let item;
  productArr.forEach((ele)=>{
    if(ele.id===id){
      item=ele;
    }
  })
  cartArr.push(item);
  localStorage.setItem('cartArr',JSON.stringify(cartArr));
  console.log(JSON.parse(localStorage.getItem('cartArr')));
}


























if (!sessionStorage.getItem('activeUser')) {
    profileBtn.style.display = "none";
}
