let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = function () {
  renderTasks();
};

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById("taskText").value.trim();
  const time = document.getElementById("taskTime").value;
  if (text === "") return alert("Enter a task");

  tasks.push({ text, time, completed: false });
  saveTasks();
  renderTasks();

  document.getElementById("taskText").value = "";
  document.getElementById("taskTime").value = "";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit Task", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleComplete(${index})">
        ${task.text} <br><small>${task.time}</small>
      </span>
      <button onclick="editTask(${index})">✏️</button>
      <button onclick="deleteTask(${index})">❌</button>
    `;
    taskList.appendChild(li);
  });
}