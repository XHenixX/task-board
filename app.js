let taskId = 0;

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value;

     if (taskText === "") {
        alert("Escribe una tarea");
        return;
    }
    const task = createTaskElement(text);
    document.getElementById("pendiente").appendChild(task);

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