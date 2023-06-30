const loginBtn1 = document.getElementById("login-1");
const signupBtn1 = document.getElementById("signup-1");
const loginBtn2 = document.getElementById("login-2");
const signupBtn2 = document.getElementById("signup-2");
const profileBtn = document.getElementById("profile");
const myCartBtn = document.getElementById("my-cart");
const nextBtn = document.getElementById("next-btn");
const productBtn = document.getElementById("product");

// extracting signup form's input fields
const fName = document.getElementById("first-name");
const lName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const city = document.getElementById("city");
const state = document.getElementById("state");
const createBtn = document.getElementById("create-btn");

let users = [];
loginBtn1.addEventListener("click", () => {
  location.href = "/login";
});
signupBtn2.addEventListener("click", () => {
  location.href = "/signup";
});
loginBtn2.addEventListener("click", () => {
  location.href = "./login";
});

signupBtn2.addEventListener("click", () => {
  location.href = "./signup";
});

profileBtn.addEventListener("click", () => {
  let user = sessionStorage.getItem("activeUser");
  if (!user) {
    // alert("please log in first")
    location.href = "./login";
  } else {
    location.href = "./profile";
  }
});
productBtn.addEventListener('click', ()=>{
  location.href = "/products";
})
myCartBtn.addEventListener("click", () => {
  location.href = "./cart";
});

// mobile number validation
let mobileNumber = document.getElementById("mobile-number");
let continueBtn = document.getElementById("continue-btn");

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
    if (isValidNumber(mobileNumberInput)) {
      document.getElementById("e-msg").style.display = "none";
      document.getElementById("s-msg").classList.remove("d-none");
      mobileNumber.value = "";
      nextBtn.classList.remove("d-none");
      continueBtn.classList.add("d-none");
    }

    document.getElementById("e-msg").innerText =
      "Its not a joke, please wake up ! ";
  }
});

nextBtn.addEventListener("click", (event) => {
  event.preventDefault();
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
createBtn.addEventListener("click", (event) => {
  event.preventDefault();
  // data-bs-target="#success" data-bs-dismiss="modal" data-bs-toggle="modal"
  let fNameInput = fName.value.trim();
  let lNameInput = lName.value.trim();
  let emailInput = email.value.trim();
  let passwordInput = password.value.trim();
  let confirmPasswordInput = confirmPassword.value.trim();
  let cityInput = city.value.trim();
  let stateInput = state.value.trim();

  if (
    fNameInput === "" ||
    lNameInput === "" ||
    emailInput === "" ||
    passwordInput === "" ||
    confirmPasswordInput === "" ||
    cityInput === "" ||
    stateInput === ""
  ) {
    document.getElementById("msg").innerText = "All fields are required !";
  } else if (!isValidEmail(emailInput)) {
    document.getElementById("msg").innerText =
      "Please enter you correct email !";
  } else if (passwordInput !== confirmPasswordInput) {
    document.getElementById("msg").innerText =
      "Please check, Confirm password not matching !";
    password.value = "";
    confirmPassword.value = "";
    password.style.borderColor = "red";
    confirmPassword.style.borderColor = "red";
  } else {
    password.style.borderColor = "grey";
    confirmPassword.style.borderColor = "grey";

    if (localStorage.getItem("users")) {
      if (userExist(emailInput)) {
        document.getElementById("msg").innerText =
          "Email Id already registered with us !";
        email.value = "";
        email.style.borderColor = "red";
      } else {
        email.style.borderColor = "grey";
        saveUser(fNameInput, lNameInput, emailInput, passwordInput);
        createBtn.textContent = "Done";
        document.getElementById("msg").innerText = "";
        // createBtn.setAttribute('data-bs-dismiss', 'modal');
        fName.value = "";
        lName.value = "";
        email.value = "";
        password.value = "";
        confirmPassword.value = "";
        city.value = "";
        state.value = "";
        location.href = "./profile";
      }
    } else {
      saveUser(fNameInput, lNameInput, emailInput, passwordInput);
      // createBtn.setAttribute('data-bs-dismiss', 'modal');
      fName.value = "";
      lName.value = "";
      email.value = "";
      password.value = "";
      confirmPassword.value = "";
      city.value = "";
      state.value = "";
      location.href = "./profile";
    }
  }

  // }
});

// email validation
function isValidEmail(email) {
  var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return isValid;
}

// handle form data
var form = document.getElementById("myForm");
function handleSubmit(event) {
  event.preventDefault();
  form.reset();
}
form.addEventListener("submit", handleSubmit);
document.getElementById("close").addEventListener("click", () => {
  fName.value = "";
  lName.value = "";
  password.value = "";
  confirmPassword.value = "";
  email.value = "";
  city.value = "";
  state.value = "";
  document.getElementById("msg").innerText = "";
  document.getElementById("mobile-number").value = "";
  document.getElementById("e-msg").innerText = "";
});

// save user function

function saveUser(fName, lName, email, password) {
  let userObj = {
    firstName: fName,
    lastName: lName,
    email: email,
    password: password,
  };
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(userObj);

  localStorage.setItem("users", JSON.stringify(users));
  sessionStorage.setItem("activeUser", JSON.stringify(userObj));

  // console.log("working");
}

// if user exist
function userExist(email) {
  let users = JSON.parse(localStorage.getItem("users"));

  const obj = users.find((userObj) => {
    return userObj.email === email;
  });
  if (obj) return true;
  else return false;
}


if (sessionStorage.getItem('activeUser')) {
  loginBtn1.style.display="none";
  loginBtn2.style.display = "none";
  signupBtn1.style.display="none";
  signupBtn2.style.display = "none";
}
