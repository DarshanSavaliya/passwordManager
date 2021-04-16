console.log("F")
const tag_pk = document.querySelector(".tag_pk");
const passwordContainer = document.querySelector(".password-container");
const emailContainer = document.querySelector(".email-container");
let passwordText = document.querySelector(".password-text");
let emailText = document.querySelector(".email-text");
const message = document.querySelector(".message");
const passwordHidden = document.querySelector(".password");
const inputNotes = document.querySelector(".new-note");
const email = document.querySelector(".email");
email.value = emailText.innerHTML;
passwordHidden.value = passwordText.innerHTML;
passwordContainer.addEventListener("mouseenter", () => {
	passwordHidden.type = "text";
});
passwordContainer.addEventListener("mouseleave", () => {
	passwordHidden.type = "password";
});

const tagForm = document.querySelector(".tag-form");
const cancelTag = document.querySelector(".cancel-tag");
const addTag = document.querySelector(".add-tag");

addTag.addEventListener("click", () => {
	tagForm.classList.remove("hidden");
	addTag.classList.add("hidden");
})

cancelTag.addEventListener("click", () => {
	tagForm.classList.add("hidden");
	addTag.classList.remove("hidden");
})

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
const deletePopup = document.querySelector(".delete-popup")
const closePopup = document.querySelector(".close-popup")
let onEdit = false;

del.addEventListener("click", () => {
	deletePopup.classList.add("scale-100");
	deletePopup.classList.remove("-translate-y-full");
})

closePopup.addEventListener("click", () => {
	deletePopup.classList.remove("scale-100");
	deletePopup.classList.add("-translate-y-full");
})

edit.addEventListener("click", () => {
	onEdit = true;
	done.classList.remove("hidden");
	can.classList.remove("hidden");
	del.classList.add("hidden");
	edit.classList.add("hidden");
	email.removeAttribute("readonly");
	passwordHidden.removeAttribute("readonly");
	inputNotes.removeAttribute("readonly");
});

const addNoteButton = document.querySelector(".add-note-button");
addNoteButton.addEventListener("click", () => {
	noteButton.classList.add("hidden");
	noteContainer.classList.remove("hidden");
	onEdit = true;
	done.classList.remove("hidden");
	can.classList.remove("hidden");
	del.classList.add("hidden");
	edit.classList.add("hidden");
	email.removeAttribute("readonly");
	passwordHidden.removeAttribute("readonly");
	inputNotes.removeAttribute("readonly");
})

done.addEventListener("click", () => {
	onEdit = false;
	done.classList.add("hidden");
	can.classList.add("hidden");
	del.classList.remove("hidden");
	edit.classList.remove("hidden");
	email.setAttributeNode(document.createAttribute("readonly"));
	passwordHidden.setAttributeNode(document.createAttribute("readonly"));
	inputNotes.setAttributeNode(document.createAttribute("readonly"));
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
	inputNotes.setAttributeNode(document.createAttribute("readonly"));
	checkEmptyNote();
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
		copy(passwordText.innerHTML);
	}
});
emailContainer.addEventListener("click", () => {
	if (!onEdit) {
		copy(emailText.innerHTML);
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
	if (note.value === "") {
		noteButton.classList.remove("hidden");
		noteContainer.classList.add("hidden");
	} else {
		noteButton.classList.add("hidden");
		noteContainer.classList.remove("hidden");
	}
}

const passwordTags = document.querySelector(".password-tags");
const allTags = document.querySelectorAll(".tag");

function fillData(data) {
	passwordTags.innerHTML = '';
	emailText.innerHTML = data[3].innerHTML;
	subHeading.innerHTML = data[3].innerHTML;
	passwordText.innerHTML = data[1].innerHTML;
	note.value = data[0].innerHTML;
	website.innerHTML = data[2].innerHTML;
	heading.innerHTML = data[2].innerHTML;
	pk.value = data[4].innerHTML;
	email.value = emailText.innerHTML;
	passwordHidden.value = passwordText.innerHTML;
	for(var i=5; i<data.length; i+=2) {
		passwordTags.innerHTML	+= `<div class="flex item-center  bg-blue-500 justify-center text-white font-semibold text-sm py-1 px-2 rounded"><input type="text" name="tag_id" value="${data[i].innerHTML}" class="hidden" /><input type="text" name="password_id" value="${data[4].innerHTML}" class="hidden" /><p class="pr-1 cursor-pointer">${data[i+1].innerHTML}</p><button onclick="document.querySelector('.on-delete').value = 5"><i class="fas fa-times text-sm outline-none"></i></button></div>`;
	}
	passwordTags.innerHTML += `<select onchange="submitForm()" class="bg-blue-500 text-white font-semibold text-sm py-1 px-2 rounded outline-none add-tag-option"></select>`;
	const addTagOption = document.querySelector(".add-tag-option");
	addTagOption.innerHTML = "<option class='bg-white text-black' selected>Add Tag</option>";
	var isTagged = false;
	for(var i=1; i<allTags.length; i++) {
		isTagged = false;
		for(var j=5; j<data.length; j+=2) {
			if(allTags[i].children[2].innerHTML == data[j].innerHTML) {
				isTagged = true;
				break;
			}
		}
		if(isTagged) continue;
		addTagOption.innerHTML += `<option value="${allTags[i].children[2].innerHTML}" class="bg-white text-black">${allTags[i].children[1].innerHTML}</option>`
	}
	addTagOption.classList.remove("hidden");
	if(allTags.length - (data.length-5)/2 - 1 == 0) {
		addTagOption.classList.add("hidden");
	}
	checkEmptyNote();
}

const content = document.querySelector(".content");
const closeContent = document.querySelector(".close-content");
const cardContainer = document.querySelector(".card-container");
const cards = document.querySelectorAll(".card");
const mainContainer = document.querySelector('.main-container');
const altContainer = document.querySelector('.alt-container');

const selectedCard = () => {
	cards.forEach((card) => {
		card.classList.remove("bg-blue-500");
		card.classList.remove("text-white");
		content.classList.remove("scale-100");
		card.children[1].children[3].style.color = "#6b7280";
	});
};

cards.forEach((card) => {
	card.addEventListener("click", () => {
		selectedCard();
		mainContainer.classList.remove("hidden");
		altContainer.classList.add("hidden");
		let data = card.children[1].children;
		fillData(data);
		card.classList.add("bg-blue-500");
		card.classList.add("text-white");
		content.classList.add("scale-100");
		card.children[1].children[3].style.color = "#e5e7eb";
	});
});

closeContent.addEventListener("click", () => {
	content.classList.remove("scale-100");
});

const removeSelectedTag = () => {
	tag_Container.forEach((tagid) => {
		tagid.children[0].classList.remove("bg-blue-500");
		tagid.children[0].classList.remove("text-white");
		tagid.children[0].children[0].classList.add("text-blue-500");
	});
};

selectedTagPasswords = () => {
	cards.forEach((card) => {
		if (tag_pk.innerHTML == 0) {
			card.classList.remove("hidden");
		} else {
			card.classList.add("hidden");
			for (var i = 5; i < card.children[1].childElementCount; i+=2) {
				if (card.children[1].children[i].innerHTML == tag_pk.innerHTML) {
					card.classList.remove("hidden");
					break;
				}
			}
		}
	});
}

const tag_Container = document.querySelectorAll(".tags");
tag_Container[0].children[0].classList.add("bg-blue-500");
tag_Container[0].children[0].classList.add("text-white");
tag_Container[0].children[0].children[0].classList.remove("text-blue-500");
tag_Container[0].children[0].children[0].classList.add("text-white");

tag_Container.forEach((tagid) => {
	tagid.addEventListener("click", () => {
		removeSelectedTag();
		tag_pk.innerHTML = tagid.children[0].children[2].innerHTML;
		selectedTagPasswords();
		tagid.children[0].classList.add("bg-blue-500");
		tagid.children[0].classList.add("text-white");
		tagid.children[0].children[0].classList.remove("text-blue-500");
		tagid.children[0].children[0].classList.add("text-white");
	});
});

const searchText = document.querySelector(".search-text");

searchPassword = () => {
	cards.forEach((card) => {
		card.classList.add("hidden");
		if(card.children[1].children[2].innerHTML.includes(searchText.value)){
			card.classList.remove("hidden");
		}
	});
};

const form = document.getElementById("main-form");
const tagInput = document.querySelector(".add_tag_id")
submitForm = () => {
	document.querySelector(".on-delete").value = 6;
	const addTagOption = document.querySelector(".add-tag-option");
	tagInput.value = addTagOption.value;
	form.submit();
}

//Mobile Support
const allTagButton = document.querySelector(".all-tags-btn");
const allTagCloseButton = document.querySelector(".all-tags-close-btn");
const allTagContainer = document.querySelector(".all-tags-container");

allTagButton.addEventListener("click", () => {
	allTagContainer.classList.remove("-translate-x-full");
});

allTagCloseButton.addEventListener("click", () => {
	allTagContainer.classList.add("-translate-x-full");
});