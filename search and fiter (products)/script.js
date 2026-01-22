const products = [
  { id: 1, name: "Apple iPhone 14", category: "Mobile", price: 70000 },
  { id: 2, name: "Samsung Galaxy S23", category: "Mobile", price: 75000 },
  { id: 3, name: "HP Laptop", category: "Laptop", price: 60000 },
  { id: 4, name: "Dell Monitor", category: "Monitor", price: 15000 },
  { id: 5, name: "Boat Headphones", category: "Accessories", price: 2000 },
  { id: 1, name: "Apple iPhone 15", category: "Mobile", price: 80000 },
  { id: 2, name: "Samsung Galaxy S25", category: "Mobile", price: 73000 },
  { id: 3, name: "HPs Laptop", category: "Laptop", price: 59000 },
  { id: 4, name: "Delll Monitor", category: "Monitor", price: 15000 },
  { id: 5, name: "mj Headphones", category: "Accessories", price: 12000 }
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

const debouncedApplyFilters = debounce(applyFilters, 400);

searchInput.addEventListener("input", () => {
  const value = searchInput.value.trim();


// case1 : empty input -> reset immediately
if(value === ""){
  applyFilters();
  return;
}

//Case 2: first -> immediate search
if(value.length === 1){
  applyFilters();
  return;
}

//case 3: user is typing -> debounce
debouncedApplyFilters();
});

//const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const resetBtn = document.getElementById("resetBtn");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const filterSummary = document.getElementById("filterSummary");


function showFilterSummary(search, category , sort, min , max){
  let summary = [];

  if (search) summary.push(`Search: "${search}`);
  if(category) summary.push(`Category: ${category}`);
  if(min) summary.push(`Min ₹${min}`);
  if(max) summary.push(`Max ₹${max}`);
  if (sort === "low-high") summary.push("Sorted: Low-> High");
  if(sort === "high-low") summary.push("Sorted: High -> Low");

  filterSummary.textContent = 
      summary.length > 0 ? `Filters -> ${summary.join(" | ")}` : "";
}
function getFilteredProducts(products, searchText, category, sortType, minPrice, maxPrice) {
  let result = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory =
      category === "" || product.category === category;

    const matchesMinPrice =
      minPrice === "" || product.price >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" || product.price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  if (sortType === "low-high") {
    return [...result].sort((a, b) => a.price - b.price);
  }

  if (sortType === "high-low") {
    return [...result].sort((a, b) => b.price - a.price);
  }

  return result;
}

function applyFilters() {
  const searchText = searchInput.value;
  const category = categoryFilter.value;
  const sortType = sortFilter.value;
  const minPrice = minPriceInput.value;
  const maxPrice = maxPriceInput.value;

  const filteredProducts = getFilteredProducts(
    products,
    searchText,
    category,
    sortType,
    minPrice,
    maxPrice
  );

  renderProducts(filteredProducts);
  showFilterSummary(searchText, category, sortType, minPrice, maxPrice);
}

function debounce(fn, delay){
  let timer;

  return function (...args){
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}



searchInput.addEventListener("input" , applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);
minPriceInput.addEventListener("input", applyFilters);
maxPriceInput.addEventListener("input", applyFilters);

resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "";
    sortFilter.value = "";
    maxPriceInput.value="";
    minPriceInput.value = "";
    applyFilters();
    
});