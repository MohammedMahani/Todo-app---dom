const taskName = document.querySelector(".task-name");
const taskDate = document.querySelector(".task-date");
const taskDetails = document.querySelector(".task-details");
const taskSubmit = document.querySelector(".task-submit");
const tasksDiv = document.querySelector(".tasks");
let tasks = [];

taskSubmit.addEventListener("click", () => {
  let taskNameValue = taskName.value;
  let taskDateValue = taskDate.value;
  let taskDetailsValue = taskDetails.value;
  if (!taskNameValue || !taskDateValue || !taskDetailsValue) {
    alert("All Fields are required !");
  } else {
    addTask(taskNameValue, taskDateValue, taskDetailsValue);
    getTask(tasks);
  }
});

function addTask(titleValue, dateValue, detailsValue) {
  let task = {
    id: Date.now(),
    title: titleValue,
    date: dateValue,
    details: detailsValue,
    completed: false,
  };
  tasks.push(task);
}

function createTaskContent(task) {
  let createMainDiv = document.createElement("div");
  let titleDate = document.createElement("div");
  let taskTitle = document.createElement("h3");
  taskTitle.textContent = task.title;
  let taskDate = document.createElement("h6");
  taskDate.textContent = task.date;

  let remove = document.createElement("h3");
  remove.textContent = "x";
  remove.addEventListener("click", () => {
    deleteTask(task.id);
    createMainDiv.remove();
  });

  let line = document.createElement("hr");
  let taskDetails = document.createElement("h3");
  taskDetails.textContent = task.details;

  let checkInp = document.createElement("input");
  checkInp.setAttribute("type", "checkbox");
  checkInp.checked = task.completed;
  checkInp.addEventListener("change", () => {
    task.completed = checkInp.checked;
    if (task.completed) {
      taskTitle.style.backgroundColor = "green";
    } else {
      taskTitle.style.backgroundColor = "transparent";
    }
  });

  createMainDiv.append(titleDate);
  titleDate.append(taskTitle);
  titleDate.append(taskDate);
  createMainDiv.append(remove);
  createMainDiv.append(line);
  createMainDiv.append(taskDetails);
  createMainDiv.append(checkInp);
  tasksDiv.append(createMainDiv);

  // Style
  createMainDiv.style.cssText =
    "width: 100% ; background-color: #f6fafb; display:flex;flex-wrap:wrap; padding: 30px; justify-content: space-between; flex-wrap: wrap; margin-bottom:20px";
  titleDate.style.cssText =
    "width: 95% ; display:flex;align-items:flex-start;flex-direction:column";
  remove.style.cssText = "width: 5%; text-align:end; color:red; cursor:pointer";
  taskTitle.style.cssText = "margin-right: 20px;";
  line.style.cssText = "width:100%; margin-top:10px";
  taskDetails.style.cssText = "width: 100%; margin-top:25px";
}

function getTask(tasksArr) {
  tasksDiv.innerHTML = "";
  tasksArr.map((e) => {
    createTaskContent(e);
  });
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
}

getTask(tasks);
