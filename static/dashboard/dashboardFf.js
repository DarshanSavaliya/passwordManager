console.log("F")
const tagContainer = document.querySelector(".tag-container");
const tags = document.querySelectorAll(".tag");
tags[0].classList.add("bg-blue-500");
tags[0].classList.add("text-white");
tags[0].children[0].style.color = "#fff";
const selectedTag = () => {
	tags.forEach((tag) => {
		tag.classList.remove("bg-blue-500");
		tag.classList.remove("text-white");
		tag.children[0].style.color = "#3b82f6";
	});
};
tags.forEach((tag) => {
	tag.addEventListener("click", () => {
		selectedTag();
		tag.classList.add("bg-blue-500");
		tag.classList.add("text-white");
		tag.children[0].style.color = "#fff";
	});
});

const passwordContainer = document.querySelector(".password-container");
const emailContainer = document.querySelector(".email-container");
let passwordText = document.querySelector(".password-text");
let emailText = document.querySelector(".email-text");
const message = document.querySelector(".message");
const passwordHidden = document.querySelector(".password");
const notes = document.querySelector(".input-notes");
const email = document.querySelector(".email");
email.value = emailText.innerHTML;
passwordHidden.value = passwordText.innerHTML;
passwordContainer.addEventListener("mouseenter", () => {
	passwordHidden.type = "text";
});
passwordContainer.addEventListener("mouseleave", () => {
	passwordHidden.type = "password";
});

const addButton = document.querySelector(".add-button");
const add = document.querySelector(".add");
addButton.addEventListener("click", () => {
	add.classList.add("scale-100");
});
const cancel = () => {
	add.classList.remove("scale-100");
};

const edit = document.querySelector(".edit");
const done = document.querySelector(".done");
const can = document.querySelector(".cancel");
const del = document.querySelector(".delete");
let onEdit = false;
edit.addEventListener("click", () => {
	onEdit = true;
	done.classList.remove("hidden");
	can.classList.remove("hidden");
	del.classList.add("hidden");
	edit.classList.add("hidden");
	email.removeAttribute("readonly");
	passwordHidden.removeAttribute("readonly");
});

done.addEventListener("click", () => {
	onEdit = false;
	done.classList.add("hidden");
	can.classList.add("hidden");
	del.classList.remove("hidden");
	edit.classList.remove("hidden");
	email.setAttributeNode(document.createAttribute("readonly"));
	passwordHidden.setAttributeNode(document.createAttribute("readonly"));
});

can.addEventListener("click", () => {
	onEdit = false;
	email.value = emailText.innerHTML;
	passwordHidden.value = passwordText.innerHTML;
	done.classList.add("hidden");
	can.classList.add("hidden");
	del.classList.remove("hidden");
	edit.classList.remove("hidden");
	email.setAttributeNode(document.createAttribute("readonly"));
	passwordHidden.setAttributeNode(document.createAttribute("readonly"));
});

const copy = (text) => {
	navigator.clipboard.writeText(text);
	message.classList.add("scale-100");
	setTimeout(() => {
		message.classList.remove("scale-100");
	}, 3000);
};

passwordContainer.addEventListener("click", () => {
	if (!onEdit) {
		copy(passwordText);
	}
});
emailContainer.addEventListener("click", () => {
	if (!onEdit) {
		copy(emailText);
	}
});

let website = document.querySelector(".website");
let note = document.querySelector(".note-text");
let noteButton = document.querySelector(".add-note")
let noteContainer = document.querySelector(".notes")
const pk = document.querySelector(".primary-key");
const heading = document.querySelector(".heading");
const subHeading = document.querySelector(".sub-heading");

const checkEmptyNote = () => {
	if(note === "") {
		noteButton.classList.remove("hidden");
		noteContainer.classList.add("hidden");
	}
}

function fillData(data) {
	emailText.innerHTML = data[3].innerHTML;
	subHeading.innerHTML = data[3].innerHTML;
	passwordText.innerHTML = data[1].innerHTML;
	note.innerHTML = data[0].innerHTML;
	website.innerHTML = data[2].innerHTML;
	heading.innerHTML = data[2].innerHTML;
	notes.value = data[0].innerHTML;
	pk.value = data[4].innerHTML;
	email.value = emailText.innerHTML;
	passwordHidden.value = passwordText.innerHTML;
	checkEmptyNote();
}

const cardContainer = document.querySelector(".card-container");
const cards = document.querySelectorAll(".card");

const selectedCard = () => {
	cards.forEach((card) => {
		card.classList.remove("bg-blue-500");
		card.classList.remove("text-white");
		card.children[1].children[1].style.color = "#6b7280";
	});
};

cards.forEach((card) => {
	card.addEventListener("click", () => {
		selectedCard();
		let data = card.children[1].children;
		fillData(data);
		
		card.classList.add("bg-blue-500");
		card.classList.add("text-white");
		card.children[1].children[1].style.color = "#e5e7eb";
	});
});
