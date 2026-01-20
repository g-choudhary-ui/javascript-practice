const products = [
  { id: 1, name: "Apple iPhone 14", category: "Mobile", price: 70000 },
  { id: 2, name: "Samsung Galaxy S23", category: "Mobile", price: 75000 },
  { id: 3, name: "HP Laptop", category: "Laptop", price: 60000 },
  { id: 4, name: "Dell Monitor", category: "Monitor", price: 15000 },
  { id: 5, name: "Boat Headphones", category: "Accessories", price: 2000 }
];


const productContainer = document.getElementById("productContainer");

function renderProducts(list){
    productContainer.innerHTML="";

    if(list.length === 0){
        productContainer.innerHTML = "<p>NO products found </p>";
        return;
    }

    list.forEach(product => {
        const div =document.createElement("div");

        div.innerHTML = `
        <h3>${product.name}</h3>
        <p> Category: ${product.category}</p>
        <p> Price: ${product.price}</p>
        `;

        productContainer.appendChild(div);
    });
}

renderProducts(products);

//search logic
const searchInput = document.getElementById("searchInput");

// searchInput.addEventListener("input", function () {
//     const searchtext = searchInput.value.toLowerCase();

//     const filteredproducts = products.filter(product =>
//         product.name.toLowerCase().includes(searchtext)
//     );

//     renderProducts(filteredproducts);
// });

//const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const resetBtn = document.getElementById("resetBtn");

function applyFilters() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const sortValue = sortFilter.value;

    let filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchText);
        const matchesCategory = 
             selectedCategory === ""|| product.category === selectedCategory;
             //above liines means that if no category is selected -> allow
             // all , otherwise -> category must match

             return matchesSearch && matchesCategory;
    });


    //Sorting (immutable)
    if(sortValue === "low-high"){
        filtered = [...filtered].sort((a,b) => a.price - b.price);
    } else if (sortValue === "high-low") {
        filtered = [...filtered].sort((a,b) => b.price - a.price);
    }

    renderProducts(filtered);
}


searchInput.addEventListener("input" , applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);


resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "";
    sortFilter.value = "";
    renderProducts(products);
});