const navigationMenu = document.querySelector (".navigation");
const navigationButton = document.querySelector (".navigation__toggle");
const navigationList = document.querySelector (".navigation__list");

navigationButton.addEventListener("click", function(evt){
  evt.preventDefault();
  if (navigationButton.classList.contains()){
    navigationButton.classList.add();
    navigationButton.classList.remove();
    navigationMenu.classList.add();
  } else {
    navigationMenu.classList.remove()
    navigationButton.classList.add();
  }
})
