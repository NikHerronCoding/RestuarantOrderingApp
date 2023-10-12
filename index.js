import {Item} from './item.js'
import {menuArray} from './data.js'

//variable that represents the user ordered items
let shoppingCart = []

const modal = document.getElementById('order-modal');
const thanksButton = document.getElementById('thanks-button');

//function iterates over the menuArray to populate a feed of items to purchase
function generateFeed(){
    let feed = document.getElementById('feed')
    let feedHtml = menuArray.map(item => {
        let newItem = new Item(item)
        return newItem.createHTML();
    }).join('');
    feed.innerHTML = feedHtml
}

//function iterates through the array and adds up the prices of the items in the cart
function determineTotalPrice() {
    return shoppingCart.reduce((total, item)=> {
        return item.price + total;
    }, 0);   
}

//function to remove the item from the shopping cart using the splice function
function removeItem(itemId) {

    for (let i = 0; i < shoppingCart.length; i++){


        if (itemId.includes(shoppingCart[i].name)) {
            //removes first instance of item, then exits loop

            shoppingCart = shoppingCart.slice(0, i).concat(shoppingCart.slice(i+1));
            break;
        }
    }
}

function handleOrder() {

    if (modal.classList.contains('modal-close')) {
        modal.classList.replace('modal-close', 'modal-open')
    } 

}

function handleSubmit() {
    let form = document.getElementById('modal-form');
    let formData = new FormData(form)

    let name = formData.get('name')
    let cardNumber = formData.get('card-number')
    let cvv = formData.get('cvv')

    modal.classList.replace('modal-open', 'modal-close')

    shoppingCart = [];

    thanksButton.innerHTML = `<button id="thanks">Thanks, ${name}! Your order is on its way!</button>`

}


function generateOrderDetails() {

    let orderArea = document.getElementById('order-summary')
    orderArea.innerHTML = '';

    if (shoppingCart.length > 0) {
        
        let orderHtml = `
            <h2 class="order-title">Your Order</h2>
            
            <div id="order-items">
            `
    
    
          //iterating through all items in order  
        orderHtml += shoppingCart.map((item)=>{
            return `
            <div class="order-item">
                <div>
                    <span class="order-item-name">${item.name}</span> <span class="order-item-remove" id="remove-${item.name}">remove</span>
                </div>
                    
                <span class="order-item-price">$${item.price}</span>
            </div>
            `
        }).join('')
    
        //closing order-items div
        orderHtml += `</div>`
        let totalPrice = determineTotalPrice();
    
        //adding total price component
        orderHtml += `<div class="order-total">
                        <span>Total Price:</span> <span>$${totalPrice}</span>
                     </div>`
    
    
        //adding complete order button
        orderHtml += 
        
        `
        <button class="order-button" id="complete-order">
            Complete Order
        </button>
        `
    
        orderArea.innerHTML = orderHtml; 

    }
    //adding order summary information

}

function removeOrderDetails(){
    document.getElementById('order-items').innerHTML = '';
}
// function handles a click for anywhere on the screen
function handleClick(event) {

        let name = event.target.id

        if (menuArray.filter(item => item.name.toLowerCase() === name).length > 0) {
            shoppingCart.push(menuArray.filter((item)=>{
                return item.name.toLowerCase() === name
            })[0])
            
        } else if (name.includes('remove')) {
            removeItem(name)
            
        } else if (name.includes('complete-order')) {
            handleOrder();
            
        } else if (name.includes('order-submit')) {
            event.preventDefault();
            handleSubmit();
        }

        generateOrderDetails();
        
}

function main() {
    generateFeed()
    document.addEventListener('click', (e)=> handleClick(e))
}

main();