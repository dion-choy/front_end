function addToList(event) {
    event.preventDefault();
    const newItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const newToDo = document.getElementById("task").value.trim();

    checkBox.type = "checkBox";
    checkBox.addEventListener("click", () => {
        if (newItem.classList[0] == "undone") {
            newItem.className = "done";
        } else if (newItem.classList[0] == "done") {
            newItem.className = "undone";
        }
        localStorage.setItem(newItem.selfNum, [newItem.classList[0], newToDo]);
    });

    newItem.append(checkBox);
    newItem.append(newToDo);
    newItem.className = "undone";
    newItem.selfNum = ++taskNum;

    toDo.appendChild(newItem);

    document.getElementById("task").value = "";

    localStorage.setItem(taskNum, [newItem.classList[0], newToDo]);
    localStorage.setItem("size", taskNum);
}

window.onload = function () {
    if (localStorage.size) {
        taskNum = localStorage.size;
        alert(`${localStorage.size} loading...`);
        for (let i = 1; i <= localStorage.size; i++) {
            task = localStorage.getItem(i).split(",");

            const newItem = document.createElement("li");
            const checkBox = document.createElement("input");
            const newToDo = task[1];

            checkBox.type = "checkBox";
            if (task[0] == "done") {
                checkBox.checked = true;
                newItem.className = "done";
            } else if (task[0] == "undone") {
                checkBox.checked = false;
                newItem.className = "undone";
            }

            checkBox.addEventListener("click", () => {
                if (newItem.classList[0] == "undone") {
                    newItem.className = "done";
                } else if (newItem.classList[0] == "done") {
                    newItem.className = "undone";
                }
                localStorage.setItem(newItem.selfNum, [newItem.classList[0], newToDo]);
            });

            newItem.append(checkBox);
            newItem.append(newToDo);
            newItem.selfNum = i;

            toDo.appendChild(newItem);
        }
    }
};

const toDo = document.getElementById("toDo");
var taskNum = 0;
