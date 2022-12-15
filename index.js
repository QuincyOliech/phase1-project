// declaring variables
const menu = document.getElementById('mobileMenu');
const menuLinks = document.querySelector('.navbarMenu')
const dividedList = document.querySelector("#products");
const productImage = document.querySelector("#picture");
const brandName = document.querySelector("#brand");
const itemDescription = document.querySelector("#description");
const productPrice = document.querySelector("#price");
const productPhoto = document.querySelector("#photo");
const productNumber=document.querySelector('#product-num')
const purchaseButton = document.querySelector("#buy-item");
const searchBar = document.querySelector('#searchbar');
let id=0
let totalNumberOfItemsSold=0

//adding event listener to the DOM
document.addEventListener("DOMContentLoaded", (e) => {
    displayData();
    menu.addEventListener('click',(e)=>{
          menu.classList.toggle('isActive')
          menuLinks.classList.toggle('active')
      })
    purchaseButton.addEventListener("click", (e) => {
      
      fetchId(id).then((data) => {
          totalNumberOfItemsSold=data.itemsSold + 1
          productNumber.textContent = data.totalItems - totalNumberOfItemsSold;
        fetch(`https://linet-db-production.up.railway.app/products/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
             itemsSold: totalNumberOfItemsSold,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      });
    });
  });

  //creating list element and returning the text content of the specified node
function createList(products) {
    let newList = document.createElement("li");
    newList.textContent = products.brand;
    newList.className = "productItem";
    newList.addEventListener("click", (e) => {
      productImage.setAttribute("src", products.picture);
      brandName.textContent = products.brand;
      itemDescription.textContent = products.description;
      productPrice.textContent = products.price;
      productNumber.textContent = products.totalItems - products.itemsSold;
      id=products.id
      
    });
    dividedList.appendChild(newList);
  }

  // adding keyup event
document.addEventListener('keyup',(e)=>{
    function searchProducts() {
      let input = searchBar.value
      input=input.toLowerCase();
      let x = document.getElementsByClassName('productItem');
        
      for (i = 0; i < x.length; i++) { 
          if (!x[i].innerHTML.toLowerCase().includes(input)) {
              x[i].style.display="none";
          }
          else {
              x[i].style.display="list-item";                 
          }
      }
    }
  })
  
  //fetching product data from json file
function fetchProducts() {
    return fetch("https://linet-db-production.up.railway.app/products")
      .then((response) => response.json())
      .then((data) => data);
  }