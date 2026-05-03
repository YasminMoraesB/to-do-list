const button = document.querySelector('#addButton')
const input = document.querySelector('#taskInput')
const completeList = document.querySelector('#taskList')

let myTaskList = []

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addNewTask()
})

function addNewTask(){
    if(input.value.trim() === ''){
        alert('Por favor, digite uma tarefa!')
        return
    }
    
    myTaskList.push({
        task: input.value,
        completed: false
    })

    input.value = ''
    showTasks()
}

function showTasks(){
    let newLi = ''

    const sortedList = myTaskList.slice().sort((a, b) => a.completed - b.completed)

    sortedList.forEach((item, position) => {
        const originalIndex = myTaskList.indexOf(item)
        newLi = newLi + `
            <li class="${item.completed ? "done" : ""}">
                <span>${item.task}</span>
                <div class="task-icons">
                    <img src="/imgs/icons8-estrela-16.png" alt="Feito" onclick="taskCompleted(${originalIndex})">
                    <img src="/imgs/icons8-remover-67.png" alt="Lixo" onclick="deleteItem(${originalIndex})">
                </div>
            </li>
        `
    })

    completeList.innerHTML = newLi
    localStorage.setItem('list', JSON.stringify(myTaskList))
}

function deleteItem(position){
    myTaskList.splice(position, 1)
    showTasks()
}

function taskCompleted(position){
    myTaskList[position].completed = !myTaskList[position].completed
    showTasks()
}

function reloadTasks(){
    const taskLocalStorage = localStorage.getItem('list')
    if(taskLocalStorage){
        myTaskList = JSON.parse(taskLocalStorage)
    }
    showTasks()
}

reloadTasks()
button.addEventListener('click', addNewTask)