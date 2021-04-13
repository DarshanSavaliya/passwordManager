const username = document.querySelector(".username");
const password = document.querySelector(".password");

const storeCredentials = () => {
	if (document.querySelector(".checkbox").checked) {
		localStorage.setItem("username", username.value);
		localStorage.setItem("password", password.value);
	}
};

const validate = () => {
	const name_error_msg = document.querySelector(".username-error");
	const password_error_msg = document.querySelector(".password-error");
	let return_val = true;

	if(username.value.trim() === '') {
		name_error_msg.innerHTML = 'This field is required';
		return_val = false;
	} else {
		name_error_msg.innerHTML = '';
	}
	
	if(password.value.trim() === '') {
		password_error_msg.innerHTML = 'This field is required';
		return_val = false;
	} else {
		password_error_msg.innerHTML = '';
	}

	return return_val;
}

const autoFill = () => {
	let getUsername = localStorage.getItem("username");
	let getPassword = localStorage.getItem("password");
	username.value = getUsername;
	password.value = getPassword;
};

const validateSignIn = () => {
	if(validate()){
		storeCredentials();
		return true;
	} 
	return false;
	// const form = document.querySelector('#form');
	// form.addEventListener('submit', (e) => e.preventDefault());
};

username.addEventListener('keyup', validate);
password.addEventListener('keyup', validate);

autoFill();
