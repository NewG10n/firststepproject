"use strict";

function setupMenu(menuElement) {
  for (let element of menuElement.children) {
    // Adding the 'setActive' handler for each 'menu' element on click
    element.addEventListener("click", function setActive() {
      // Removing the 'active' class for each 'menu' element
      for (let element of this.parentElement.children) {
        element.classList.remove("active");
      }
      // Setting the 'active' class for current (clicked) element
      this.classList.add("active");

      for (let element of menuElement.parentElement.querySelector(
        ".menu-content"
      ).children) {
        if (this.dataset.itemName.includes(element.dataset.itemContent)) {
          // Setting element to visible
          element.classList.remove("hidden");
          element.classList.add("visible");
        } else {
          // Setting element to hidden
          element.classList.remove("visible");
          element.classList.add("hidden");
        }
      }
    });
  }
}

document.querySelectorAll(".menu").forEach((element) => setupMenu(element));
