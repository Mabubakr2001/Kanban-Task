import "../sass/style.scss";
import Board from "./board";
const boardCreationSpot = document.querySelector(".board-creation");
const hideSidebarBtn = document.querySelector(".hide-sidebar-btn");
const toggleModeSpot = document.querySelector(".toggle-mode");
const boardCreationBtn = document.querySelector(".board-creation-btn");
const allBoardsSpot = document.querySelector(".all-boards");
const hint = document.querySelector(".hint");

const eventsPerformedOnInputs = ["input", "blur", "click"];
let counter = 0;
let ID = 1;
let app = {
  allBoards: [],
  mode: "light",
};

function createMarkup({
  elementType,
  parentElement,
  name = undefined,
  boardID = undefined,
  boardState = undefined,
}) {
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
      break;
    case "new-board":
      element = `
       <div class="created-board-name" id="${boardID}" data-state="${boardState}">
         <svg
           xmlns="http://www.w3.org/2000/svg"
           width="20"
           height="20"
           fill="currentColor"
           class="bi bi-kanban-fill"
           viewBox="0 0 16 16"
         >
           <path
             d="M2.5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11zm5 2h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm-5 1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm9-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
           />
         </svg>
         <h3>${name}</h3>
       </div>
       `;
      break;
    case "board-title":
      element = `
       <h2 class="board-title">${name}</h2>
       `;
      parentElement.insertAdjacentHTML("afterbegin", element);
      return;
    default:
      break;
  }
  parentElement.insertAdjacentHTML("beforeend", element);
}

function createErrorMessage(textToPut, parentElement) {
  const errorElement = document.createElement("p");
  errorElement.classList.add("input-error");
  errorElement.textContent = textToPut;
  parentElement.appendChild(errorElement);
}

function interactWithLocalStorage(interactingMethod) {
  switch (interactingMethod) {
    case "set":
      localStorage.setItem("app", JSON.stringify(app));
      break;
    case "get":
      return JSON.parse(localStorage.getItem("app"));
    case "clear":
      localStorage.removeItem("app");
      break;
    default:
      break;
  }
}

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
          const overlay = document.querySelector(".overlay");
          overlay.addEventListener("click", ({ target }) => {
            boardCreationWindow.remove();
            target.remove();
          });
          window.addEventListener("keydown", ({ key }) => {
            if (key !== "Escape") return;
            boardCreationWindow.remove();
            overlay.remove();
          });
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

          eventsPerformedOnInputs.forEach((event) => {
            boardNameInput.addEventListener(event, ({ target }) => {
              switch (event) {
                case "click":
                  if (target.dataset.state !== "empty")
                    target.dataset.state = "active";
                  break;
                case "blur":
                  target.parentElement.querySelector(".input-error")?.remove();
                  if (target.value === "") {
                    createErrorMessage("Can't be empty", target.parentElement);
                    target.dataset.state = "empty";
                  }
                  if (target.value.length < 5 && target.value !== "") {
                    createErrorMessage(
                      "Minimum 5 characters",
                      target.parentElement
                    );
                    target.dataset.state = "empty";
                  }
                  break;
                case "input":
                  if (target.value.length === 5) {
                    target.parentElement
                      .querySelector(".input-error")
                      ?.remove();
                    target.dataset.state = "active";
                  }
                  break;
                default:
                  break;
              }
            });
          });

          const allOldEditableContentSpots = Array.from(
            boardCreationWindow.querySelectorAll(".editable-input-content")
          );

          addNewEditableInputContentBtn.addEventListener("click", () => {
            counter++;
            createMarkup({
              elementType: "new-editable-input-content",
              parentElement:
                boardCreationWindow.querySelector(".editable-input"),
            });
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

          createNewBoardBtn.addEventListener("click", async () => {
            const requiredInput = boardCreationWindow.querySelector(
              ".actual-normal-input"
            );
            if (
              requiredInput.value === "" ||
              requiredInput.value.length < 5 ||
              allOldEditableContentSpots.some(
                (column) =>
                  column.querySelector(".actual-editable-input").value === ""
              )
            )
              return;

            const newBoard = {
              name: requiredInput.value,
              columns: allOldEditableContentSpots.map((editableSpot) => {
                return {
                  colName: editableSpot.querySelector(".actual-editable-input")
                    .value,
                  tasks: [],
                };
              }),
              state: "active",
              ID,
            };
            const allCreatedBoardElements = allBoardsSpot.querySelectorAll(
              ".created-board-name"
            );
            for (let i = 0; i < allCreatedBoardElements.length; i++) {
              if (allCreatedBoardElements[i].id == newBoard.ID) continue;
              allCreatedBoardElements[i].dataset.state = "disabled";
            }
            app.allBoards.forEach((board) => (board.state = "disabled"));
            app.allBoards.push(newBoard);
            interactWithLocalStorage("set");
            createMarkup({
              elementType: "new-board",
              parentElement: allBoardsSpot,
              name: requiredInput.value,
              boardID: ID,
              boardState: "active",
            });
            document.querySelector(".board-title")?.remove();
            createMarkup({
              elementType: "board-title",
              parentElement: document.querySelector(".board-info"),
              name: requiredInput.value,
            });
            ID++;
            overlay.remove();
            boardCreationWindow.remove();
            hint?.remove();
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

window.addEventListener("load", () => {
  const theAppObjectFromLocalStorage = interactWithLocalStorage("get");

  if (theAppObjectFromLocalStorage == null)
    return interactWithLocalStorage("set");

  document.body.dataset.mode = theAppObjectFromLocalStorage.mode || "light";
  document.querySelector(".toggle-mode").dataset.currentMode =
    theAppObjectFromLocalStorage.mode || "light";

  app = theAppObjectFromLocalStorage;

  if (theAppObjectFromLocalStorage.allBoards.length === 0) return;

  ID = app.allBoards[app.allBoards.length - 1].ID + 1;
  hint?.remove();

  app.allBoards.forEach((board) => {
    createMarkup({
      elementType: "new-board",
      parentElement: allBoardsSpot,
      name: board.name,
      boardID: board.ID,
      boardState: board.state,
    });
    if (board.state === "active") {
      createMarkup({
        elementType: "board-title",
        parentElement: document.querySelector(".board-info"),
        name: board.name,
      });
    }
  });
});

hideSidebarBtn.addEventListener("click", () => {
  boardCreationSpot.dataset.state = "hidden";
  createMarkup({ elementType: "sidebar-btn", parentElement: document.body });
});

toggleModeSpot.addEventListener("click", ({ target }) => {
  let theCurrentMode = document.body.dataset.mode;
  if (theCurrentMode === "light") {
    document.body.dataset.mode = "dark";
    target.dataset.currentMode = "dark";
    app.mode = "dark";
  }
  if (theCurrentMode === "dark") {
    document.body.dataset.mode = "light";
    target.dataset.currentMode = "light";
    app.mode = "light";
  }
  interactWithLocalStorage("set");
});

boardCreationBtn.addEventListener("click", ({ target }) => {
  counter++;
  createMarkup({
    elementType: "board-creation-window",
    parentElement: document.body,
  });
  createMarkup({ elementType: "overlay", parentElement: document.body });
  target.blur();
});

// document
// .querySelector(".overlay")
// ?.addEventListener("click", ({ target }) => {
//   document.querySelector(".window")?.remove();
//   target.remove();
// });
