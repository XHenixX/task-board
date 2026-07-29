// Cargar tareas al iniciar
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value;

    if (taskText === "") {
        alert("Escribe una tarea");
        return;
    }

    createTaskElement(taskText);
    saveTask(taskText);

    input.value = "";
}

function createTaskElement(taskText) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    // EDITAR
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = function () {
        const newText = prompt("Editar tarea:", span.textContent);
        if (newText !== null && newText !== "") {
            updateTask(span.textContent, newText);
            span.textContent = newText;
        }
    };

    // ELIMINAR
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = function () {
        deleteTask(span.textContent);
        li.remove();
    };

    const actions = document.createElement("div");
    actions.classList.add("actions");

    editBtn.classList.add("edit-btn");
    deleteBtn.classList.add("delete-btn");

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    document.getElementById("taskList").appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task));
}

function deleteTask(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskToDelete);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.indexOf(oldTask);
    if (index !== -1) {
        tasks[index] = newTask;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}