const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDisplay = document.getElementById('task-board');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//local storage
const saveToLocaleStorage = () =>{
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (taskInput.value) {
    const task = {
      task: taskInput.value.trim(),
      id: Date.now(),
      completed: false,
    };
    tasks.push(task);
    taskInput.value = '';
    taskDisplay.append(createDiv(task));
    saveToLocaleStorage()
  }
});

//create buttons
const createBtn = (className, icon) => {
  const btn = document.createElement('button');
  btn.textContent = icon;
  btn.classList.add(className);
  return btn;
};

//create html element
const createDiv = ({ task, id, completed }) => {
  const div = document.createElement('div');
  div.id = id
  if (completed) {
    div.classList.add('completed');
  } else {
    div.classList.add('pending');
  }
  const span = document.createElement('span');
  span.textContent = task;
  div.append(
    span,
    createBtn('status-btn', '✅'),
    createBtn('edit-btn', '✏️'),
    createBtn('delete-btn', '❌'),
  );
  return div;
};

//listen to btns
taskDisplay.addEventListener('click', (event) => {

  if (event.target.classList.contains('edit-btn')) {
    editTask(event);
  } else if (event.target.classList.contains('delete-btn')) {
    removeTask(event);
  } else if (event.target.classList.contains('status-btn')) {
    statusTaskChange(event)
  }
});

//edit task
const editTask = (event) => {

  const parent = event.target.closest('div');
  const newTask = prompt('Modifica la tarea');
  const parentId = Number(parent.id)

  if (newTask !== null && newTask.trim() !== '') {
    const updatedTasks = tasks.map((task)=> task.id == parentId ? {...task, task: newTask}: task)
    tasks = updatedTasks
    const span = parent.querySelector("span")
    span.textContent = newTask
    saveToLocaleStorage()
  }
};
//remove task
const removeTask = (event) => {
  const div = event.target.closest('div');
  if (confirm('¿Estas seguro de eliminar la tarea?')) {
    const updatedTasks = tasks.filter((task) => task.id !== Number(div.id))
    tasks = updatedTasks
    div.remove();
    saveToLocaleStorage()
  }
};

//change status task

const statusTaskChange = (event) => {
  const div = event.target.closest('div');
  const id = Number(div.id);

  const currentTask = tasks.find((task) => task.id === id);
  if (!currentTask) return; 

  const newStatus = !currentTask.completed;

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: newStatus } : task
  );

  div.classList.toggle('completed', newStatus);
  div.classList.toggle('pending', !newStatus);
  saveToLocaleStorage()
};

tasks.forEach(task => {
  taskDisplay.append(createDiv(task))
});
