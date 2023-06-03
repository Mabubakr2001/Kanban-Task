import "../sass/style.scss";
import Board from "./board";
const boardCreationSpot = document.querySelector(".board-creation");
const hideSidebarBtn = document.querySelector(".hide-sidebar-btn");
const toggleModeSpot = document.querySelector(".toggle-mode");
const boardCreationBtn = document.querySelector(".board-creation-btn");
const allBoardsSpot = document.querySelector(".all-boards");

const eventsPerformedOnInputs = ["input", "blur", "click"];
const allBoards = [];
let counter = 0;
let BoardID = 1;
const API_URL = "http://localhost:5000/boards";

function createElement(elementType, parentElementToInsert, name = undefined) {
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
       <div class="created-board-name" id="${BoardID}">
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

async function AJAXCall(URL, method = undefined, dataToUpload = undefined) {
  try {
    const fetchPro = dataToUpload
      ? fetch(URL, {
          method,
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(dataToUpload),
        })
      : method && !dataToUpload
      ? fetch(URL, {
          method,
        })
      : fetch(URL);
    const response = await fetchPro;
    if (!response.ok)
      throw new Error(`Something went wrong ${response.states}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
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

boardCreationBtn.addEventListener("click", ({ target }) => {
  counter++;
  createElement("board-creation-window", document.body);
  createElement("overlay", document.body);
  target.blur();
});

window.addEventListener("load", async () => {
  const boardsFromDataBase = await AJAXCall(API_URL);
  console.log(boardsFromDataBase[boardsFromDataBase.length - 1].id);
  boardsFromDataBase.forEach((board) =>
    createElement("new-board", allBoardsSpot, board.name, board.id)
  );
  BoardID = boardsFromDataBase[boardsFromDataBase.length - 1].id;
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
            const newBoard = {
              name: requiredInput.value,
              columns: allOldEditableContentSpots.map((editableSpot) => {
                return {
                  colName: editableSpot.querySelector(".actual-editable-input")
                    .value,
                  tasks: [],
                };
              }),
            };
            AJAXCall(API_URL, "POST", newBoard);
            createElement("new-board", allBoardsSpot, requiredInput.value);
            console.log(BoardID);
            BoardID++;
            overlay.remove();
            boardCreationWindow.remove();
            document.querySelector(".hint")?.remove();
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
