const homeBtn = document.getElementById("home");
const productBtn = document.getElementById("product");
const helpBtn = document.getElementById("help");
const profileBtn = document.getElementById("profile");


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





if (!sessionStorage.getItem('activeUser')) {
    window.location.href = '/login';
  }