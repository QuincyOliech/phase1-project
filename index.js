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