function addToList(event) {
    event.preventDefault();
    const newItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const newToDo = document.getElementById("task").value.trim();
    const removeButton = document.createElement("button");

    addButtonFunc(checkBox, newItem, newToDo, removeButton);

    newItem.className = "undone";
    newItem.dataset.index = ++taskNum;

    toDo.appendChild(newItem);

    document.getElementById("task").value = "";

    localStorage.setItem(taskNum, [newItem.className, newToDo]);
    localStorage.setItem("size", taskNum);
}

function addButtonFunc(checkBox, newItem, newToDo, removeButton) {
    newItem.append(checkBox, newToDo, removeButton);

    removeButton.innerText = "✖";
    removeButton.className = "removeTask";
    removeButton.addEventListener("click", clearTask);

    checkBox.type = "checkBox";
    checkBox.addEventListener("click", () => {
        newItem.className = newItem.className == "undone" ? "done" : "undone";
        localStorage.setItem(newItem.dataset.index, [newItem.className, newToDo]);
    });
}

function clearTask() {
    const removedTask = this.parentElement;
    localStorage.removeItem(removedTask.dataset.index);
    toDo.removeChild(this.parentElement);

    const tasks = document.getElementsByTagName("li");
    localStorage.clear();
    localStorage.setItem("size", --taskNum);

    for (let i = 0; i < tasks.length; i++) {
        tasks[i].dataset.index = i + 1;
        localStorage.setItem(i + 1, [tasks[i].className, tasks[i].childNodes[1].textContent]);
    }
}

window.onload = function () {
    if (localStorage.size) {
        taskNum = localStorage.size;
        for (let i = 1; i <= taskNum; i++) {
            task = localStorage.getItem(i).split(",");

            const newItem = document.createElement("li");
            const checkBox = document.createElement("input");
            const newToDo = task[1];
            const removeButton = document.createElement("button");

            checkBox.type = "checkBox";
            newItem.className = task[0];
            checkBox.checked = task[0] == "done";

            addButtonFunc(checkBox, newItem, newToDo, removeButton);

            newItem.dataset.index = i;

            toDo.appendChild(newItem);
        }
    }
};

const toDo = document.getElementById("toDo");
var taskNum = 0;
