"use strict";

function setupMenu(menuElement) {
  menuElement.addEventListener("click", function setActive(event) {
    const target = event.target.closest(".menu-item") || event.target;
    if (!target.classList.contains("menu-item")) return;

    const activeMenuItem = this.querySelector(".active");
    const activeMenuItemName = target.dataset.itemName;

    const menuContent = this.parentElement.querySelector(".menu-content");

    if (activeMenuItem !== target) {
      activeMenuItem.classList.remove("active");
      target.classList.add("active");
    }

    for (let element of menuContent.children) {
      const menuContentName = element.dataset.itemContent;

      activeMenuItemName.includes(menuContentName)
        ? element.classList.remove("hidden")
        : element.classList.add("hidden");
    }
  });
}

function setupSlideMenu(menuElement) {
  menuElement.addEventListener("click", function setSlide(event) {
    const target =
      event.target.closest(".menu-item") ||
      event.target.closest(".menu-btn") ||
      event.target;

    if (
      !(
        target.classList.contains("menu-item") ||
        target.classList.contains("menu-btn")
      )
    )
      return;

    const activeMenuItem = this.querySelector(".menu-item.active");
    const menuContent = this.parentElement.querySelector(".menu-content");

    if (target.classList.contains("menu-btn")) {
      if (
        target.classList.contains("btn-prev") &&
        activeMenuItem.previousElementSibling.classList.contains("menu-item")
      ) {
        activeMenuItem.classList.remove("active");
        activeMenuItem.previousElementSibling.classList.add("active");
        menuContent.scrollLeft -=
          menuContent.querySelector(".people-desc").clientWidth;
      } else if (
        target.classList.contains("btn-next") &&
        activeMenuItem.nextElementSibling.classList.contains("menu-item")
      ) {
        activeMenuItem.classList.remove("active");
        activeMenuItem.nextElementSibling.classList.add("active");
        menuContent.scrollLeft +=
          menuContent.querySelector(".people-desc").clientWidth;
      } else return;
      return;
    } else {
      if (activeMenuItem !== target) {
        activeMenuItem.classList.remove("active");
        target.classList.add("active");
      }
    }
  });
}

function setupLoading(loadElement, loadStep, loadMax) {
  loadElement.addEventListener("click", function loadElements(event) {
    toggleAnimation(this);

    setTimeout(() => {
      const menuContent = this.parentElement.querySelector(".menu-content");

      for (let i = 0; i < loadStep; i++) {
        let newElement =
          menuContent.children[
            Math.floor(Math.random() * (loadStep - 1))
          ].cloneNode(true);

        menuContent.lastElementChild.after(newElement);
      }

      toggleAnimation(this);

      if (menuContent.childElementCount >= loadMax) {
        this.remove();
      }
    }, 1000);

    event.preventDefault();
  });
}

function toggleAnimation(animatedElement) {
  animatedElement.querySelector(".lds-ellipsis").classList.toggle("hidden");
  animatedElement.querySelector(".btn-load-text").classList.toggle("hidden");
}

document.querySelectorAll(".menu").forEach((element) => setupMenu(element));
document
  .querySelectorAll(".menu.slide")
  .forEach((element) => setupSlideMenu(element));

document
  .querySelectorAll(".btn-load")
  .forEach((element) =>
    setupLoading(
      element,
      element.parentElement.querySelector(".menu-content").childElementCount,
      element.parentElement.querySelector(".menu-content").childElementCount * 3
    )
  );
