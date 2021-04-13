const Name = document.querySelector(".name");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const rePassword = document.querySelector(".re-password");

const validateName = () => {
	const nameError = document.querySelector(".name-error");
	let checkName = /^[a-z\d_]+$/i;

	if (Name.value.trim() == "") {
		nameError.innerHTML = "This field is required";
		return false;
	} else if (!checkName.test(Name.value)) {
		nameError.innerHTML = "Please enter a valid name";
		return false;
	}
	nameError.innerHTML = "";
	return true;
};

const validateEmail = () => {
	const emailError = document.querySelector(".email-error");
	const checkEmail = /^([a-z \d \. -]+)@([a-z \d -]+)\.([a-z]+)(\.[a-z]+)?$/;
	if (email.value.trim() == "") {
		emailError.innerHTML = "This field is required";
		return false;
	} else if (!checkEmail.test(email.value)) {
		emailError.innerHTML = "Please enter a valid email address";
		return false;
	}
	emailError.innerHTML = "";
	return true;
};

const validatePassword = () => {
	const passwordError = document.querySelector(".password-error");
	const checkNum = /[0-9]+/;
	const checkUpper = /[A-Z]+/;
	const checkLower = /[a-z]+/;
	const checkSpecial = /[!@#$%^&*]+/;
	
	if (password.value.trim() == "") {
		passwordError.innerHTML = "This field is required";
		return false;
	} 
	if(!checkUpper.test(password.value)) {
		passwordError.innerHTML = "Must contain a uppercase letter";
		return false;
	} 
	if(!checkLower.test(password.value)) {
		passwordError.innerHTML = "Must contain a lowercase letter";
		return false;
	} 
	if(!checkSpecial.test(password.value)) {
		passwordError.innerHTML = "Must contain a special character";
		return false;
	} 
	if(!checkNum.test(password.value)) {
		passwordError.innerHTML = "Must contain a number";
		return false;
	} 
	if(password.value.length < 8 || password.value.length > 25) {
		passwordError.innerHTML = "Password length must be 8-25";
		return false;
	}
	passwordError.innerHTML = "";
	return true;
};

const validateRePassword = () => {
	const rePasswordError = document.querySelector(".re-password-error");
	if (rePassword.value.trim() == "") {
		rePasswordError.innerHTML = "This field is required";
		return false;
	} else if (rePassword.value !== password.value) {
		rePasswordError.innerHTML = "Password doesn't match";
		return false;
	}
	rePasswordError.innerHTML = "";
	return true;
};


const validateSignUp = () => {
	if (validateName() && validateEmail() && validatePassword() && validateRePassword()) {
		return true;
	}
	return false;
};

Name.addEventListener("keyup", validateName);
email.addEventListener("keyup", validateEmail);
password.addEventListener("keyup", validatePassword);
rePassword.addEventListener("keyup", validateRePassword);
