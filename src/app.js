//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const currentYear = document.getElementById("updatedfooter");
let today = new Date().toLocaleDateString("en-GB");
console.log(today);
//Updated the year in the footer
currentYear.innerHTML =
  "&copy; " + "Universum Project " + new Date().getFullYear();

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
//Functions

function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();
  //ToDo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  //Value
  newTodo.innerText = todoInput.value + " " + today;
  //
  if (todoInput.value.trim() == "") {
    alert("Please enter a task");
    return true;
  }
  newTodo.classList.add("todo-item");
  //Append the item to the todoDiv
  todoDiv.appendChild(newTodo);
  //Add Todo to localStorage
  saveLocalTodos(todoInput.value + " " + today);
  //Check Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  //Append the button to the todoDiv
  todoDiv.appendChild(completedButton);
  //Check trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  //Append the button to the todoDiv
  todoDiv.appendChild(trashButton);
  //Append to list
  todoList.appendChild(todoDiv);
  //Clear ToDo Input Value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //Delete Todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    //Remove from localStorage
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Check Mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //Check if you have todo in localstorage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    //Parses the item into an array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //Push the item to the array
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //Check if you have todo in localstorage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    //Parses the item into an array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //ToDo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    //Value
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    //Append the item to the todoDiv
    todoDiv.appendChild(newTodo);
    //Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    //Append the button to the todoDiv
    todoDiv.appendChild(completedButton);
    //Check trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    //Append the button to the todoDiv
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  //Check if you have todo in localstorage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    //Parses the item into an array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
