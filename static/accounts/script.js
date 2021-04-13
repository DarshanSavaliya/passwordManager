const navSlide = () => {
	const burger = document.querySelector(".nav__burger");
	const line1 = document.querySelector(".line1");
	const line2 = document.querySelector(".line2");
	const line3 = document.querySelector(".line3");
	const navLinks = document.querySelector(".nav__links");

	burger.addEventListener("click", () => {
		navLinks.classList.toggle("transform");
		navLinks.classList.toggle("translate-x-0");

		line1.classList.toggle("transform");
		line1.classList.toggle("rotate-45");
		line1.classList.toggle("translate-y-1");
		line2.classList.toggle("hidden");
		line3.classList.toggle("transform");
		line3.classList.toggle("-rotate-45");
		line3.classList.toggle("-translate-y-1");
	});
};

window.onload = navSlide();
