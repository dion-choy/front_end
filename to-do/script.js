function addToList(event) {
    event.preventDefault();
    const newItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const newTask = document.createElement("p");
    const removeButton = document.createElement("button");
    const lineBreak = document.createElement("hr");

    newTask.innerText = document.getElementById("task").value.trim();

    addButtonFunc(checkBox, newItem, newTask, removeButton);
    newItem.appendChild(lineBreak);

    newTask.className = "undone";
    newItem.dataset.index = ++taskNum;

    toDo.appendChild(newItem);

    document.getElementById("task").value = "";

    localStorage.setItem(taskNum, [newTask.className, newTask.innerText]);
    localStorage.setItem("size", taskNum);
}

function addButtonFunc(checkBox, newItem, task, removeButton) {
    newItem.append(checkBox, removeButton, task);

    removeButton.innerText = "✖";
    removeButton.className = "removeTask";
    removeButton.addEventListener("click", clearTask);

    checkBox.type = "checkBox";
    checkBox.addEventListener("click", () => {
        task.className = task.className == "undone" ? "done" : "undone";
        localStorage.setItem(newItem.dataset.index, [task.className, task.innerText]);
    });
}

function clearTask() {
    const removedTask = this.parentElement;
    const oldIndex = removedTask.dataset.index;
    localStorage.removeItem(removedTask.dataset.index);
    toDo.removeChild(this.parentElement);

    const tasks = document.getElementsByTagName("li");
    localStorage.setItem("size", --taskNum);

    for (let i = oldIndex - 1; i < tasks.length; i++) {
        tasks[i].dataset.index = i + 1;
        localStorage.setItem(i + 1, [tasks[i].childNodes[2].className, tasks[i].childNodes[2].textContent]);
    }
    localStorage.removeItem(taskNum + 1);
}

window.onload = function () {
    if (localStorage.size) {
        taskNum = localStorage.size;
        for (let i = 1; i <= taskNum; i++) {
            task = localStorage.getItem(i).split(",");

            const newItem = document.createElement("li");
            const checkBox = document.createElement("input");
            const loadedTask = document.createElement("p");
            loadedTask.innerText = task[1];
            const removeButton = document.createElement("button");
            const lineBreak = document.createElement("hr");

            checkBox.type = "checkBox";
            loadedTask.className = task[0];
            checkBox.checked = task[0] == "done";

            addButtonFunc(checkBox, newItem, loadedTask, removeButton);
            newItem.appendChild(lineBreak);

            newItem.dataset.index = i;

            toDo.appendChild(newItem);
        }
    }
};

const toDo = document.getElementById("toDo");
var taskNum = 0;
