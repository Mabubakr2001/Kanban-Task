import "../sass/style.scss";
import Board from "./board";
const boardCreationSpot = document.querySelector(".board-creation");
const hideSidebarBtn = document.querySelector(".hide-sidebar-btn");
const toggleModeSpot = document.querySelector(".toggle-mode");
const boardCreationBtn = document.querySelector(".board-creation-btn");

const eventsPerformedOnInputs = ["input", "blur", "click"];
const allBoards = [];
let counter = 0;

function createElement(elementType, parentElementToInsert) {
  let element;
  switch (elementType) {
    case "sidebar-btn":
      element = `
        <button class="show-sidebar-btn" title="Show Sidebar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-eye"
          viewBox="0 0 16 16"
        >
        <path
        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
          />
          <path
            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
          />
        </svg>
       </button>
    `;
      break;
    case "overlay":
      element = `<div class="overlay"></div>`;
      break;
    case "board-creation-window":
      element = `
      <div class="window get-info-window">
      <h3>Add New Board</h3>
      <div class="normal-input">
        <h4>Board Name</h4>
        <input type="text" data-state="normal" class="actual-normal-input" value=""/>
      </div>
      <div class="editable-input">
        <h4>Board Columns</h4>
        <div class="editable-input-content" id="${counter}">
          <input type="text" data-state="normal" class="actual-editable-input" value=""/>
          <img src="./assets/images/x-lg.svg" alt="" class="delete-btn"/>
        </div>
      </div>
      <button class="add-new-editable-input-content-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="#fff"
          class="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
          />
        </svg>
        Add New Column
      </button>
      <button class="create-new-board-btn">Create New Board</button>
     </div>
      `;
      break;
    case "new-editable-input-content":
      element = `
       <div class="editable-input-content" id="${counter}">
        <input type="text" data-state="normal" class="actual-editable-input" value=""/>
        <img src="./assets/images/x-lg.svg" alt="" class="delete-btn"/>
       </div>
       `;
    default:
      break;
  }
  parentElementToInsert.insertAdjacentHTML("beforeend", element);
}

function createErrorMessage(textToPut) {
  const errorElement = document.createElement("p");
  errorElement.classList.add("input-error");
  errorElement.textContent = textToPut;
  document.querySelector(".normal-input").appendChild(errorElement);
}

hideSidebarBtn.addEventListener("click", () => {
  boardCreationSpot.dataset.state = "hidden";
  createElement("sidebar-btn", document.body);
});

toggleModeSpot.addEventListener("click", ({ target }) => {
  let theCurrentMode = document.body.dataset.mode;
  if (theCurrentMode === "light") {
    document.body.dataset.mode = "dark";
    target.dataset.currentMode = "dark";
  }
  if (theCurrentMode === "dark") {
    document.body.dataset.mode = "light";
    target.dataset.currentMode = "light";
  }
});

boardCreationBtn.addEventListener("click", () => {
  counter++;
  createElement("board-creation-window", document.body);
  createElement("overlay", document.body);
});

function observeMutation() {
  const observerOnBody = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((addedNode) => {
        if (addedNode.classList?.contains("show-sidebar-btn")) {
          const showSidebarBtn = addedNode;
          showSidebarBtn.addEventListener("click", ({ target }) => {
            boardCreationSpot.dataset.state = "visible";
            target.remove();
          });
        }
        if (addedNode.classList?.contains("get-info-window")) {
          const boardCreationWindow = addedNode;
          const boardNameInput = boardCreationWindow.querySelector(
            ".actual-normal-input"
          );
          const addNewEditableInputContentBtn =
            boardCreationWindow.querySelector(
              ".add-new-editable-input-content-btn"
            );
          const createNewBoardBtn = boardCreationWindow.querySelector(
            ".create-new-board-btn"
          );
          eventsPerformedOnInputs.forEach((event) =>
            boardNameInput.addEventListener(event, ({ target }) => {
              switch (event) {
                case "click":
                  if (target.dataset.state !== "empty")
                    target.dataset.state = "allowed";
                  break;
                case "blur":
                  target.parentElement.querySelector(".input-error")?.remove();
                  if (target.value === "") {
                    createErrorMessage("Can't be empty");
                    target.dataset.state = "empty";
                  }
                  if (target.value.length < 10 && target.value !== "") {
                    createErrorMessage("Minimum 10 characters");
                    target.dataset.state = "empty";
                  }
                  break;
                case "input":
                  if (target.value.length === 10) {
                    target.parentElement
                      .querySelector(".input-error")
                      ?.remove();
                    target.dataset.state = "allowed";
                  }
                  break;
                default:
                  break;
              }
            })
          );

          const allOldEditableContentSpots = Array.from(
            boardCreationWindow.querySelectorAll(".editable-input-content")
          );

          addNewEditableInputContentBtn.addEventListener("click", () => {
            counter++;
            createElement(
              "new-editable-input-content",
              boardCreationWindow.querySelector(".editable-input")
            );
            const allNewEditableContentSpots =
              boardCreationWindow.querySelectorAll(".editable-input-content");
            allOldEditableContentSpots.push(
              allNewEditableContentSpots[allNewEditableContentSpots.length - 1]
            );
            handleDeleteColumns();
          });

          function handleDeleteColumns() {
            allOldEditableContentSpots.forEach((column) => {
              column.addEventListener("click", ({ target }) => {
                if (!target.classList?.contains("delete-btn")) return;
                target.parentElement.remove();
                const choosen = allOldEditableContentSpots.findIndex(
                  (content) => content.id === target.parentElement.id
                );
                if (choosen === -1) return;
                allOldEditableContentSpots.splice(choosen, 1);
              });
            });
          }

          handleDeleteColumns();

          createNewBoardBtn.addEventListener("click", () => {
            const requiredInput = boardCreationWindow.querySelector(
              ".actual-normal-input"
            );
            if (
              requiredInput.value === "" ||
              requiredInput.value.length < 10 ||
              allOldEditableContentSpots.some(
                (column) =>
                  column.querySelector(".actual-editable-input").value === ""
              )
            )
              return;
            allBoards.push({
              name: requiredInput.value,
              columns: allOldEditableContentSpots.map((editableSpot) => {
                return {
                  colName: editableSpot.querySelector(".actual-editable-input")
                    .value,
                  tasks: [],
                };
              }),
            });
            console.log(allBoards);
          });
        }
      });
    });
  });
  observerOnBody.observe(document.body, {
    childList: true,
  });
}
observeMutation();

// document
// .querySelector(".overlay")
// ?.addEventListener("click", ({ target }) => {
//   document.querySelector(".window")?.remove();
//   target.remove();
// });
