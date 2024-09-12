function detectCommand(event) {
    event.preventDefault();

    var input = taskBar.value.trim();
    var command = input.split(" ")[0].toLowerCase();
    var args = input.substring(command.length + 1);
    taskBar.value = "";
    helpOverlay.style.color = "rgb(0, 255, 0)";

    if (command == "help") {
        helpOverlay.style.display = "block";
        helpOverlay.innerHTML = `<p>
                                    <strong>touch [task]</strong><br />
                                        &emsp;Create new task<br />
                                    <strong>rm [task]</strong><br />
                                        &emsp;Remove first task of name
                                </p> `;
    } else if (command == "touch" && args) {
        if (args.slice(0, 1) == "-") {
            if (args.slice(0, 6) == "--help") {
                helpOverlay.style.display = "block";
                helpOverlay.innerHTML = `<p>Usage:<br />
                                            <strong>touch [task]</strong>&emsp;&emsp;Create new task<br />
                                        </p> `;
            } else {
                helpOverlay.innerHTML = `<p>Unknown flag: ${args.split(" ")[0]}</p>`;
                helpOverlay.style.color = "rgb(255, 0, 0)";
                helpOverlay.style.display = "block";
            }
        } else {
            addTask(args);
        }
    } else if (command == "rm" && args) {
        console.log(args);
        if (args.slice(0, 1) == "-") {
            if (args.slice(0, 6) == "--help") {
                helpOverlay.style.display = "block";
                helpOverlay.innerHTML = `<p>Usage:<br />
                                            <strong>rm [task]</strong>&emsp;&emsp;Remove first instance of task<br />
                                            <strong>rm [-i] index</strong>&emsp;&emsp;Remove task at index
                                        </p> `;
            } else if (args.slice(0, 2) == "-i") {
                removeTask(args.slice(3), "index");
            } else {
                helpOverlay.innerHTML = `<p>Unknown flag: ${args.split(" ")[0]}</p>`;
                helpOverlay.style.color = "rgb(255, 0, 0)";
                helpOverlay.style.display = "block";
            }
        } else {
            removeTask(args, null);
        }
    } else if (command == "rm" || command == "touch") {
        helpOverlay.style.display = "block";
        helpOverlay.innerHTML = `<p>
                                    ${command}: missing task<br />
                                    Try '${command} --help' for more information
                                </p>`;
    } else {
        helpOverlay.style.display = "block";
        helpOverlay.innerHTML = `<p>Enter '<strong>help</strong>' to start</p>`;
    }
    return;
}

function removeTask(task, flag) {
    const allTasks = document.getElementsByTagName("li");
    helpOverlay.style.color = "rgb(255, 0, 0)";

    if (!flag) {
        for (let taskIndex = 0; taskIndex < allTasks.length; taskIndex++) {
            if (allTasks[taskIndex].childNodes[2].textContent == task) {
                allTasks[taskIndex].childNodes[1].click();
                task = "";
                break;
            }
        }

        if (task) {
            helpOverlay.innerHTML = `<p>
                                    rm: no task '${task}' found<br />
                                    Try 'rm --help' for more information
                                </p>`;
            helpOverlay.style.display = "block";
        }
    } else if (flag == "index") {
        for (let taskIndex = 0; taskIndex < allTasks.length; taskIndex++) {
            if (taskIndex == Number(task) - 1) {
                allTasks[taskIndex].childNodes[1].click();
                task = "";
                break;
            }
        }

        if (task) {
            helpOverlay.style.display = "block";
            helpOverlay.innerHTML = `<p>rm: index '${task}' out of range<br />
                                        Try 'rm --help' for more information
                                    </p> `;
        }
    }
}

function addTask(input) {
    const newItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const newTask = document.createElement("p");
    const removeButton = document.createElement("button");
    const lineBreak = document.createElement("hr");

    newTask.innerText = input;

    addButtonFunc(checkBox, newItem, newTask, removeButton);
    newItem.appendChild(lineBreak);

    newTask.className = "undone";
    newItem.dataset.index = ++taskNum;

    toDo.appendChild(newItem);

    localStorage.setItem(taskNum, [newTask.className, newTask.innerText]);
    localStorage.setItem("size", taskNum);
}

function addButtonFunc(checkBox, newItem, task, removeButton) {
    newItem.append(checkBox, removeButton, task);

    removeButton.innerText = "✖";
    removeButton.className = "removeTask";
    removeButton.addEventListener("click", clearTask);

    newItem.addEventListener("mouseover", () => {
        removeButton.style.display = "block";
    });

    newItem.addEventListener("mouseleave", () => {
        removeButton.style.display = "none";
    });

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
    toDo.removeChild(removedTask);

    const tasks = document.getElementsByTagName("li");
    localStorage.setItem("size", --taskNum);

    for (let i = oldIndex - 1; i < tasks.length; i++) {
        tasks[i].dataset.index = i + 1;
        localStorage.setItem(i + 1, [tasks[i].childNodes[2].className, tasks[i].childNodes[2].textContent]);
    }
    localStorage.removeItem(taskNum + 1);
}

window.onload = function () {
    resizeTaskBar();

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

window.onresize = resizeTaskBar;
function resizeTaskBar() {
    taskBar.style.width = window.innerWidth - curDir.clientWidth - 30 + "px";
}

const toDo = document.getElementById("toDo");
const taskBar = document.getElementById("taskBar");
const curDir = document.getElementById("curDir");
const helpOverlay = document.getElementById("helpOverlay");
var taskNum = 0;

setInterval(() => {
    taskBar.focus();
}, 1);
