import "../sass/style.scss";
const boardCreationSpot = document.querySelector(".board-creation");
const boardContentSpot = document.querySelector(".board-content");
const hideSidebarBtn = document.querySelector(".hide-sidebar-btn");
const toggleModeSpot = document.querySelector(".toggle-mode");
const boardCreationBtn = document.querySelector(".board-creation-btn");
const allBoardsSpot = document.querySelector(".all-boards");
const hint = document.querySelector(".hint");

const eventsPerformedOnInputs = ["input", "blur", "click"];
let boardsNum = 0;
let ID = 1;
let app = {
  allBoards: [],
  mode: "light",
};

function createMarkup({
  elementType,
  placeToInsert,
  elementToInsertInto,
  boardName = undefined,
  boardID = undefined,
  boardState = undefined,
  colName = undefined,
  allTasksNum = undefined,
  taskName = undefined,
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
      <div class="window new-board-window">
      <h3>Add New Board</h3>
      <div class="normal-input">
        <h4>Board Name</h4>
        <input type="text" data-state="normal" class="actual-normal-input" value=""/>
      </div>
      <div class="editable-input">
        <h4>Board Columns</h4>
        <div class="editable-input-content">
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
      <button class="create-element-btn">Create New Board</button>
     </div>
      `;
      break;
    case "new-editable-input-content":
      element = `
       <div class="editable-input-content">
        <input type="text" data-state="normal" class="actual-editable-input" value=""/>
        <img src="./assets/images/x-lg.svg" alt="" class="delete-btn"/>
       </div>
       `;
      break;
    case "new-board":
      element = `
       <div class="created-board-name" id="${boardID}" data-state="${boardState}">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-kanban-fill" viewBox="0 0 16 16">
           <path d="M2.5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11zm5 2h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm-5 1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm9-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
         </svg>
         <h3>${boardName}</h3>
       </div>
       `;
      break;
    case "board-title":
      element = `
       <h2 class="board-title">${boardName}</h2>
       `;
      break;
    case "board-column":
      element = `
      <div class="board-column" data-name="${colName}">
        <div class="board-column-info">
          <div class="column-logo"></div>
          <span class="column-name"
            >${colName} <span class="tasks-num">(${allTasksNum})</span></span
          >
        </div>
      </div>
      `;
      break;
    case "add-column-spot":
      element = `
       <div class="add-column-spot">
         <span>
           <svg
             xmlns="http://www.w3.org/2000/svg"
             width="23"
             height="23"
             fill="#828d9c"
             class="bi bi-plus"
             viewBox="0 0 16 16"
           >
             <path
               d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
             />
           </svg>
           New Column
         </span>
       </div>
       `;
      break;
    case "new-column-creation-window":
      element = `
      <div class="window new-column-window">
      <h3>Add New Column</h3>
      <div class="normal-input">
        <h4>Column Name</h4>
        <input type="text" data-state="normal" class="actual-normal-input" value=""/>
      </div>
      <div class="editable-input">
        <h4>All Tasks</h4>
        <div class="editable-input-content">
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
        Add New Task
      </button>
      <button class="create-element-btn">Create New Column</button>
     </div>
       `;
      break;
    case "new-task":
      element = `
       <div class="board-column-task" draggable="true" data-draggable="false">
         <h4 class="task-title">${taskName}</h4>
         <span class="subtasks-info"
           ><span class="done-subtasks">0 </span>of
           <span class="all-subtasks">0 </span>subtasks</span
         >
       </div>
       `;
      break;
    default:
      break;
  }
  elementToInsertInto.insertAdjacentHTML(placeToInsert, element);
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

function showBoardContent(choosenBoard) {
  boardContentSpot.innerHTML = "";

  if (choosenBoard.columns.length > 0) {
    choosenBoard.columns.forEach((column) => {
      createMarkup({
        elementType: "board-column",
        placeToInsert: "beforeend",
        elementToInsertInto: boardContentSpot,
        colName: column.colName,
        allTasksNum: column.tasks.length,
      });
    });
  }

  createMarkup({
    elementType: "add-column-spot",
    placeToInsert: "beforeend",
    elementToInsertInto: boardContentSpot,
  });
}

function handleBoardContent() {
  const addColumnSpot = document.querySelector(".add-column-spot");
  addColumnSpot?.addEventListener("click", ({ target }) => {
    createMarkup({
      elementType: "new-column-creation-window",
      elementToInsertInto: document.body,
      placeToInsert: "beforeend",
    });
    createMarkup({
      elementType: "overlay",
      elementToInsertInto: document.body,
      placeToInsert: "beforeend",
    });
    target.blur();
  });
}

function startDragging() {
  const allDraggables = document.querySelectorAll(".board-column-task");
  const allColumns = document.querySelectorAll(".board-column");

  allDraggables.forEach((element) => {
    let oldColumnElement;
    let oldColumnObject;
    let oldIndex;

    element.addEventListener("dragstart", ({ target }) => {
      element.dataset.draggable = "true";
      oldColumnElement = target.parentElement;
      oldColumnObject = app.allBoards
        .find((board) => board.state === "active")
        .columns.find(
          (column) => column.colName === oldColumnElement.dataset.name
        );
      oldIndex = [...oldColumnElement.children].indexOf(target) - 1;
    });

    element.addEventListener("dragend", ({ target }) => {
      target.dataset.draggable = "false";

      const newColumnElement = target.parentElement;
      const newColumnObject = app.allBoards
        .find((board) => board.state === "active")
        .columns.find(
          (column) => column.colName === newColumnElement.dataset.name
        );
      const newIndex = [...newColumnElement.children].indexOf(target) - 1;

      const taskAlreadyExist = newColumnObject.tasks.some(
        (task) => task.taskName === target.children[0].textContent
      );

      if (taskAlreadyExist) return;

      oldColumnObject.tasks.splice(oldIndex, 1);

      newColumnObject.tasks.splice(newIndex, 0, {
        taskName: target.children[0].textContent,
        subtasks: [],
      });

      newColumnElement.querySelector(
        ".tasks-num"
      ).textContent = `(${newColumnObject.tasks.length})`;

      oldColumnElement.querySelector(
        ".tasks-num"
      ).textContent = `(${oldColumnObject.tasks.length})`;

      interactWithLocalStorage("set");
    });
  });

  allColumns.forEach((column) => {
    column.addEventListener("dragover", (event) => {
      event.preventDefault();
      const draggable = document.querySelector(`[data-draggable="true"]`);
      const afterElement = getAfterElement(column, event.clientY);
      const taskElementAlreadyExist = [
        ...column.querySelectorAll(`[data-draggable="false"]`),
      ].some(
        (taskElement) =>
          taskElement.children[0].textContent ===
          draggable.children[0].textContent
      );

      if (taskElementAlreadyExist) return;

      afterElement == null
        ? column.appendChild(draggable)
        : column.insertBefore(draggable, afterElement);
    });
  });
}

function getAfterElement(column, yAxis) {
  const allUndraggable = [
    ...column.querySelectorAll(`[data-draggable="false"]`),
  ];
  return allUndraggable.reduce(
    (closest, child) => {
      const boundingBox = child.getBoundingClientRect();
      const offset = yAxis - boundingBox.top - boundingBox.height / 2;
      return offset < 0 && offset > closest.offset
        ? { offset: offset, element: child }
        : closest;
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
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
        if (addedNode.classList?.contains("window")) {
          const overlay = document.querySelector(".overlay");
          const openedWindow = addedNode;
          const actualNormalInput = openedWindow.querySelector(
            ".actual-normal-input"
          );
          const createElementBtn = openedWindow.querySelector(
            ".create-element-btn"
          );

          eventsPerformedOnInputs.forEach((event) => {
            actualNormalInput.addEventListener(event, ({ target }) => {
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
                  break;
                case "input":
                  target.parentElement.querySelector(".input-error")?.remove();
                  target.dataset.state = "active";
                  break;
                default:
                  break;
              }
            });
          });

          const addNewEditableInputContentBtn = openedWindow.querySelector(
            ".add-new-editable-input-content-btn"
          );

          const allOldEditableContentSpots = Array.from(
            openedWindow.querySelectorAll(".editable-input-content")
          );

          function handleDeleteEditableContentInput() {
            allOldEditableContentSpots.forEach((column) => {
              column.addEventListener("click", ({ target }) => {
                if (!target.classList?.contains("delete-btn")) return;
                target.parentElement.remove();
                if (
                  allOldEditableContentSpots.indexOf(target.parentElement) ===
                  -1
                )
                  return;
                allOldEditableContentSpots.splice(
                  allOldEditableContentSpots.indexOf(target.parentElement),
                  1
                );
              });
            });
          }

          handleDeleteEditableContentInput();

          addNewEditableInputContentBtn.addEventListener("click", () => {
            createMarkup({
              elementType: "new-editable-input-content",
              elementToInsertInto:
                openedWindow.querySelector(".editable-input"),
              placeToInsert: "beforeend",
            });

            const allNewEditableContentSpots = openedWindow.querySelectorAll(
              ".editable-input-content"
            );
            allOldEditableContentSpots.push(
              allNewEditableContentSpots[allNewEditableContentSpots.length - 1]
            );

            handleDeleteEditableContentInput();
          });

          createElementBtn.addEventListener("click", () => {
            const requiredInput = openedWindow.querySelector(
              ".actual-normal-input"
            );

            if (
              requiredInput.value === "" ||
              allOldEditableContentSpots.some(
                (column) =>
                  column.querySelector(".actual-editable-input").value === ""
              )
            )
              return;

            if (openedWindow.classList?.contains("new-board-window")) {
              const newBoard = {
                boardName: requiredInput.value,
                columns: allOldEditableContentSpots.map((editableSpot) => {
                  return {
                    colName: editableSpot.querySelector(
                      ".actual-editable-input"
                    ).value,
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
                elementToInsertInto: allBoardsSpot,
                placeToInsert: "beforeend",
                boardName: requiredInput.value,
                boardID: ID,
                boardState: "active",
              });

              document.querySelector(".board-title")?.remove();

              createMarkup({
                elementType: "board-title",
                placeToInsert: "afterbegin",
                elementToInsertInto: document.querySelector(".board-info"),
                boardName: requiredInput.value,
              });

              showBoardContent(newBoard);
              handleBoardContent();

              boardsNum++;
              ID++;

              document.querySelector(
                ".boards-num"
              ).textContent = `(${boardsNum})`;

              hint?.remove();
            }

            if (openedWindow.classList?.contains("new-column-window")) {
              const activeBoard = app.allBoards.find(
                (board) => board.state === "active"
              );

              if (actualNormalInput.value === "") return;

              activeBoard.columns.push({
                colName: actualNormalInput.value,
                tasks: allOldEditableContentSpots.map((editableSpot) => {
                  return {
                    taskName: editableSpot.querySelector(
                      ".actual-editable-input"
                    ).value,
                    subtasks: [],
                  };
                }),
              });

              interactWithLocalStorage("set");

              createMarkup({
                elementType: "board-column",
                placeToInsert: "beforebegin",
                elementToInsertInto: document.querySelector(".add-column-spot"),
                colName: actualNormalInput.value,
                allTasksNum: activeBoard.columns.find(
                  (column) => column.colName === actualNormalInput.value
                ).tasks.length,
              });

              allOldEditableContentSpots.forEach((editableSpot) => {
                createMarkup({
                  elementType: "new-task",
                  placeToInsert: "beforeend",
                  elementToInsertInto: document.querySelector(
                    `[data-name="${actualNormalInput.value}"]`
                  ),
                  taskName: editableSpot.children[0].value,
                });
              });
            }
            overlay.remove();
            openedWindow.remove();
            startDragging();
          });

          overlay.addEventListener("click", ({ target }) => {
            openedWindow.remove();
            target.remove();
          });

          window.addEventListener("keydown", ({ key }) => {
            if (key !== "Escape") return;
            openedWindow.remove();
            overlay.remove();
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

allBoardsSpot.addEventListener("click", ({ target }) => {
  const clickedBoard = target.closest(".created-board-name");
  if (clickedBoard == null) return;
  clickedBoard.parentElement
    .querySelectorAll(".created-board-name")
    .forEach((boardNameSpot) => (boardNameSpot.dataset.state = "disabled"));
  clickedBoard.dataset.state = "active";
  const choosenBoard = app.allBoards.find(
    (board) => board.ID == clickedBoard.id
  );
  if (choosenBoard == null) return;
  showBoardContent(choosenBoard);
  handleBoardContent();
  app.allBoards.forEach((board) => (board.state = "disabled"));
  choosenBoard.state = "active";
  document.querySelector(".board-title").textContent = choosenBoard.boardName;
  choosenBoard.columns.forEach((column) => {
    column.tasks.forEach(({ taskName }) => {
      createMarkup({
        elementType: "new-task",
        placeToInsert: "beforeend",
        elementToInsertInto: document.querySelector(
          `[data-name="${column.colName}"]`
        ),
        taskName,
      });
    });
  });
  interactWithLocalStorage("set");
  startDragging();
});

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
  boardsNum = app.allBoards.length;

  document.querySelector(".boards-num").textContent = `(${boardsNum})`;
  hint?.remove();

  app.allBoards.forEach((board) => {
    createMarkup({
      elementType: "new-board",
      placeToInsert: "beforeend",
      elementToInsertInto: allBoardsSpot,
      boardName: board.boardName,
      boardID: board.ID,
      boardState: board.state,
    });
    if (board.state === "active") {
      createMarkup({
        elementType: "board-title",
        placeToInsert: "afterbegin",
        elementToInsertInto: document.querySelector(".board-info"),
        boardName: board.boardName,
      });

      showBoardContent(board);

      // The problem is here
      board.columns.forEach((column) => {
        column.tasks.forEach(({ taskName }) => {
          createMarkup({
            elementType: "new-task",
            placeToInsert: "beforeend",
            elementToInsertInto: document.querySelector(
              `[data-name="${column.colName}"]`
            ),
            taskName,
          });
        });
      });
      startDragging();
    }
  });
  handleBoardContent();
});

hideSidebarBtn.addEventListener("click", () => {
  boardCreationSpot.dataset.state = "hidden";
  createMarkup({
    elementType: "sidebar-btn",
    elementToInsertInto: document.body,
    placeToInsert: "beforeend",
  });
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
  createMarkup({
    elementType: "board-creation-window",
    elementToInsertInto: document.body,
    placeToInsert: "beforeend",
  });
  createMarkup({
    elementType: "overlay",
    elementToInsertInto: document.body,
    placeToInsert: "beforeend",
  });
  target.blur();
});
