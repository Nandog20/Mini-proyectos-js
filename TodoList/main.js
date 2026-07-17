const form = document.getElementById("task-form")
const taskInput = document.getElementById("task-input")
const taskDisplay = document.getElementById("task-board")

const tasks = []

//submit
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const task = taskInput.value
    if(task){
        tasks.push(task)
        taskInput.value = ""
        taskDisplay.append(createLi(task))
    }
})

//create buttons
const createBtn = (className, icon) =>{
    const btn = document.createElement("button")
    btn.textContent = icon
    btn.classList.add(className)
    return btn
}
//create html element
const createLi = (task) =>{
    const li = document.createElement("li")
    li.textContent = task
    li.append(createBtn("delete-btn", "❌"),createBtn("edit-btn","✏️"))
    return li
}

//listen to btns
taskDisplay.addEventListener("click",(event)=>{
    console.log(event.target.classList)
    if(event.target.classList.contains("edit-btn")){
        editTask(event)
    }
    else if(event.target.classList.contains("delete-btn")){
        removeTask(event)
    }
})
//edit task
const editTask = (event)=>{
    const parentLi = event.target.closest("li")
    console.log(parentLi)
    const newTask = prompt("Modifica la tarea")
    if(newTask !== null){
        parentLi.firstChild.textContent = newTask
    }
}
//remove task
const removeTask = (event) =>{
    const li = event.target.closest("li")
    if(confirm("¿Estas seguro de eliminar la tarea?")){
        li.remove()
    }
}