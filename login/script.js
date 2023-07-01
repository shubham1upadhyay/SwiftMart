const homeBtn = document.getElementById("home");
const signupBtn = document.getElementById("signup");
const signupBtn1 = document.getElementById("signup1");
const productBtn = document.getElementById("product");
const helpBtn = document.getElementById("help");
const profileBtn = document.getElementById("profile");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("login");
let emsg = document.getElementById("e-msg");
let emsg1 = document.getElementById("e-msg1");

homeBtn.addEventListener('click', ()=>{
    location.href="/";
})
profileBtn.addEventListener('click', ()=>{
    location.href = "/profile";
})
signupBtn.addEventListener('click', ()=>{
    location.href="/signup";
})
signupBtn1.addEventListener('click', ()=>{
    location.href="/signup";
})

helpBtn.addEventListener('click', ()=>{
    location.href="/help";
})

productBtn.addEventListener('click', ()=>{
    location.href="/products";
})
// handle form data
var form = document.getElementById('myForm');
function handleSubmit(event) {
  event.preventDefault();
  form.reset();
}
form.addEventListener('submit', handleSubmit);

loginBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    let emailInput = email.value.trim();
    let passwordInput = password.value.trim();

    if(emailInput === '' || passwordInput === ''){
        document.getElementById('msg').innerText = "We can't let you in like this, please enter the details 😒"
    }
    else{
        document.getElementById('msg').innerText = '';
        let users = JSON.parse(localStorage.getItem('users'));
        if(users){

            let user = users.find((currentUser)=>{
                return currentUser.email === email.value.trim();
            });

            if(user){
                if(user.password === passwordInput){
                    sessionStorage.setItem("activeUser", JSON.stringify(user));
                    email.value = '';
                    password.value = '';
                    location.href = '/profile'
                    emsg1.innerText = '';
                }else{
                    document.getElementById('msg').innerText = "Email is correct !, but now what is this 🤨"
                    emsg1.innerText = "Incorrect Password";
                    emsg1.style.color = "red";
                }
        
            }
            else{
                document.getElementById('msg').innerText = "Email id is not registered with us 🤔"
            }
        }
    }
})


