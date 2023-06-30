const homeBtn = document.getElementById("home");
const mycartBtn = document.getElementById("my-cart");
const helpBtn = document.getElementById("help");
const profileBtn = document.getElementById("profile");


homeBtn.addEventListener('click', ()=>{
  location.href = "/"
});
mycartBtn.addEventListener('click', ()=>{
  location.href = "/cart"
});
helpBtn.addEventListener('click', ()=>{
    window.location.href = "/help/";
})
profileBtn.addEventListener('click', ()=>{
    location.href = "/profile"
  });






















// if (!sessionStorage.getItem('activeUser')) {
//     profileBtn.style.display = "none";
// }