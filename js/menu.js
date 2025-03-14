const menuItems = document.querySelectorAll(".menu-item");
const finalOrder = document.querySelector(".full-order");
let totalPrice = 0; // Track total price globally
// Create and append the email input field dynamically
const emailContainer = document.createElement("div");
emailContainer.setAttribute("id", "email-container");

const emailLabel = document.createElement("label");
emailLabel.setAttribute("for", "email");
emailLabel.textContent = "Email: ";

const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.setAttribute("id", "email");
emailInput.placeholder = "Enter your email";
emailInput.required = true;

emailContainer.appendChild(emailLabel);
emailContainer.appendChild(emailInput);

// Add the email input field to the order section
finalOrder.appendChild(emailContainer);
// Create and append the total price display dynamically
const totalPriceDisplay = document.createElement("div");
totalPriceDisplay.setAttribute("id", "total-price");
totalPriceDisplay.textContent = `Total: $${totalPrice.toFixed(2)}`;
finalOrder.appendChild(totalPriceDisplay);

// Function to update the total price display
function updateTotalPrice() {
    totalPriceDisplay.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Function to remove an item from the order
function removeOrderItem(orderItem, itemPrice) {
    totalPrice -= itemPrice;
    orderItem.remove();
    updateTotalPrice();
}

// Add buttons to each menu item and set up event listeners
menuItems.forEach(item => {
    const button = document.createElement('button');
    button.textContent = "Add to Order";
    button.setAttribute('class', 'order-button');
    item.appendChild(button);

    button.addEventListener('click', function () {
        const newItemText = item.querySelector("h3").textContent;
        const priceText = item.querySelector(".price").textContent;
        const price = parseFloat(priceText.substring(1)); // Extract price from "$xx.xx" format

        // Create a new order item container
        const newOrderItem = document.createElement("div");
        newOrderItem.classList.add("order-item");

        // Add item name and price
        const itemLabel = document.createElement("span");
        itemLabel.textContent = `${newItemText}`;

        // Create Remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.setAttribute("class", "removeButton"); // Set the class attribute

        // Remove button functionality
        removeButton.addEventListener("click", function () {
            removeOrderItem(newOrderItem, price);
        });

        // Append elements to order item container
        newOrderItem.appendChild(itemLabel);
        newOrderItem.appendChild(removeButton);

        // Add order item to final order list
        finalOrder.appendChild(newOrderItem);
        totalPrice += price;
        updateTotalPrice();
    });
});

// Order visibility toggle
const seeOrder = document.querySelector(".see-order");
seeOrder.addEventListener("click", function () {
    finalOrder.style.display = (finalOrder.style.display === "block") ? "none" : "block";
});



// Place Order Button
const order = document.createElement("button");
order.textContent = "Place your order";
order.setAttribute('id', 'placeOrder');
finalOrder.appendChild(order);

// Add event listener for the "Place your order" button
order.addEventListener('click', function () {
    const email = emailInput.value;

    // Check if the email is valid
    if (!email || !validateEmail(email)) {
        alert("Please enter a valid email address before placing your order.");
        return; // Exit the function if email is invalid
    }

    // Proceed with placing the order
    alert(`Your order has been placed! Confirmation sent to ${email}.`);
    totalPrice = 0; // Reset total price
    updateTotalPrice();
    finalOrder.innerHTML = ""; // Clear the order
    finalOrder.appendChild(totalPriceDisplay); // Re-add total price display
    finalOrder.appendChild(order); // Re-add the "Place your order" button
    finalOrder.appendChild(emailContainer); // Re-add email input container
});

// Simple email validation function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

document.addEventListener("DOMContentLoaded", function () {
    const mealSelect = document.getElementById("meal");
    const optionsContainer = document.getElementById("options-container");
    const totalPriceSpan = document.getElementById("total-price");

    const mealOptions = {
        "hummus": {
            title: "Choose Your Bread",
            options: [
                { name: "Pita", price: 2 },
                { name: "Lavash", price: 2.5 },
                { name: "Gluten-Free Crackers", price: 3 }
            ]
        },
        "rice-paper-rolls": {
            title: "Choose Your Fillings",
            options: [
                { name: "Mango & Avocado", price: 2 },
                { name: "Tofu & Vermicelli", price: 2.5 },
                { name: "Spicy Jackfruit", price: 3 }
            ]
        },
        "thai-salad": {
            title: "Choose Your Mix-Ins",
            options: [
                { name: "Peanuts", price: 1 },
                { name: "Sesame Seeds", price: 1 },
                { name: "Chili Flakes", price: 0.5 }
            ]
        },
        "earth-bowl": {
            title: "Choose Your Toppings",
            options: [
                { name: "Roasted Chickpeas", price: 1.5 },
                { name: "Grilled Halloumi", price: 3 },
                { name: "Pickled Beets", price: 2 }
            ]
        }
    };

    function updateOptions() {
        const selectedMeal = mealSelect.value;
        optionsContainer.innerHTML = ""; // Clear previous options

        if (mealOptions[selectedMeal]) {
            const mealData = mealOptions[selectedMeal];

            const heading = document.createElement("h3");
            heading.textContent = mealData.title;
            optionsContainer.appendChild(heading);

            mealData.options.forEach(option => {
                const label = document.createElement("label");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = option.name;
                checkbox.dataset.price = option.price;

                label.appendChild(checkbox);
                label.append(` ${option.name} (+$${option.price.toFixed(2)})`);
                optionsContainer.appendChild(label);
                optionsContainer.appendChild(document.createElement("br"));
            });
        }
        updateTotal();
    }

    function updateTotal() {
        let total = parseFloat(mealSelect.options[mealSelect.selectedIndex].getAttribute("data-price")) || 0;

        document.querySelectorAll("#options-container input:checked").forEach(checkbox => {
            total += parseFloat(checkbox.dataset.price) || 0;
        });

        totalPriceSpan.textContent = `$${total.toFixed(2)}`;
    }

    mealSelect.addEventListener("change", updateOptions);
    optionsContainer.addEventListener("change", updateTotal);
});
