const navigationButton = document.querySelector(".navigation__toggle");
const navigationList = document.querySelector(".navigation__list");
const navigationMenu = document.querySelector(".navigation");
const navigationItem = document.querySelector(".navigation__link");
const bookingSearchButton = document.querySelector(".booking-search__button");

navigationButton.onclick = function() {
  navigationMenu.classList.toggle("navigation--opened");
  navigationList.classList.toggle("navigation__list--visible");
  if (navigationList.classList.contains("navigation__list--visible")) {
    navigationItem.focus();
  }
};

if(bookingSearchButton) {
  bookingSearchButton.onclick = function() {
    window.open("https://google.com");
  }
}

window.onload = function() {
  navigationMenu.classList.remove("navigation--nojs");
}
