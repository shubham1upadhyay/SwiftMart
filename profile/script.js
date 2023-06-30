const homeBtn = document.getElementById("home");
const productBtn = document.getElementById("products");
const mycartBtn = document.getElementById("my-cart");
const helpBtn = document.getElementById("help");
const logoutBtn = document.getElementById("logout");

helpBtn.addEventListener('click', ()=>{
    window.location.href = "/help/";
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
    window.location.href = '/login';
  }

 let user = JSON.parse(sessionStorage.getItem("activeUser"));
document.getElementById("name").innerText = user.firstName.toUpperCase() + " " + user.lastName.toUpperCase();
document.getElementById("email").innerText = user.email;