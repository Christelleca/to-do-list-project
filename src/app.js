let taskList = document.getElementById("taskList");

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskText) => {
        addTaskElement(taskText);
    });
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach((task) => {
        tasks.push(task.firstChild.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value;

    if (taskText == "") {
        return;
    }

    addTaskElement(taskText);
    saveTasks();
    taskInput.value = "";
}

function addTaskElement(taskText) {
    let li = document.createElement("li");
    li.innerHTML = taskText;

    let editButton = document.createElement("button");
    editButton.innerHTML =
        '<ion-icon name="pencil-outline" class="modify"></ion-icon>';
    editButton.onclick = function () {
        editTask(li);
    };

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML =
        '<ion-icon name="trash-outline" class="delete"></ion-icon>';
    deleteButton.onclick = function () {
        deleteTask(li);
    };

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function editTask(task) {
    let taskTextElement = task.firstChild;
    let taskText = taskTextElement.textContent;

    let newTaskText = prompt("Modifier la tâche:", taskText);

    if (newTaskText === null || newTaskText === "") {
        return;
    }

    taskTextElement.textContent = newTaskText;
    saveTasks();
}

function deleteTask(task) {
    task.classList.add("remove-animation");
    setTimeout(() => {
        taskList.removeChild(task);
        saveTasks();
    }, 500); // Correspond à la durée de l'animation `fadeOut`
}

// Charger les tâches au démarrage
loadTasks();
