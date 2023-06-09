import "../sass/style.scss";
const boardCreationSpot = document.querySelector(".board-creation");
const boardContentSpot = document.querySelector(".board-content");
const manipulationSpot = document.querySelector(".manipulating-spot");
const hideSidebarBtn = document.querySelector(".hide-sidebar-btn");
const toggleModeSpot = document.querySelector(".toggle-mode");
const boardCreationBtn = document.querySelector(".board-creation-btn");
const allBoardsSpot = document.querySelector(".all-boards");
const hint = document.querySelector(".hint");
const addTaskBtn = document.querySelector(".add-task-btn");
const openArrow = document.querySelector(".open-arrow");
const mainTitle = document.querySelector(".title");

const eventsPerformedOnInputs = ["input", "blur", "click"];
let boardsNum = 0;
let taskWasClicked = false;
let taskWasDragged = false;
let subtasksCounter = 0;
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
  columnsArr = undefined,
  allTasksNum = undefined,
  taskName = undefined,
  taskID = undefined,
  taskDescription = undefined,
  allSubtasksNum = undefined,
  allDoneSubtasksNum = undefined,
  subtasksArr = undefined,
  availableColumn = undefined,
  manipulateTaskOrBoard = undefined,
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
    case "board-edit-window":
      element = `
       <div class="window new-board-window" data-board-id="${boardID}">
         <h3>Edit The Board</h3>
         <div class="normal-input">
           <h4>Board Name</h4>
           <input type="text" data-state="normal" class="actual-normal-input" value="${boardName}"/>
         </div>
         <div class="editable-input">
           <h4>Board Columns</h4>
           ${
             columnsArr.length > 0
               ? columnsArr
                   .map((column) => {
                     return `
                   <div class="editable-input-content">
                     <input
                       type="text"
                       data-state="normal"
                       class="actual-editable-input"
                       value="${column.colName}"
                       readonly
                     />
                     <img src="./assets/images/x-lg.svg" alt="" class="delete-btn" />
                   </div>
          `;
                   })
                   .join("")
               : `
              <div class="editable-input-content">
                <input
                  type="text"
                  data-state="normal"
                  class="actual-editable-input"
                  value=""
                />
                <img src="./assets/images/x-lg.svg" alt="" class="delete-btn" />
              </div>
              `
           }
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
         <button class="create-element-btn">Save Changes</button>
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
            >${colName}<span class="tasks-num"> (${allTasksNum})</span></span
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
      <button class="create-element-btn">Create New Column</button>
     </div>
       `;
      break;
    case "new-task":
      element = `
       <div class="board-column-task" draggable="true" data-draggable="false" data-task-id="${taskID}">
         <h4 class="task-title">${taskName}</h4>
         <span class="subtasks-info"
           ><span class="done-subtasks">${allDoneSubtasksNum}</span> of
           <span class="all-subtasks">${allSubtasksNum}</span> subtasks</span
         >
       </div>
       `;
      break;
    case "task-creation-window":
      element = `
       <div class="window create-task-window">
         <h3>Add New Task</h3>
         <div class="normal-input">
           <h4>Title</h4>
           <input
             type="text"
             data-state="normal"
             class="actual-normal-input"
             value=""
           />
         </div>
         <div class="normal-input">
           <h4>Description</h4>
           <textarea name="description" data-state="normal" data-gramm="false"></textarea>
         </div>
         <div class="editable-input">
           <h4>All Subtasks</h4>
           <div class="editable-input-content">
             <input
               type="text"
               data-state="normal"
               class="actual-editable-input"
               value=""
             />
             <img src="./assets/images/x-lg.svg" alt="" class="delete-btn" />
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
           Add New Subtask
         </button>
         <div class="available-columns-select" data-state="hidden">
           <input
             type="text"
             value="Choose Column"
             readonly
             class="task-choosen-column"
           />
           <svg
             xmlns="http://www.w3.org/2000/svg"
             width="22"
             height="22"
             fill="currentColor"
             class="bi bi-chevron-down"
             viewBox="0 0 16 16"
           >
             <path
               fill-rule="evenodd"
               d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
             />
           </svg>
         </div>
         <div class="available-columns">

         </div>
         <button class="create-element-btn">Create New Task</button>
       </div>
       `;
      break;
    case "task-edit-window":
      element = `
       <div class="window create-task-window" data-task-id="${taskID}">
         <h3>Edit The Task</h3>
         <div class="normal-input">
           <h4>Title</h4>
           <input
             type="text"
             data-state="normal"
             class="actual-normal-input"
             value="${taskName}"
           />
         </div>
         <div class="normal-input">
           <h4>Description</h4>
           <textarea name="description" data-state="normal" data-gramm="false">${taskDescription}</textarea>
         </div>
         <div class="editable-input">
           <h4>All Subtasks</h4>
           ${
             subtasksArr.length > 0
               ? subtasksArr
                   .map((subtask) => {
                     subtasksCounter++;
                     return `
                    <div class="editable-input-content" data-state="${subtask.subtaskState}">
                      <input
                        type="text"
                        data-state="normal"
                        class="actual-editable-input"
                        value="${subtask.subtaskName}"
                        readonly
                      />
                      <img src="./assets/images/x-lg.svg" alt="" class="delete-btn" />
                    </div>
           `;
                   })
                   .join("")
               : `
               <div class="editable-input-content">
                 <input
                   type="text"
                   data-state="normal"
                   class="actual-editable-input"
                   value=""
                 />
                 <img src="./assets/images/x-lg.svg" alt="" class="delete-btn" />
               </div>
               `
           }
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
           Add New Subtask
         </button>
         <div class="available-columns-select" data-state="hidden">
           <input
             type="text"
             value="${availableColumn}"
             readonly
             class="task-choosen-column"
           />
           <svg
             xmlns="http://www.w3.org/2000/svg"
             width="22"
             height="22"
             fill="currentColor"
             class="bi bi-chevron-down"
             viewBox="0 0 16 16"
           >
             <path
               fill-rule="evenodd"
               d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
             />
           </svg>
         </div>
         <div class="available-columns">

         </div>
         <button class="create-element-btn">Save Changes</button>
       </div>
       `;
      break;
    case "task-info-window":
      element = `
       <div class="window task-info-window" data-task-id="${taskID}">
         <div class="task-manipulation">
           <span class="task-name">${taskName}</span>
           <div class="manipulating-spot">
             <div></div>
             <div></div>
             <div></div>
           </div>
         </div>
         <p class="task-description">
          ${taskDescription}
         </p>
         <div class="all-subtasks">
           <span>Subtasks</span>
           ${
             subtasksArr.length > 0
               ? subtasksArr
                   .map((subtask) => {
                     subtasksCounter++;
                     return `
            <div class="subtask" data-state="${subtask.subtaskState}">
              <input type="checkbox" id="cb${subtasksCounter}" ${
                       subtask.subtaskState === "done" ? "checked" : ""
                     }/>
              <label for="cb${subtasksCounter}">${subtask.subtaskName}</label>
            </div>
            `;
                   })
                   .join("")
               : `<div class="hint">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#7c67c7"
                    class="bi bi-emoji-smile-fill"
                    viewBox="0 0 16 16"
                  >
                      <path
                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"
                      />
                    </svg>
                    <p>There are no subtasks to show...</p>
                  </div>`
           }
         </div>
         <div class="current-column">
           <span>Current Column</span>
           <input
             type="text"
             readonly
             class="actual-normal-input"
             data-state="normal"
             value="${availableColumn}"
           />
         </div>
       </div>
       `;
      break;
    case "basic-manipulation-window":
      element = `
      <div class="basic-manipulating ${manipulateTaskOrBoard.toLowerCase()}-basic-manipulation">
        <span class="edit">Edit ${manipulateTaskOrBoard}</span>
        <span class="delete">Delete ${manipulateTaskOrBoard}</span>
      </div>
       `;
      break;
    case "deletion-window":
      element = `
       <div class="window deletion-window">
         <h3>Delete this ${manipulateTaskOrBoard.toLowerCase()}?</h3>
         <p>
           Are you sure you want to delete the "${
             manipulateTaskOrBoard === "Task" ? taskName : boardName
           }" ${manipulateTaskOrBoard.toLowerCase()}? This
           action will remove ${
             manipulateTaskOrBoard === "Task"
               ? "all subtasks"
               : "all columns and tasks"
           } and cannot be reversed.
         </p>
         <div class="btns">
           <button class="btn delete-btn">Delete</button>
           <button class="btn cancel-btn">Cancel</button>
         </div>
       </div>
       `;
      break;
    case "hint-message":
      element = `
       <p class="hint">
           There are no boards. Create new board and then get started!
       </p>
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
    document.querySelector(".board-basic-manipulation")?.remove();
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

  let oldColumnElement;
  let oldColumnObject;
  let oldIndex;

  allDraggables.forEach((element) => {
    element.addEventListener("dragstart", ({ target }) => {
      taskWasDragged = false;
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

      if (taskWasDragged === true) return;

      const newColumnElement = target.parentElement;
      const newColumnObject = app.allBoards
        .find((board) => board.state === "active")
        .columns.find(
          (column) => column.colName === newColumnElement.dataset.name
        );
      const newIndex = [...newColumnElement.children].indexOf(target) - 1;

      const choosenTaskObject = oldColumnObject.tasks[oldIndex];

      oldColumnObject.tasks.splice(oldIndex, 1);

      if (choosenTaskObject == null) return;

      taskWasDragged = true;

      newColumnObject.tasks.splice(newIndex, 0, { ...choosenTaskObject });

      newColumnElement.querySelector(
        ".tasks-num"
      ).textContent = ` (${newColumnObject.tasks.length})`;

      oldColumnElement.querySelector(
        ".tasks-num"
      ).textContent = ` (${oldColumnObject.tasks.length})`;

      interactWithLocalStorage("set");
    });
  });

  allColumns.forEach((column) => {
    column.addEventListener("dragover", (event) => {
      event.preventDefault();
      const draggable = document.querySelector(`[data-draggable="true"]`);
      const afterElement = getAfterElement(column, event.clientY);

      if (!(draggable instanceof Node)) return;

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

function handleTaskClicking() {
  if (taskWasClicked === true) return;
  boardContentSpot.addEventListener("click", ({ target }) => {
    const clickedTaskElement = target.closest(".board-column-task");
    if (clickedTaskElement == null) return;
    document.querySelector(".board-basic-manipulation")?.remove();
    const sameTaskObject = app.allBoards
      .find((board) => board.state === "active")
      .columns.find(
        (column) =>
          column.colName === clickedTaskElement.parentElement.dataset.name
      )
      .tasks.find((task) => task.taskID == clickedTaskElement.dataset.taskId);
    if (sameTaskObject == null) return;
    createMarkup({
      elementType: "task-info-window",
      placeToInsert: "beforeend",
      elementToInsertInto: document.body,
      taskName: sameTaskObject.taskName,
      taskID: clickedTaskElement.dataset.taskId,
      taskDescription: sameTaskObject.taskDescription,
      allSubtasksNum: sameTaskObject.subtasks.length,
      subtasksArr: sameTaskObject.subtasks,
      availableColumn: target.parentElement.dataset.name,
    });
    createMarkup({
      elementType: "overlay",
      placeToInsert: "beforeend",
      elementToInsertInto: document.body,
    });
  });
  taskWasClicked = true;
}

function handleTaskDeletion({ openedWindow, taskID, choosenColumn }) {
  if (openedWindow.classList.contains("deletion-window")) {
    openedWindow.addEventListener("click", ({ target }) => {
      const clickedBtn = target.closest(".btn");
      if (clickedBtn == null) return;
      if (clickedBtn.classList.contains("delete-btn")) {
        const tasksArray = app.allBoards
          .find((board) => board.state === "active")
          .columns.find((column) => column.colName === choosenColumn).tasks;
        const choosenTaskObjectIndex = tasksArray.findIndex(
          (task) => task.taskID == taskID
        );
        const chooseTaskElement = document.querySelector(
          `.board-column-task[data-task-id="${taskID}"]`
        );

        if (choosenTaskObjectIndex === -1) return;

        tasksArray.splice(choosenTaskObjectIndex, 1);
        chooseTaskElement.remove();
        document
          .querySelector(`.board-column[data-name="${choosenColumn}"]`)
          .querySelector(".tasks-num").textContent = ` (${tasksArray.length})`;
        interactWithLocalStorage("set");
      }
      openedWindow.remove();
      document.querySelector(".overlay")?.remove();
    });
  }
}

function handleBoardDeletion({ openedWindow, boardID }) {
  if (openedWindow.classList.contains("deletion-window")) {
    openedWindow.addEventListener("click", ({ target }) => {
      const clickedBtn = target.closest(".btn");
      if (clickedBtn == null) return;
      if (clickedBtn.classList.contains("delete-btn")) {
        const targetBoardObject = app.allBoards.find(
          (board) => board.boardID == boardID
        );
        const targetBoardElement = document.getElementById(
          `${targetBoardObject.boardID}`
        );
        const targetBoardObjectIndex = app.allBoards.findIndex(
          (board) => board.boardID == boardID
        );
        if (targetBoardObjectIndex === -1) return;
        if (app.allBoards[targetBoardObjectIndex + 1] != null) {
          const nextBoardObject = app.allBoards[targetBoardObjectIndex + 1];
          const nextBoardElement = document.getElementById(
            `${nextBoardObject.boardID}`
          );
          nextBoardObject.state = "active";
          nextBoardElement.dataset.state = "active";

          document.querySelector(".board-title").textContent =
            nextBoardObject.boardName;
          if (window.innerWidth < 767)
            mainTitle.textContent = nextBoardObject.boardName;

          showBoardContent(nextBoardObject);

          nextBoardObject.columns.forEach((column) => {
            column.tasks.forEach(({ taskName, taskID, subtasks }) => {
              createMarkup({
                elementType: "new-task",
                placeToInsert: "beforeend",
                elementToInsertInto: document.querySelector(
                  `[data-name="${column.colName}"]`
                ),
                taskName,
                taskID,
                allSubtasksNum: subtasks.length,
                allDoneSubtasksNum: subtasks.filter(
                  (subtask) => subtask.subtaskState === "done"
                ).length,
              });
            });
          });
          startDragging();
          handleTaskClicking();
          handleBoardContent();
        }

        if (
          app.allBoards[targetBoardObjectIndex + 1] == null &&
          app.allBoards[targetBoardObjectIndex - 1] != null
        ) {
          const previousBoardObject = app.allBoards[targetBoardObjectIndex - 1];
          const previousBoardElement = document.getElementById(
            `${previousBoardObject.boardID}`
          );
          previousBoardObject.state = "active";
          previousBoardElement.dataset.state = "active";

          document.querySelector(".board-title").textContent =
            previousBoardObject.boardName;
          if (window.innerWidth < 767)
            mainTitle.textContent = previousBoardObject.boardName;

          showBoardContent(previousBoardObject);

          previousBoardObject.columns.forEach((column) => {
            column.tasks.forEach(({ taskName, taskID, subtasks }) => {
              createMarkup({
                elementType: "new-task",
                placeToInsert: "beforeend",
                elementToInsertInto: document.querySelector(
                  `[data-name="${column.colName}"]`
                ),
                taskName,
                taskID,
                allSubtasksNum: subtasks.length,
                allDoneSubtasksNum: subtasks.filter(
                  (subtask) => subtask.subtaskState === "done"
                ).length,
              });
            });
          });
          startDragging();
          handleTaskClicking();
          handleBoardContent();
        }

        app.allBoards.splice(targetBoardObjectIndex, 1);
        targetBoardElement.remove();
        interactWithLocalStorage("set");
        boardsNum = app.allBoards.length;

        document.querySelector(
          ".boards-num"
        ).textContent = `(${app.allBoards.length})`;

        if (app.allBoards.length === 0) {
          [...document.querySelector(".board-content").children].forEach(
            (child) => child.remove()
          );
          document.querySelector(".board-title").remove();
          createMarkup({
            elementType: "hint-message",
            placeToInsert: "beforeend",
            elementToInsertInto: document.querySelector(".board-content"),
          });
          if (window.innerWidth < 767) {
            mainTitle.textContent = "Kanban";
          }
        }
      }
      openedWindow.remove();
      document.querySelector(".overlay")?.remove();
    });
  }
}

manipulationSpot.addEventListener("click", () => {
  const oldBoardManipulationWindow = document.querySelector(
    ".board-basic-manipulation"
  );
  if (oldBoardManipulationWindow != null)
    return oldBoardManipulationWindow.remove();
  createMarkup({
    elementType: "basic-manipulation-window",
    placeToInsert: "beforeend",
    elementToInsertInto: document.body,
    manipulateTaskOrBoard: "Board",
  });
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
            actualNormalInput?.addEventListener(event, ({ target }) => {
              switch (event) {
                case "click":
                  if (target.dataset.state !== "empty")
                    target.dataset.state = "active";
                  break;
                case "blur":
                  target.parentElement.querySelector(".input-error")?.remove();
                  if (target.value.trim() === "") {
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
            allOldEditableContentSpots.forEach((contentSpot) => {
              contentSpot.addEventListener("click", ({ target }) => {
                if (!target.classList?.contains("delete-btn")) return;
                target.parentElement.remove();
                if (openedWindow.hasAttribute("data-board-id")) {
                  const activeBoard = app.allBoards.find(
                    (board) => board.state === "active"
                  );
                  if (target.parentElement.children[0].value !== "") {
                    const targetColumnObjectIndex =
                      activeBoard.columns.findIndex(
                        (column) =>
                          column.colName ===
                          target.parentElement.children[0].value
                      );

                    if (
                      targetColumnObjectIndex !== -1 &&
                      targetColumnObjectIndex ==
                        allOldEditableContentSpots.indexOf(target.parentElement)
                    ) {
                      activeBoard.columns.splice(targetColumnObjectIndex, 1);
                      document
                        .querySelector(
                          `.board-column[data-name="${target.parentElement.children[0].value}"]`
                        )
                        .remove();
                      interactWithLocalStorage("set");
                    }
                  }
                }

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

          if (
            openedWindow.classList.contains("new-board-window") ||
            openedWindow.classList.contains("create-task-window")
          ) {
            addNewEditableInputContentBtn.addEventListener("click", () => {
              createMarkup({
                elementType: "new-editable-input-content",
                elementToInsertInto:
                  openedWindow.querySelector(".editable-input"),
                placeToInsert: "beforeend",
                // subtaskState
              });

              const allNewEditableContentSpots = openedWindow.querySelectorAll(
                ".editable-input-content"
              );
              allOldEditableContentSpots.push(
                allNewEditableContentSpots[
                  allNewEditableContentSpots.length - 1
                ]
              );

              handleDeleteEditableContentInput();
            });
          }

          if (openedWindow.classList.contains("create-task-window")) {
            const availableColumnsSelect = openedWindow.querySelector(
              ".available-columns-select"
            );
            const actualAvailableColumnsSpot =
              openedWindow.querySelector(".available-columns");
            const allColumns = [...document.querySelectorAll(".board-column")];
            availableColumnsSelect.addEventListener("click", () => {
              availableColumnsSelect.dataset.state =
                availableColumnsSelect.dataset.state === "hidden"
                  ? "visible"
                  : "hidden";
            });
            allColumns.forEach((column) =>
              actualAvailableColumnsSpot.insertAdjacentHTML(
                "beforeend",
                `<span data-column="${column.dataset.name}">${column.dataset.name}</span>`
              )
            );
            actualAvailableColumnsSpot.addEventListener(
              "click",
              ({ target }) => {
                const choosenColumn = target.closest("[data-column]");
                if (choosenColumn == null) return;
                availableColumnsSelect.children[0].value =
                  choosenColumn.dataset.column;
              }
            );
          }
          if (!openedWindow.classList.contains("task-info-window")) {
            createElementBtn?.addEventListener("click", () => {
              const requiredInput = openedWindow.querySelector(
                ".actual-normal-input"
              );

              if (
                requiredInput.value.trim() === "" ||
                allOldEditableContentSpots.some(
                  (column) =>
                    column
                      .querySelector(".actual-editable-input")
                      .value.trim() === ""
                )
              )
                return;

              if (openedWindow.classList?.contains("new-board-window")) {
                if (!openedWindow.hasAttribute("data-board-id")) {
                  if (
                    [...document.querySelectorAll(".created-board-name")].find(
                      (board) =>
                        board.children[1].textContent ===
                        actualNormalInput.value
                    )
                  )
                    return createErrorMessage(
                      "This board is already exist!",
                      openedWindow.children[1]
                    );

                  const randomBoardID =
                    Math.floor(Math.random() * 1000000000) + 1;
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
                    boardID: randomBoardID,
                  };

                  const allCreatedBoardElements =
                    allBoardsSpot.querySelectorAll(".created-board-name");

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
                    boardID: randomBoardID,
                    boardState: "active",
                  });

                  document.querySelector(".board-title")?.remove();

                  createMarkup({
                    elementType: "board-title",
                    placeToInsert: "afterbegin",
                    elementToInsertInto: document.querySelector(".board-info"),
                    boardName: requiredInput.value,
                  });

                  if (window.innerWidth < 767) {
                    mainTitle.textContent = requiredInput.value;
                    document.querySelector(".board-title").style.display =
                      "none";
                  }

                  showBoardContent(newBoard);
                  handleBoardContent();

                  boardsNum++;

                  document.querySelector(
                    ".boards-num"
                  ).textContent = `(${boardsNum})`;

                  hint?.remove();
                }
                if (openedWindow.hasAttribute("data-board-id")) {
                  const allActualInputs = [
                    ...openedWindow.querySelectorAll(".actual-editable-input"),
                  ];

                  let foundSameColName = false;

                  for (let i = 0; i < allActualInputs.length; i++) {
                    for (let j = i + 1; j < allActualInputs.length; j++) {
                      if (allActualInputs[i].value === allActualInputs[j].value)
                        return (foundSameColName = true);
                    }
                  }

                  // const foundSameColName = allActualInputs.some(
                  //   (input, index) =>
                  //     allActualInputs
                  //       .slice(index + 1)
                  //       .some((otherInput) => input.value === otherInput.value)
                  // );

                  if (foundSameColName) return;

                  const targetBoardObject = app.allBoards.find(
                    (board) => board.boardID == openedWindow.dataset.boardId
                  );
                  targetBoardObject.boardName = requiredInput.value;
                  targetBoardObject.columns = allOldEditableContentSpots.map(
                    (editableSpot, index) => {
                      const actualInputField = editableSpot.querySelector(
                        ".actual-editable-input"
                      );
                      const targetColumn = targetBoardObject.columns.find(
                        (column) => column.colName === actualInputField.value
                      );

                      if (targetColumn != null) {
                        return {
                          colName: actualInputField.value,
                          tasks: targetColumn.tasks,
                        };
                      } else if (
                        targetColumn == null &&
                        targetBoardObject.columns[index] != null
                      ) {
                        return {
                          colName: actualInputField.value,
                          tasks: targetBoardObject.columns[index].tasks,
                        };
                      } else {
                        return {
                          colName: actualInputField.value,
                          tasks: [],
                        };
                      }
                    }
                  );

                  document.querySelector(
                    `.created-board-name[data-state="active"]`
                  ).children[1].textContent = targetBoardObject.boardName;

                  document.querySelector(".board-title").textContent =
                    targetBoardObject.boardName;

                  document
                    .querySelectorAll(".column-name")
                    .forEach((columnName, index) => {
                      columnName.childNodes[0].textContent =
                        targetBoardObject.columns[index].colName;
                    });

                  document
                    .querySelectorAll(".board-column")
                    .forEach((boardColumnElement, index) => {
                      boardColumnElement.dataset.name =
                        targetBoardObject.columns[index].colName;
                    });

                  if (
                    document.querySelectorAll(".board-column").length <
                    targetBoardObject.columns.length
                  ) {
                    for (
                      let i = document.querySelectorAll(".board-column").length;
                      i < targetBoardObject.columns.length;
                      i++
                    ) {
                      createMarkup({
                        elementType: "board-column",
                        placeToInsert: "beforebegin",
                        elementToInsertInto:
                          document.querySelector(".add-column-spot"),
                        colName: targetBoardObject.columns[i].colName,
                        allTasksNum: targetBoardObject.columns[i].tasks.length,
                      });
                    }
                  }
                  interactWithLocalStorage("set");
                }
              }

              if (openedWindow.classList?.contains("new-column-window")) {
                const activeBoard = app.allBoards.find(
                  (board) => board.state === "active"
                );

                if (actualNormalInput.value === "") return;

                if (
                  [...document.querySelectorAll(".board-column")].find(
                    (column) => column.dataset.name === actualNormalInput.value
                  )
                )
                  return createErrorMessage(
                    "This column is already exist!",
                    openedWindow.children[1]
                  );
                activeBoard.columns.push({
                  colName: actualNormalInput.value,
                  tasks: [],
                });

                interactWithLocalStorage("set");

                createMarkup({
                  elementType: "board-column",
                  placeToInsert: "beforebegin",
                  elementToInsertInto:
                    document.querySelector(".add-column-spot"),
                  colName: actualNormalInput.value,
                  allTasksNum: activeBoard.columns.find(
                    (column) => column.colName === actualNormalInput.value
                  ).tasks.length,
                });
              }

              if (openedWindow.classList?.contains("create-task-window")) {
                if (!openedWindow.hasAttribute("data-task-id")) {
                  const choosenColumnName = openedWindow.querySelector(
                    ".task-choosen-column"
                  ).value;
                  if (choosenColumnName === "Choose Column") return;
                  const choosenColumnObject = app.allBoards
                    .find((board) => board.state === "active")
                    .columns.find(
                      (column) => column.colName === choosenColumnName
                    );
                  const choosenColumnSpot = document.querySelector(
                    `.board-column[data-name="${choosenColumnName}"]`
                  );
                  const taskDescriptionTextarea =
                    openedWindow.querySelector("textarea");
                  const randomID = Math.floor(Math.random() * 1000000000) + 1;
                  choosenColumnObject.tasks.push({
                    taskName: requiredInput.value,
                    taskID: randomID,
                    taskDescription: taskDescriptionTextarea.value,
                    subtasks: allOldEditableContentSpots.map(
                      (editableContent) => {
                        return {
                          subtaskName: editableContent.querySelector(
                            ".actual-editable-input"
                          ).value,
                          subtaskState: "waiting",
                        };
                      }
                    ),
                  });

                  interactWithLocalStorage("set");

                  createMarkup({
                    elementType: "new-task",
                    placeToInsert: "beforeend",
                    elementToInsertInto: choosenColumnSpot,
                    taskName: requiredInput.value,
                    taskID: randomID,
                    allSubtasksNum: allOldEditableContentSpots.length,
                    allDoneSubtasksNum: 0,
                  });

                  choosenColumnSpot.children[0].children[1].children[0].textContent = ` (${choosenColumnObject.tasks.length})`;
                }
                if (openedWindow.hasAttribute("data-task-id")) {
                  const choosenTaskElement = document.querySelector(
                    `.board-column-task[data-task-id="${openedWindow.dataset.taskId}"]`
                  );
                  const oldColumnElementName =
                    choosenTaskElement.parentElement.dataset.name;
                  const activeBoard = app.allBoards.find(
                    (board) => board.state === "active"
                  );
                  const taskDescriptionTextarea =
                    openedWindow.querySelector("textarea");
                  const choosenTaskObject = activeBoard.columns
                    .find((column) => column.colName === oldColumnElementName)
                    .tasks.find(
                      (task) => task.taskID == openedWindow.dataset.taskId
                    );

                  choosenTaskObject.taskName = requiredInput.value;
                  choosenTaskObject.taskDescription =
                    taskDescriptionTextarea.value;
                  choosenTaskObject.subtasks = allOldEditableContentSpots.map(
                    (editableContent) => {
                      return {
                        subtaskName: editableContent.querySelector(
                          ".actual-editable-input"
                        ).value,
                        subtaskState: editableContent.dataset.state
                          ? editableContent.dataset.state
                          : "waiting",
                      };
                    }
                  );

                  const newColumnElementName =
                    openedWindow.children[5].children[0].value;
                  if (oldColumnElementName !== newColumnElementName) {
                    const oldColumnObject = activeBoard.columns.find(
                      (column) => column.colName === oldColumnElementName
                    );
                    const oldColumnSpot = document.querySelector(
                      `.board-column[data-name="${oldColumnElementName}"]`
                    );
                    const newColumnObject = activeBoard.columns.find(
                      (column) => column.colName === newColumnElementName
                    );
                    const newColumnSpot = document.querySelector(
                      `.board-column[data-name="${newColumnElementName}"]`
                    );
                    const choosenTaskObjectIndex =
                      oldColumnObject.tasks.findIndex(
                        (task) => task.taskID == choosenTaskObject.taskID
                      );
                    if (choosenTaskObjectIndex === -1) return;

                    oldColumnObject.tasks.splice(choosenTaskObjectIndex, 1);
                    choosenTaskElement.remove();

                    newColumnObject.tasks.push(choosenTaskObject);
                    createMarkup({
                      elementType: "new-task",
                      placeToInsert: "beforeend",
                      elementToInsertInto: newColumnSpot,
                      taskName: choosenTaskObject.taskName,
                      taskID: choosenTaskObject.taskID,
                      allSubtasksNum: choosenTaskObject.subtasks.length,
                      allDoneSubtasksNum: choosenTaskObject.subtasks.filter(
                        (subtask) => subtask.subtaskState === "done"
                      ).length,
                    });

                    oldColumnSpot.children[0].children[1].children[0].textContent = ` (${oldColumnObject.tasks.length})`;
                    newColumnSpot.children[0].children[1].children[0].textContent = ` (${newColumnObject.tasks.length})`;
                  }
                  if (oldColumnElementName === newColumnElementName) {
                    choosenTaskElement.children[0].textContent =
                      choosenTaskObject.taskName;
                    choosenTaskElement.children[1].children[0].textContent =
                      choosenTaskObject.subtasks.filter(
                        (subtask) => subtask.subtaskState === "done"
                      ).length;
                    choosenTaskElement.children[1].children[1].textContent =
                      choosenTaskObject.subtasks.length;
                  }
                  interactWithLocalStorage("set");
                }
              }

              overlay.remove();
              document
                .querySelectorAll(".window")
                .forEach((window) => window.remove());
              startDragging();
              handleTaskClicking();
            });
          }

          if (openedWindow.classList.contains("task-info-window")) {
            const observer2 = new MutationObserver((mutations) => {
              const taskManipulationWindow = [...mutations[0].addedNodes].find(
                (node) => node.classList?.contains("task-basic-manipulation")
              );
              const openedTaskWindow =
                document.querySelector(".task-info-window");
              const editTaskBtn =
                taskManipulationWindow?.querySelector(".edit");
              const deleteTaskBtn =
                taskManipulationWindow?.querySelector(".delete");
              const activeBoard = app.allBoards.find(
                (board) => board.state === "active"
              );
              const sameTaskObject = activeBoard.columns
                .find(
                  (column) =>
                    column.colName ===
                    openedTaskWindow.children[3].children[1].defaultValue
                )
                .tasks.find(
                  (task) => task.taskID == openedTaskWindow.dataset.taskId
                );
              editTaskBtn?.addEventListener("click", () => {
                createMarkup({
                  elementType: "task-edit-window",
                  placeToInsert: "beforeend",
                  elementToInsertInto: document.body,
                  taskName: sameTaskObject.taskName,
                  taskID: sameTaskObject.taskID,
                  taskDescription: sameTaskObject.taskDescription,
                  subtasksArr: sameTaskObject.subtasks,
                  availableColumn:
                    openedTaskWindow.children[3].children[1].defaultValue,
                });
              });
              deleteTaskBtn?.addEventListener("click", () => {
                openedTaskWindow.remove();
                createMarkup({
                  elementType: "deletion-window",
                  placeToInsert: "beforeend",
                  elementToInsertInto: document.body,
                  boardName: activeBoard.boardName,
                  taskName: sameTaskObject.taskName,
                  manipulateTaskOrBoard: "Task",
                });
                handleTaskDeletion({
                  openedWindow: document.querySelector(".deletion-window"),
                  taskID: sameTaskObject.taskID,
                  choosenColumn: openedTaskWindow.children[3].children[1].value,
                });
              });
            });
            observer2.observe(openedWindow, {
              childList: true,
            });
            const manipulatingTaskSpot =
              openedWindow.querySelector(".manipulating-spot");
            const allSubtasksSpot = openedWindow.querySelector(".all-subtasks");
            manipulatingTaskSpot.addEventListener("click", () => {
              const oldTaskManipulationWindow = document.querySelector(
                ".task-basic-manipulation"
              );
              if (oldTaskManipulationWindow != null)
                return oldTaskManipulationWindow.remove();
              createMarkup({
                elementType: "basic-manipulation-window",
                placeToInsert: "beforeend",
                elementToInsertInto: openedWindow,
                manipulateTaskOrBoard: "Task",
              });
            });
            allSubtasksSpot.addEventListener("click", ({ target }) => {
              const clickedSubtask = target.closest(".subtask");
              if (clickedSubtask == null) return;
              const columnSpotName = openedWindow.querySelector(
                ".actual-normal-input"
              ).value;
              const allSubtasksArr = app.allBoards
                .find((board) => board.state === "active")
                .columns.find((column) => column.colName === columnSpotName)
                .tasks.find(
                  (task) => task.taskID == openedWindow.dataset.taskId
                ).subtasks;
              const taskElementThatClickedBefore =
                boardContentSpot.querySelector(
                  `[data-task-id="${openedWindow.dataset.taskId}"]`
                );
              const sameSubtaskObject = allSubtasksArr.find(
                (subtask) =>
                  subtask.subtaskName === clickedSubtask.children[1].textContent
              );
              if (clickedSubtask == null) return;
              if (clickedSubtask.dataset.state === "waiting") {
                clickedSubtask.dataset.state = "done";
                clickedSubtask.children[0].setAttribute("checked", "");
                sameSubtaskObject.subtaskState = "done";
                const allDoneSubtasks = allSubtasksArr.filter(
                  (subtask) => subtask.subtaskState === "done"
                );
                taskElementThatClickedBefore.children[1].children[0].textContent =
                  allDoneSubtasks.length;
              } else {
                clickedSubtask.dataset.state = "waiting";
                clickedSubtask.children[0].removeAttribute("checked");
                sameSubtaskObject.subtaskState = "waiting";
                const allDoneSubtasks = allSubtasksArr.filter(
                  (subtask) => subtask.subtaskState === "done"
                );
                taskElementThatClickedBefore.children[1].children[0].textContent =
                  allDoneSubtasks.length;
              }
              interactWithLocalStorage("set");
            });
          }

          overlay.addEventListener("click", ({ target }) => {
            openedWindow.remove();
            document.querySelector(".task-basic-manipulation")?.remove();
            target.remove();
          });

          window.addEventListener("keydown", ({ key }) => {
            if (key !== "Escape") return;
            openedWindow.remove();
            document.querySelector(".task-basic-manipulation")?.remove();
            overlay.remove();
          });
        }

        if (addedNode.classList?.contains("board-basic-manipulation")) {
          const manipulateBoardWindow = addedNode;
          const editBoardBtn = manipulateBoardWindow.querySelector(".edit");
          const deleteBoardBtn = manipulateBoardWindow.querySelector(".delete");
          const activeBoard = app.allBoards.find(
            (board) => board.state === "active"
          );
          editBoardBtn.addEventListener("click", () => {
            if (app.allBoards.length === 0) return;
            createMarkup({
              elementType: "board-edit-window",
              placeToInsert: "beforeend",
              elementToInsertInto: document.body,
              boardName: activeBoard.boardName,
              boardID: activeBoard.boardID,
              columnsArr: activeBoard.columns,
            });
            createMarkup({
              elementType: "overlay",
              placeToInsert: "beforeend",
              elementToInsertInto: document.body,
            });
            manipulateBoardWindow.remove();
          });
          deleteBoardBtn.addEventListener("click", () => {
            if (app.allBoards.length === 0) return;
            manipulateBoardWindow.remove();
            createMarkup({
              elementType: "deletion-window",
              placeToInsert: "beforeend",
              elementToInsertInto: document.body,
              boardName: activeBoard.boardName,
              manipulateTaskOrBoard: "Board",
            });
            createMarkup({
              elementType: "overlay",
              placeToInsert: "beforeend",
              elementToInsertInto: document.body,
            });
            handleBoardDeletion({
              openedWindow: document.querySelector(".deletion-window"),
              boardID: activeBoard.boardID,
            });
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

addTaskBtn.addEventListener("click", () => {
  document.querySelector(".board-basic-manipulation")?.remove();
  createMarkup({
    elementType: "overlay",
    placeToInsert: "beforeend",
    elementToInsertInto: document.body,
  });
  createMarkup({
    elementType: "task-creation-window",
    placeToInsert: "beforeend",
    elementToInsertInto: document.body,
  });
});

function dealWithTitles() {
  const boardTitle = document.querySelector(".board-title");
  if (window.innerWidth > 767) {
    mainTitle.textContent = "Kanban";
    boardTitle.style.display = "block";
    return;
  }
  mainTitle.textContent = boardTitle.textContent;
  boardTitle.style.display = "none";
}

window.addEventListener("load", () => {
  boardCreationSpot.dataset.state =
    window.innerWidth < 767 ? "hidden" : "visible";

  const theAppObjectFromLocalStorage = interactWithLocalStorage("get");

  if (theAppObjectFromLocalStorage == null)
    return interactWithLocalStorage("set");

  document.body.dataset.mode = theAppObjectFromLocalStorage.mode || "light";
  document.querySelector(".toggle-mode").dataset.currentMode =
    theAppObjectFromLocalStorage.mode || "light";

  app = theAppObjectFromLocalStorage;

  if (theAppObjectFromLocalStorage.allBoards.length === 0) return;

  boardsNum = app.allBoards.length;

  document.querySelector(".boards-num").textContent = `(${boardsNum})`;
  hint?.remove();

  app.allBoards.forEach((board) => {
    createMarkup({
      elementType: "new-board",
      placeToInsert: "beforeend",
      elementToInsertInto: allBoardsSpot,
      boardName: board.boardName,
      boardID: board.boardID,
      boardState: board.state,
    });
    if (board.state === "active") {
      createMarkup({
        elementType: "board-title",
        placeToInsert: "afterbegin",
        elementToInsertInto: document.querySelector(".board-info"),
        boardName: board.boardName,
      });

      dealWithTitles();
      window.addEventListener("resize", dealWithTitles);

      showBoardContent(board);

      board.columns.forEach((column) => {
        column.tasks.forEach(({ taskName, taskID, subtasks }) => {
          createMarkup({
            elementType: "new-task",
            placeToInsert: "beforeend",
            elementToInsertInto: document.querySelector(
              `[data-name="${column.colName}"]`
            ),
            taskName,
            taskID,
            allSubtasksNum: subtasks.length,
            allDoneSubtasksNum: subtasks.filter(
              (subtask) => subtask.subtaskState === "done"
            ).length,
          });
        });
      });
      startDragging();
      handleTaskClicking();
      handleBoardContent();
    }
  });
});

allBoardsSpot.addEventListener("click", ({ target }) => {
  document.querySelector(".board-basic-manipulation")?.remove();
  const clickedBoard = target.closest(".created-board-name");
  if (clickedBoard == null || clickedBoard.dataset.state === "active") return;
  clickedBoard.parentElement
    .querySelectorAll(".created-board-name")
    .forEach((boardNameSpot) => (boardNameSpot.dataset.state = "disabled"));
  clickedBoard.dataset.state = "active";
  const choosenBoard = app.allBoards.find(
    (board) => board.boardID == clickedBoard.id
  );
  if (choosenBoard == null) return;
  showBoardContent(choosenBoard);
  handleBoardContent();
  app.allBoards.forEach((board) => (board.state = "disabled"));
  choosenBoard.state = "active";
  if (choosenBoard.columns.length > 0) {
    choosenBoard.columns.forEach((column) => {
      column.tasks.forEach(({ taskName, taskID, subtasks }) => {
        createMarkup({
          elementType: "new-task",
          placeToInsert: "beforeend",
          elementToInsertInto: document.querySelector(
            `[data-name="${column.colName}"]`
          ),
          taskName,
          taskID,
          allSubtasksNum: subtasks.length,
          allDoneSubtasksNum: subtasks.filter(
            (subtask) => subtask.subtaskState === "done"
          ).length,
        });
      });
    });
    handleTaskClicking();
    startDragging();
  }
  interactWithLocalStorage("set");
  document.querySelector(".board-title").textContent = choosenBoard.boardName;
  window.innerWidth < 767
    ? (mainTitle.textContent = choosenBoard.boardName)
    : "Kanban";
});

hideSidebarBtn.addEventListener("click", () => {
  boardCreationSpot.dataset.state = "hidden";
  openArrow.dataset.state = "positive";
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
  document.querySelector(".board-basic-manipulation")?.remove();
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

openArrow?.addEventListener("click", () => {
  if (
    boardCreationSpot.dataset.state === "hidden" &&
    openArrow.dataset.state === "positive"
  ) {
    boardCreationSpot.dataset.state = "visible";
    openArrow.dataset.state = "negative";
  } else {
    boardCreationSpot.dataset.state = "hidden";
    openArrow.dataset.state = "positive";
  }
});

window.addEventListener("resize", () => {
  const boardTitle = document.querySelector(".board-title");

  if (window.innerWidth < 767) {
    document.querySelector(".show-sidebar-btn")?.remove();
    if (app.allBoards.length > 0)
      mainTitle.textContent = boardTitle.textContent;
    if (boardTitle != null) boardTitle.style.display = "none";
    if (openArrow.dataset.state === "positive") {
      boardCreationSpot.dataset.state = "hidden";
    }
  }

  if (window.innerWidth > 767 && boardTitle != null) {
    mainTitle.textContent = "Kanban";
    boardTitle.style.display = "block";
  }

  if (
    window.innerWidth > 767 &&
    boardCreationSpot.dataset.state === "hidden" &&
    document.querySelector(".show-sidebar-btn") == null
  ) {
    boardCreationSpot.dataset.state = "visible";
    openArrow.dataset.state = "positive";
  }
});
