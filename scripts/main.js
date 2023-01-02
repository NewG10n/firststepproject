"use strict";

function setupMenu(menuElement) {
  for (let element of menuElement.children) {
    element.addEventListener("click", function setActive() {
      for (let element of this.parentElement.children) {
        element.classList.remove("active");
      }

      this.classList.add("active");

      for (let element of menuElement.parentElement.querySelector(
        ".menu-content"
      ).children) {
        if (this.dataset.itemName.includes(element.dataset.itemContent)) {
          element.classList.remove("hidden");
          element.classList.add("visible");
        } else {
          element.classList.remove("visible");
          element.classList.add("hidden");
        }
      }
    });
  }
}

function setupLoading(loadElement, loadStep, loadMax) {
  loadElement.addEventListener("click", function loadElements(event) {
    function showLoader() {
      this.innerHTML =
        '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
    }

    setTimeout(() => {
      const menuContent = this.parentElement.querySelector(".menu-content");

      for (let i = 0; i < loadStep; i++) {
        let newElement =
          menuContent.children[
            Math.floor(Math.random() * (loadStep - 1))
          ].cloneNode(true);

        menuContent.lastElementChild.after(newElement);
      }

      if (menuContent.childElementCount >= loadMax) {
        this.remove();
      }
    }, 1000);

    event.preventDefault();
  });
}

document.querySelectorAll(".menu").forEach((element) => setupMenu(element));

document
  .querySelectorAll(".btn-load")
  .forEach((element) =>
    setupLoading(
      element,
      element.parentElement.querySelector(".menu-content").childElementCount,
      element.parentElement.querySelector(".menu-content").childElementCount * 3
    )
  );
