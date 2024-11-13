const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
let editTodo = null

//add function to add
const addtoDo = () => {
   const inputText = inputBox.value.trim(); //accessing the current value
   if(inputText.length <= 0){
    alert("please enter some text")
    return false ;
   }
   
   if(addBtn.value === "Edit"){
    editTodo.target.previousElementSibling.innerHTML = inputText;
    editLocalTodos(inputText);  //for accees in local storage
    addBtn.value = "Add";
    inputBox.value = "";
   }
   else{
   //creating p button
   const li  = document.createElement("li") ;  //dom manipulation
   const p  = document.createElement("p") ; 
   p.innerHTML = inputText
   li.appendChild(p);            // p becomes append child of p
   

  
   
   //creating edit button
   const editBtn = document.createElement("button");
   editBtn.innerHTML = "Edit"
   editBtn.classList.add("btn" , "editBtn")
   li.appendChild(editBtn)

   //creating delete button
   const deleteBtn = document.createElement("button");
   deleteBtn.innerHTML = "Remove";
   deleteBtn.classList.add("btn" , "deleteBtn");
   li.appendChild(deleteBtn);

   todoList.appendChild(li) ;       // todoList is  ul class  
   inputBox.value = "" ;
   saveLocalTodos(inputText);
   }
}

// add functionality to update (remove/EDIT)
const updateTodo = (e) => {
    if(e.target.innerHTML === "Remove"){
todoList.removeChild(e.target.parentElement);
deleteLocalTodos(e.target.parentElement); //LOCAL storage delete
    }
    if(e.target.innerHTML === "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML;    //{ these 3 are siblings remove , edit and task2(entered text)} - parent element is li
        //console.log(e.target.innerhtml);
        //we have to remove parent element i.e 
        
        // add functionality to remove
        inputBox.focus();
        addBtn.value="Edit";
        editTodo = e;  // e will pass to the "add to do "
           }

}
// function to save local todo (in local storage)
const saveLocalTodos = (todo) =>{
    let todos = [];
    if(localStorage.getItem("todos")=== null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    // todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo); 
    localStorage.setItem("todos" , JSON.stringify(todos))
    // console.log(todos);
              }
// Function to get local todos (refresh)
const getLocalTodos = () =>{
    let todos = [];
    if(localStorage.getItem("todos")=== null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
           //creating p button
   const li  = document.createElement("li") ;  //dom manipulation
   const p  = document.createElement("p") ; 
   p.innerHTML = todo;
   li.appendChild(p);            // p becomes append child of p
   


   //creating edit button
   const editBtn = document.createElement("button");
   editBtn.innerHTML = "Edit"
   editBtn.classList.add("btn" , "editBtn")
   li.appendChild(editBtn)

   //creating delete button
   const deleteBtn = document.createElement("button");
   deleteBtn.innerHTML = "Remove";
   deleteBtn.classList.add("btn" , "deleteBtn");
   li.appendChild(deleteBtn);

   todoList.appendChild(li) ; 
        });
    }
}
//function to delet todos from local storage 
// here we go to update yo do function to get access (target.element)
const deleteLocalTodos = (todo) =>{
    let todos = [];
    if(localStorage.getItem("todos")=== null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex , 1);
    localStorage.setItem("todos" , JSON.stringify(todos));
    //array function slice/splice
    console.log(todoIndex);

} 

//add function line 16 we get access
const editLocalTodos = (todo) =>{
let todos = JSON.parse(localStorage.getItem("todos"));
let todoIndex = todos.indexOf(todo);
todos[todoIndex] = inputBox.value;
localStorage.setItem("todos" , JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded' , getLocalTodos);
addBtn.addEventListener('click' , addtoDo);
todoList.addEventListener('click' , updateTodo);