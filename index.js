
let money = 100;

const items = [
    { name: "Spooky Candle", price: 15, img: "spooky_candle.jpg" },
    { name: "Pumpkin Lantern", price: 30, img: "pumpkin_lantern.webp" },
    { name: "Witch Hat", price: 28, img: "witch_hat.jpg" },
    { name: "Skeleton Costume", price: 50, img: "skeleton_costume.webp" },
    { name: "Ghost Lights", price: 32, img: "ghost_lights.webp" },
    { name: "Bat Decorations", price: 30, img: "bat_decorations.webp" }
];

const itemsContainer = document.getElementById('items');
const moneyDisplay = document.getElementById('moneyDisplay');

items.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.innerHTML = `
        <img src="images/${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>£ ${item.price}</p>
    `;
    itemDiv.addEventListener('click', () => {
        clicked(item, itemDiv);
    });
    itemsContainer.appendChild(itemDiv);
});

function clicked(item, itemDiv) {
    showApplePay(item, itemDiv);
    //window.alert(`${itemName} was purchased`);
}

function updateMoney(price) {
    money -= price;
    moneyDisplay.innerHTML = `£ ${money}`;
}

// Had to look up modals as I don't really get them
function showApplePay(item, itemDiv) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Apple Pay</h2><img class="mini" src="images/apple_logo.jpg"></href>
            <p>Processing payment for <b>${item.name}</b>...</p>
            <div class="loading"></div>
            <p>Please wait while we process your payment...</p>
        </div>
    `;
    document.body.appendChild(modal);

    setTimeout(() => {
        if (money - item.price > 0) {
            modal.innerHTML = `
                <div class="modal-content">
                    <h2>Payment Success</h2>
                    <p>Deducted <b>£${item.price}</b> from your account</p>
                    <button onclick="closeModal()">Close</button>
                </div>
            `;
            itemDiv.style.display = "none";
            updateMoney(item.price);
        } else {
            modal.innerHTML = `
                <div class="modal-content">
                    <h2>Payment Failed</h2>
                    <p>Failed to deduct <b>£${item.price}</b> from your account due to <b>insufficient funds</b></p>
                    <button onclick="closeModal()">Close</button>
                </div>
            `;
        }
    }, 6000);
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

updateMoney(0);