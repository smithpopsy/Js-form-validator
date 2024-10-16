const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("password2");
const captcha = document.getElementById("captcha");

//add an event listener and prevent default behaviour of the form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkInputs();
});

function setError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}
function setSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();
  const captchaValue = captcha.value.trim();
  //validate the username (empty fields,min length is 5)
  if (!usernameValue) {
    //username is required
    setError(username, "username is required");
  } else if (usernameValue.length <= 5) {
    //min username length is 5
    setError(username, "minimum username length is 5");
  } else {
    setSuccess(username);
  }

  // validate email (email must not be empty, email must include @)
  if (!emailValue) {
    //  email is required
    setError(email, "email is required");
  } else if (!emailValue.includes("@")) {
    setError(email, "does not include @");
  } else {
    setSuccess(email);
  }

  // password must not be empty and the min password length is 7
  if (!passwordValue) {
    // password is required
    setError(password, "password is required");
  } else if (passwordValue.length <= 7) {
    // min password length is 7
    setError(password, "minimum password length is 7");
  } else {
    setSuccess(password);
  }

  if (!confirmPasswordValue) {
    setError(confirmPassword, "password is requird");
  } else if (confirmPasswordValue !== passwordValue) {
    setError(confirmPassword, "password does not match");
  } else {
    setSuccess(confirmPassword);
  }

  if (!captchaValue) {
    setError(captcha, "captcha is required");
  }
}

//  select that button using the class show-btn
const showBtn = document.querySelector(".show-btn");
showBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const inputType = password.getAttribute("type");
  if (inputType === "password") {
    password.setAttribute("type", "text");
    showBtn.value = "Hide";
  } else {
    password.setAttribute("type", "password");
    showBtn.value = "Show";
  }
});

captcha.addEventListener('input', (event) =>{
    const img = document.querySelector("img");
    const text = event.target.value;
    const blurValue = 20 - text.length;
    img.style.filter = `blur(${blurValue}px)`;

    if(blurValue <= 0){
        setSuccess(captcha);

    }else{
        setError(captcha, "Text is not long enough ")
    }

});
