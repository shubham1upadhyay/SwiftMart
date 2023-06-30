const homeBtn = document.getElementById("home");
const productBtn = document.getElementById("product");
const mycartBtn = document.getElementById("my-cart");
const profileBtn = document.getElementById("profile");


profileBtn.addEventListener('click', ()=>{
    window.location.href = "/profile";
})
homeBtn.addEventListener('click', ()=>{
  location.href = "/"
});
productBtn.addEventListener('click', ()=>{
  location.href = "/products"
});
mycartBtn.addEventListener('click', ()=>{
  location.href = "/cart"
});

// logout function
logoutBtn.addEventListener('click', ()=>{
    // let user = sessionStorage.getItem("loggedInUser");
    sessionStorage.removeItem("activeUser");
    location.href = "/";
})

if (!sessionStorage.getItem('activeUser')) {
    profileBtn.style.display = "none";
}