let taskId = 0;

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value;

    if (taskText === "") {
        alert("Escribe una tarea");
        return;
    }

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    // BOTÓN EDITAR
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = function () {
        const newText = prompt("Editar tarea:", span.textContent);
        if (newText !== null && newText !== "") {
            span.textContent = newText;
        }
    };

    // BOTÓN ELIMINAR
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = function () {
        li.remove();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}

function createTaskElement(text) {
    const div = document.createElement("div");
    div.className = "task";
    div.innerText = text;
    div.id = "task-" + taskId++;

    // Click = mover tarea
    div.onclick = () => moveTask(div);

    return div;
}

function moveTask(task) {
    const parent = task.parentElement.id;

    if (parent === "pendiente") {
        document.getElementById("progreso").appendChild(task);
    } else if (parent === "progreso") {
        document.getElementById("completado").appendChild(task);
    } else {
        task.remove(); // eliminar si ya está completada
    }
}