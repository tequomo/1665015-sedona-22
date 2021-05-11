// Variables
const navigationButton = document.querySelector(".navigation__toggle");
const navigationList = document.querySelector(".navigation__list");
const navigationMenu = document.querySelector(".navigation");
const navigationItem = document.querySelector(".navigation__link");
const bookingSearchButton = document.querySelector(".booking-search__button");
const wholeForm = document.querySelector(".feedback-form__block");
const requiredFields = document.querySelectorAll(".feedback-form__block input:required");
const formButton = document.querySelector(".feedback-form__button");
const modalFailure = document.querySelector(".modal-failure");
const failureButton = document.querySelector(".modal-failure__button");
const modalSuccess = document.querySelector(".modal-success");
const successButton = document.querySelector(".modal-success__button");
const contactsLine = document.querySelector(".fieldset-contacts__line");

// Mobile menu actions
navigationButton.onclick = () => {
  navigationMenu.classList.toggle("navigation--opened");
  navigationList.classList.toggle("navigation__list--visible");
  if (navigationList.classList.contains("navigation__list--visible")) {
    navigationItem.focus();
  }
};

// Search button action (on main page)
if (bookingSearchButton) {
  bookingSearchButton.onclick = () => {
    window.open("https://www.booking.com/apartments/city/us/sedona.ru.html");
  }
}

// Form validation

// Functions
// const ESCHandler = (evt) => closeEsc(evt, modalFailure, removeColors, fieldFocus);
// const ESCHandler2 = (evt) => closeEsc(evt, modalSuccess);

const ESCHandler = (evt, err) => {
  evt.stopPropagation();
  const keyCode = evt.keyCode || evt.which;
  if (keyCode === 27) {
    if (err) {
      modalFailure.classList.remove(modalFailure.classList[1]);
      removeColors();
      fieldFocus();
      // document.removeEventListener("keydown", ESCHandler(evt, err));
    }
    else {
      modalSuccess.classList.remove(modalSuccess.classList[1]);
      // document.removeEventListener("keydown", ESCHandler(evt, err));
    }
  }
}

const setFocus = (elem) => {
  elem.setAttribute("tabindex", "0");
  elem.focus();
}

function closeEsc(event, obj, func, fn) {
  console.log(event);
  const keyCode = event.keyCode || event.which;
  if (keyCode === 27) {
    obj.classList.remove(obj.classList[1]);
    event.preventDefault();
    if (func) {
      func();
    }
    if (fn) {
      fn();
    }
  }
  document.removeEventListener("keydown", ESCHandler);
}

function closeOnClick(elem) {
  function outsideClickListener(event) {
    // check click is outside of element and element is visible
    if (!elem.contains(event.target) && isVisible(elem)) {
      elem.classList.remove(elem.classList[1]);
      removeColors();
      fieldFocus();
      document.removeEventListener("click", outsideClickListener, false);
      document.removeEventListener("keydown", evt => ESCHandler(evt, err), false);
    }
  }
  document.addEventListener("click", outsideClickListener, false);
  event.stopPropagation();
}

// check modal window is open
function isVisible(elem) {
  return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}

function removeColors() {
  for (let i = 0; i < requiredFields.length; i++) {
    if (requiredFields[i].classList[1]) {
      requiredFields[i].classList.remove(requiredFields[i].classList[1]);
      if (requiredFields[i].parentNode.classList[2]) {
        requiredFields[i].parentNode.classList.remove(requiredFields[i].parentNode.classList[2]);
      }
    }
  }
}

function fieldFocus() {
  for (let i = 0; i < requiredFields.length; i++) {
    if (!requiredFields[i].value) {
      requiredFields[i].focus();
      break;
    }
  }
}

// Form button actions
if (formButton) {
  formButton.onclick = () => {
    let error;
    // check for empty fields
    for (let i = 0; i < requiredFields.length; i++) {
      if (!requiredFields[i].value) {
        error = true;
      }
    }
    // add classes with error colors to empty field(s) using BAM methodology ;)
    if (error) {
      for (let i = 0; i < requiredFields.length; i++) {
        if (!requiredFields[i].value) {
          requiredFields[i].classList.add(requiredFields[i].className + "--error");
          if (requiredFields[i].parentNode.classList[1]) {
            requiredFields[i].parentNode.classList.add(requiredFields[i].parentNode.classList[1] + "-error");
          }
        }
      }
      // show failure modal window
      modalFailure.classList.add(modalFailure.className + "--show");
      // set focus on modal window
      setFocus(modalFailure);
      // add ESC catcher
      document.addEventListener("keydown", evt => ESCHandler(evt, error), false);
      // close modal window on click outside it
      closeOnClick(modalFailure);
    }
    else {
      // show success modal window
      modalSuccess.classList.add(modalSuccess.className + "--show");
      // set focus on modal window
      setFocus(modalSuccess);
      // send form data to Academy (opens in new window)
      wholeForm.submit();
      // reset form
      wholeForm.reset();
      // add ESC catcher
      document.addEventListener("keydown", evt => ESCHandler(evt, error), false);
      // close modal window on click outside it
      closeOnClick(modalSuccess);
    }
  }

  // Modal buttons actions
  failureButton.onclick = () => {
    // hide modal window
    modalFailure.classList.remove(modalFailure.classList[1]);
    // set focus on first empty field
    fieldFocus();
    // remove fields' error color classes
    removeColors();
  }

  successButton.onclick = () => {
    // hide modal window
    modalSuccess.classList.remove(modalSuccess.classList[1]);
  }
}

// remove nojs class by javascript
window.onload = () => {
  navigationMenu.classList.remove("navigation--nojs");
}
