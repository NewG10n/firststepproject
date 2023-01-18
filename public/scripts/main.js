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

    const menuItems = this.querySelectorAll(".menu-item");
    const menuContent = this.parentElement.querySelector(".menu-content");
    const slideWidth = menuContent.querySelector(".people-desc").clientWidth;

    let activeMenuItem = this.querySelector(".menu-item.active");

    if (target.classList.contains("menu-btn")) {
      if (
        target.classList.contains("btn-prev") &&
        activeMenuItem.previousElementSibling.classList.contains("menu-item")
      ) {
        activeMenuItem.classList.remove("active");
        activeMenuItem.previousElementSibling.classList.add("active");
        activeMenuItem = this.querySelector(".menu-item.active");
      } else if (
        target.classList.contains("btn-next") &&
        activeMenuItem.nextElementSibling.classList.contains("menu-item")
      ) {
        activeMenuItem.classList.remove("active");
        activeMenuItem.nextElementSibling.classList.add("active");
        activeMenuItem = this.querySelector(".menu-item.active");
      }
    } else if (activeMenuItem !== target) {
      activeMenuItem.classList.remove("active");
      target.classList.add("active");

      activeMenuItem = target;
    }

    const activeMenuItemIndex = Array.from(menuItems).indexOf(activeMenuItem);
    menuContent.scrollLeft = slideWidth * activeMenuItemIndex;
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

function setupMasonryLoading(loadElement, loadStep, loadMax) {
  loadElement.addEventListener("click", function loadElements(event) {
    toggleAnimation(this);

    setTimeout(() => {
      const masonryContent = this.parentElement.querySelector(".grid");
      console.log(loadMax);
      for (let i = 0; i < loadStep; i++) {
        let newElement = masonryContent
          .querySelectorAll(".grid-item")
          [Math.floor(Math.random() * (loadStep - 1))].cloneNode(true);
        newElement.style = "";
        masonryContent.lastElementChild.after(newElement);
      }

      toggleAnimation(this);

      setTimeout(() => {
        new Masonry(".grid", {
          itemSelector: ".grid-item",
          columnWidth: ".grid-sizer",
          gutter: ".gutter-sizer",
          percentPosition: true,
          horizontalOrder: true,
          transitionDuration: "0.2s",
          initLayout: true,
        });
      }, 1);

      if (masonryContent.querySelectorAll(".grid-item").length >= loadMax) {
        this.remove();
      }
    }, 1000);

    event.preventDefault();
  });
}

document.querySelectorAll(".menu").forEach((element) => setupMenu(element));
document
  .querySelectorAll(".slide-menu")
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

document
  .querySelectorAll(".btn-masonry-load")
  .forEach((element) =>
    setupMasonryLoading(
      element,
      element.parentElement.querySelectorAll(".grid-item").length,
      element.parentElement.querySelectorAll(".grid-item").length * 2
    )
  );

let msnry = new Masonry(".grid", {
  itemSelector: ".grid-item",
  columnWidth: ".grid-sizer",
  gutter: ".gutter-sizer",
  percentPosition: true,
  horizontalOrder: true,
  transitionDuration: "0.2s",
  initLayout: true,
});
