document.addEventListener("DOMContentLoaded", () => {
  const storedData = JSON.parse(localStorage.getItem("tasks"));
  if (storedData) {
    storedData.forEach((task) => tasks.push(task));
    updatedList();
    updateStats();
  }
});

let tasks = [];

const saveData = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const createListItem = () => {
  const taskInput = document.getElementById("taskInput");
  const textValue = taskInput.value.trim();

  if (textValue) {
    tasks.push({ text: textValue, completed: false });
    taskInput.value = "";
    updatedList();
    updateStats();
    saveData();
  }
};

const toggleTaskCompleted = (index) => {
  tasks[index].completed = !tasks[index].completed;
  //   console.log({ tasks });
  updatedList();
  updateStats();
  saveData();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updatedList();
  updateStats();
  saveData();
};

const editTask = (index) => {
  const updatedTask = document.getElementById("taskInput");
  taskInput.value = tasks[index].textValue;
  tasks.splice(index, 1);
  updatedList();
  updateStats();
  saveData();
};

const updatedList = () => {
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox ${
            task.completed ? "checked" : ""
          }" ${task.completed ? "checked" : ""} />
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="./img/edit.png" alt="edit button" onclick="editTask(${index})"/>
          <img src="./img/delete.png" alt="delete button" onclick="deleteTask(${index})"/>
        </div>
      </div>
    `;
    listItem
      .querySelector(".checkbox")
      .addEventListener("change", () => toggleTaskCompleted(index));
    taskList.append(listItem);
  });
};

const updateStats = () => {
  const completeTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (completeTasks / totalTasks) * 100;
  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;

  document.getElementById(
    "numbers"
  ).innerText = `${completeTasks} / ${totalTasks}`;

  if (tasks.length && completeTasks === totalTasks) {
    blaskConfetti();
  }
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  createListItem();
});

/* Animation */
const blaskConfetti = () => {
  const end = Date.now() + 15 * 1000;

  // go Buckeyes!
  const colors = ["#bb0000", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });

    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
