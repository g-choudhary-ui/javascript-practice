let todos = [];
let currentFilter = "all";

function loadTodos() {
  const storedTodos = localStorage.getItem("todos");
  todos = storedTodos ? JSON.parse(storedTodos) : [] ;
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

 const visibleTodos = getFilteredTodos();

   if (visibleTodos.length === 0) {
    showEmptyMessage(list);
    return;
   }
   visibleTodos.forEach(todo => {
    const todoItem = createTodoElement(todo);
    list.appendChild(todoItem);
   });


  //  visibleTodos.forEach(todo  => {
  //   const li = document.createElement("li");
  //   li.textContent = todo.text;

  //   if (todo.completed) {
  //     li.classList.add("completed");
  //   }

  //   // toggle complete
  //   li.addEventListener("click", () => {
  //     toggleTodo(todo.id);
  //   });

  //   // EDIT button
  //   const editBtn = document.createElement("button");
  //   editBtn.textContent = "✏️";
  //   editBtn.addEventListener("click", (e) => {
  //     e.stopPropagation();
  //     editTodo(todo.id);
  //   });

  //   // DELETE button
  //   const delBtn = document.createElement("button");
  //   delBtn.textContent = "❌";
  //   delBtn.addEventListener("click", (e) => {
  //     e.stopPropagation();
  //     deleteTodo(todo.id);
  //   });

  //   li.appendChild(editBtn);
  //   li.appendChild(delBtn);
  //   list.appendChild(li);
  // });
}


// Filtering is applied only for rendering
// original todos array is never mutated
function getFilteredTodos() {
 
  if(currentFilter === "completed") {
    return todos.filter(todo => todo.completed);
  } else if(currentFilter === "pending") {
    return todos.filter(todo => !todo.completed);
  } else {
    return todos;
  }
}


function addTodo(text) {
  const trimmedText = text.trim();

  //empty or spaces
  if(trimmedText ==="") return;

  //duplicate check(case-insensitive)
  const isDuplicate = todos.some(
    todo => todo.text.toLowerCase() === trimmedText.toLowerCase()
  );

  if(isDuplicate) {
    return;
  }


  const todo = {
    id: Date.now(),
    text: trimmedText,
    completed: false
  };

  todos.push(todo);
  saveTodos();
  renderTodos();
}

function createTodoElement(todo) {
  const li = document.createElement("li");
  li.textContent = todo.text;

  if (todo.completed) {
    li.classList.add("completed");
  }

  li.addEventListener("click", () => toggleTodo(todo.id));
// edit
  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    editTodo(todo.id);
  });

  // delete
  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteTodo(todo.id);
  });

  li.append(editBtn, delBtn);
  return li;

  
}



function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  );

  saveTodos();
  renderTodos();
}

// Add button
document.getElementById("addBtn").addEventListener("click", () => {
  const input = document.getElementById("todoInput");
  const addBtn = document.getElementById("addBtn");

  input.addEventListener("input" , () => {
    addBtn.disabled = input.value.trim() === "";
  });

 addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;

  addTodo(text);
  input.value = "";
  addBtn.disabled = true; // reset state
  input.focus();
});

});

// Enter key
document.getElementById("todoInput").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    document.getElementById("addBtn").click();
  }
});

//filter button
document.querySelector(".filters").addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  filterType = e.target.dataset.filter;
  renderTodos();
});


function showEmptyMessage(list) {
  const msg = document.createElement("p");
  msg.textContent = "No tasks yet. Add one 👆";
  msg.style.textAlign = "center";
  list.appendChild(msg);
}


// function to edit using index

// function editTodo(index){
//     const newText = prompt("Edit your Task:", todos[index].text);

//     if(newText === null) return;
//     if (newText.trim() === "") return;

//     todos[index].text  =newText.trim();
//     saveTodos();
//     renderTodos();
// }


function editTodo(id) {
    const todo = todos.find(t => t.id === id);

    if(!todo) return;

    const newText = prompt("Edit your tsak:", todo.text);

    if(newText ===null) return;
    if (newText.trim() === "") return;

    todo.text = newText.trim();
    saveTodos();
    renderTodos();
}
// Init
loadTodos();
renderTodos(); 