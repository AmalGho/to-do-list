let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// empty array to store tasks
let arrayOfTasks = [];

// check if there r tasks in local storage
if (localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getFromLocal();


// add task
submit.onclick = function () {
    if (input.value !== ""){
        addTasks(input.value); // add task to array
        input.value = "" ; // empty input feild
    }
};

// click on task element

tasksDiv.addEventListener("click", (e) => {
    // delete btn
    if (e.target.classList.contains("fas")){
        // remove from local storage
        deleteTaskWith (e.target.parentElement.getAttribute("data-id"));
        // remove task from page
        e.target.parentElement.remove();
    }

    //update task to done
    if (e.target.classList.contains("task")){
        // task status
        toggleStatus (e.target.getAttribute("data-id"));
        // toggle done class
        e.target.classList.toggle("done");
    }
})


function addTasks (taskText) {
    // task data
    // object
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };

    arrayOfTasks.push (task);

    // add tasks to page
    addTaskToPage (arrayOfTasks);

    // add tasks to local storage from tasks array.
    addToLocal (arrayOfTasks)
}

function addTaskToPage (arrayOfTasks) {

    // empty tasks div
    tasksDiv.innerHTML = "";
    
    // looping on array of tasks
    arrayOfTasks.forEach( (task) => {

        // create main div
        let div = document.createElement("div");
        div.className = "task";

        // check if task is done
        if (task.completed) {
            div.className = "task done";
        }

        div.setAttribute("data-id", task.id);
        div.appendChild( document.createTextNode(task.title));

        // create delete btn
        let span = document.createElement("span");
        span.className = "fas fa-times";

        // append btn to main div
        div.appendChild(span);

        // add task div to tasks div
        tasksDiv.prepend(div);
    });

    if (tasksDiv.innerHTML === ""){

        let div = document.createElement("div");
        div.className= "empty-tasks";
    
        let img = document.createElement("img");
        img.src = "images/empty-bg.png";
    
        let h2 = document.createElement("h4");
        let text = document.createTextNode("No task ...");
        h2.appendChild(text);
    
        let h3 = document.createElement("h4");
        let text2 = document.createTextNode("Add Your Tasks !");
        h3.appendChild(text2);
    
        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(h3);
    
        tasksDiv.appendChild(div);
    }
}

function addToLocal (arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getFromLocal() {
    let data = window.localStorage.getItem("tasks");
    if (data){
        let task = JSON.parse(data);
        addTaskToPage(task);
    }
}

function deleteTaskWith (taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId );
    addToLocal(arrayOfTasks);
}

function toggleStatus(taskId) {
    for (let i=0 ; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false 
            ? (arrayOfTasks[i].completed = true) 
            : (arrayOfTasks[i].completed = false);
        }
    }
    addToLocal(arrayOfTasks);
}
