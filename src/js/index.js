import "../sass/style.scss";
const boardCreationSpot = document.querySelector(".board-creation");
const hideSidebarBtn = document.querySelector(".hide-sidebar-btn");
const showSidebarBtn = document.querySelector(".show-sidebar-btn");

hideSidebarBtn.addEventListener("click", () => {
  boardCreationSpot.dataset.state = "hidden";
  showSidebarBtn.dataset.state = "visible";
});

showSidebarBtn.addEventListener("click", ({ target }) => {
  boardCreationSpot.dataset.state = "visible";
  target.dataset.state = "hidden";
});
