//selecting html elements
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")

let itemsarray = JSON.parse(localStorage.getItem("todos"))
itemsarray.forEach(todoString => {
    addTodo(todoString)
});

//add event listeners
todoButton.addEventListener('click', handleAddTodo)
todoList.addEventListener('click', deleteCheck)

//creating functions

function handleAddTodo(event){
    //prevent form from submitting
    event.preventDefault();
    
    const todoString = todoInput.value;
    addTodo(todoString)
    
    itemsarray.push(todoInput.value);
    localStorage.setItem('todos', JSON.stringify(itemsarray));

    //clear todo input value
    todoInput.value ="";
}

function addTodo(todoString){
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //creating li
    const newTodo = document.createElement("li")
    newTodo.innerText =todoString;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //creating checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    //creating trash or delete button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append todoDiv to list
    todoList.appendChild(todoDiv);
 
}

function deleteCheck(e){
    const item = e.target;

    //delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.remove();
        const index = Array.prototype.indexOf.call(todoList.children, todo)
        itemsarray.splice(index, 1)
        console.log(index)
        localStorage.setItem('todos', JSON.stringify(itemsarray));
    }

    //check mark
    if(item.classList[0] === "completed-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}