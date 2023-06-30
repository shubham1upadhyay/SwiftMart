const mobileNumber = document.getElementById("mobile-number");
const continueBtn = document.getElementById("continue-btn")
const fName = document.getElementById("first-name");
const lName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const city = document.getElementById("city");
const state = document.getElementById("state");
const createBtn = document.getElementById("create-btn");

const homeBtn = document.getElementById("home");
const productBtn = document.getElementById("product");
const mycartBtn = document.getElementById("my-cart");
const profileBtn = document.getElementById("profile");
const loginBtn = document.getElementById("login");

loginBtn.addEventListener('click', (event)=>{
  event.preventDefault();
  location.href = "/login";
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
profileBtn.addEventListener('click', ()=>{
  location.href = "/profile"
});


mobileNumber.addEventListener("keyup", (event) => {
    let mobileNumberInput = mobileNumber.value.trim();
    let val = event.target.value;
    if (val === "") {
      document.getElementById("e-msg").innerText =
        "Please enter your mobile number";
    } else {
      document.getElementById("e-msg").innerText =
        "Mobile number consits of 10 digits.";
    }
  
    if (isValidNumber(mobileNumberInput)) {
      document.getElementById("e-msg").innerText = "Now Good !";
    }
  });


  continueBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let mobileNumberInput = mobileNumber.value.trim();
  
    if (mobileNumberInput === "") {
      document.getElementById("e-msg").innerText =
        "Please enter your mobile number";
    } else {
      if(localStorage.getItem("users")){
        if(userExistWithMobile(mobileNumberInput)){
          console.log("haan")
        document.getElementById("e-msg").innerText = "Mobile Number already registered with us !"
        }
        else{
          document.getElementById("e-msg").innerText = '';
          saveMobile(mobileNumberInput);
          console.log("saving mobile")
          document.getElementById("first").style.display = "none";
          document.getElementById("second").style.display = "block";
          mobileNumber.value = "";
          continueBtn.classList.add("d-none");
      }

      }else{
          document.getElementById("e-msg").innerText = '';
          saveMobile(mobileNumberInput);
          console.log("saving mobile")
          document.getElementById("first").style.display = "none";
          document.getElementById("second").style.display = "block";
          mobileNumber.value = "";
          continueBtn.classList.add("d-none");
        console.log("saving 2")
      }
    }

    
  });
       

  // mobile number validaation function
function isValidNumber(mobile) {
    let num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let arr = mobile.split("");
    if (arr.length < 10) {
      return false;
    } else if (arr.length > 10) {
      return false;
    } else {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == num[i]) {
          return true;
        }
      }
    }
  }
  
  
  // create account functions
  createBtn.addEventListener('click', (event)=>{
      event.preventDefault();
      // data-bs-target="#success" data-bs-dismiss="modal" data-bs-toggle="modal"
      let mobileNumberInput = mobileNumber.value.trim();
      let fNameInput = fName.value.trim();
      let lNameInput = lName.value.trim();
      let emailInput = email.value.trim();
      let passwordInput = password.value.trim();
      let confirmPasswordInput = confirmPassword.value.trim();
      let cityInput = city.value.trim();
      let stateInput = state.value.trim();
  
      if(fNameInput === '' || lNameInput === '' || emailInput === '' || passwordInput === '' || confirmPasswordInput === '' || cityInput === '' || stateInput === '')
      {
          document.getElementById("msg").innerText = "All fields are required !"
      }
  
      else if(!isValidEmail(emailInput)){
          document.getElementById("msg").innerText = "Please enter you correct email !"   
      }
      else if(passwordInput !== confirmPasswordInput){
          document.getElementById("msg").innerText = "Please check, Confirm password not matching !"
          password.value = '';
          confirmPassword.value = '';
          password.style.borderColor = "red";
          confirmPassword.style.borderColor = "red";
        }
  
      else{
          password.style.borderColor = "grey";
          confirmPassword.style.borderColor = "grey";
          
          if(localStorage.getItem("users")){
              if(userExist(emailInput)) {
              document.getElementById("msg").innerText = "Email Id already registered with us !"   
              email.value = '';  
              email.style.borderColor = "red";
            }else{
                  email.style.borderColor = "grey";
                  saveUser(fNameInput, lNameInput, emailInput, passwordInput);
                  createBtn.textContent = "Done";
                  document.getElementById("msg").innerText = '';
                  // createBtn.setAttribute('data-bs-dismiss', 'modal');
                  fName.value = '';
                  lName.value = '';
                  email.value = '';
                  password.value = '';
                  confirmPassword.value = '';
                  city.value = '';
                  state.value = '';
                  location.href = "/";
              }
          }
          else{
              saveUser(fNameInput, lNameInput, emailInput, passwordInput, mobileNumberInput);
              // createBtn.setAttribute('data-bs-dismiss', 'modal');
              fName.value = '';
              lName.value = '';
              email.value = '';
              password.value = '';
              confirmPassword.value = '';
              city.value = '';
              state.value = '';
              location.href = "/";
          }
        }         
      // }
  
  })
  
  // email validation
  function isValidEmail(email){
      var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      return isValid;
  }
  
  // handle form data
  var form = document.getElementById('myForm');
  function handleSubmit(event) {
    event.preventDefault();
    form.reset();
  }

  // save user function

function saveUser(fName, lName, email, password){
    let userObj = {
        firstName:fName,
        lastName:lName,
        email:email,
        password:password,
    };
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userObj);
    
    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("activeUser", JSON.stringify(userObj));
    
    // console.log("working");
}
function saveMobile(mobile){
  let mob = {
    mobileNumber : mobile
  };

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(mob);
  localStorage.setItem("users", JSON.stringify(users));
}
    
    // if user exist
    function userExist(email) {
        let users = JSON.parse(localStorage.getItem("users"));
    
        const obj = users.find((userObj) =>{
            return userObj.email === email;
        });
        if(obj) return true;
        else return false;
    }


    function userExistWithMobile(mobile) {
      var user = localStorage.getItem('users') || [];
      var userData = JSON.parse(user);
      for(let i=0; i<userData.length; i++){
        if(userData[i].mobileNumber === mobile){
          return true;
        }
      } 
}


  