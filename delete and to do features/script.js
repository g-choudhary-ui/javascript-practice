let count = localStorage.getItem("count") 
? Number(localStorage.getItem("count"))
: 0;

//select elements
const countDisplay = document.querySelector("#count");
const incbtn= document.querySelector("#inc");
const decBtn = document.querySelector("#dec")
const resetBtn = document.querySelector("#reset");

//one fuction to rule the UI

function updateUI(){
    countDisplay.innerText = count;

    //disable decerease when count=0
    decBtn.disabled = count === 0;


//change color when count>10
countDisplay.style.color = count > 10 ? "red" : "Black";

//save to local Storage
localStorage.setItem("count", count);

}
incbtn.addEventListener("click", () => {
    count++;
   
    updateUI();
    
});

decBtn.addEventListener("click", () => {
    if(count>0){
    count--;
    updateUI();
    }
});

resetBtn.addEventListener("click", () => {
    count=0;
    // countDisplay.innerText = count;
    updateUI();
});


updateUI();


// //creating list by adding
// const input = document.querySelector("#itemInput");
// const addbtn = document.querySelector("#addbtn");
// const list = document.querySelector("#list");

// let items = localStorage.getItem("items") 
// ? JSON.parse(localStorage.getItem("items")) 
// : [];

// //save to local storage
// function saveItems(){
//     localStorage.setItem("items", JSON.stringify(items));
// }

// //Create one list item

// function renderItem(item, index) {
//     const li = document.createElement("li");

//     const span = document.createElement("span");
//     span.innerText = item.text;

//     if(item.completed) {
//         span.classList.add("completed");
//     }

//     //toggle completed
//     span.addEventListener("click", () => {
//         item.completed =! item.completed;
//         span.classList.toggle("completed");
//         saveItems();
//     });


//     //delete button
//     const delbtn = document.createElement("span");
//     delbtn.innerText = "❌";
//     delbtn.classList.add("delete-btn");

//     delbtn.addEventListener("click", () => {
//         items.splice(index, 1);
//         saveItems();
//         renderList();
//     }) ;

//     li.appendChild(span);
//     li.appendChild(delbtn);
//     list.appendChild(li);
// }


// //Render full list
// function renderList() {
//     list.innerHTML = "";
//     items.forEach((item, index) => renderItem(item, index));
// }


// //Add new item
// function addItem() {
//     const value = inputvalue.trim();
//     if (value === "") return;

//     items.push({text: value, completed: false });
//     saveItems();
//     renderList();

//     input.value = "";
// }


// addbtn.addEventListener("click", addItem);

// input.addEventListener("keydown", (event)=>{
//     if(event.key === "Enter") {
//         addItem();
//     }
// });

// renderList();




///this is code when only dynamic list is created with local
///storage and on clicking on items it get remove and on refresh also data exists


// //create and render one item
// function renderItem(text){
//    const li = document.createElement("li");
//    li.innerText = text;

//    li.addEventListener("click", () =>{
//     items = items.filter(item => item!== text);
//     saveItems();
//     li.remove();
// });

// list.appendChild(li);
// }

// //render all items on page load
// items.forEach(item => renderItem(item));

// //addd new item

// function addItem(){
//     const value = input.value.trim();
//     if(value === "") return;

//     items.push(value);
//     saveItems();
//     renderItem(value);

//     input.value = "";
// }



// // function addItem() {
// //     const value = input.value.trim();
// //     if(value=== "")return;

// //     const li= document.createElement("li");
// //     li.innerText = value;
// //     li.addEventListener("click", () =>{
// //         li.remove();
// //     })
// //     list.appendChild(li);
    
// //}



const input = document.querySelector("#itemInput");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#list");

// Load from localStorage
let items = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];

// Save state
function saveItems() {
    localStorage.setItem("items", JSON.stringify(items));
}

// Create ONE list item
function renderItem(item) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = item.text;

    if (item.completed) {
        span.classList.add("completed");
    }

    // ✅ Toggle completed
    span.addEventListener("click", () => {
        item.completed = !item.completed;
        saveItems();
         span.classList.toggle("completed");
    });

    // ❌ Delete button
    const delBtn = document.createElement("span");
    delBtn.innerText = "❌";
    delBtn.classList.add("delete-btn");

    delBtn.addEventListener("click", () => {
       items = items.filter(i => i.id !== item.id);
        saveItems();
        renderList();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
}

// Render full list
function renderList() {
    list.innerHTML = "";
    items.forEach((item) => renderItem(item));
}

// Add new item
function addItem() {
    const value = input.value.trim();
    if (value === "") return;

    items.push({ 
    id: Date.now(),
    text: value,
    completed: false
 });
    saveItems();
    renderList();

    input.value = "";
}

addBtn.addEventListener("click", addItem);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addItem();
});

// Initial render
renderList();
