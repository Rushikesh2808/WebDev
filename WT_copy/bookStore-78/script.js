/* LOGIN FUNCTION */

function loginUser(event) {
    event.preventDefault();

    let username = document.getElementById("loginUser").value;
    let password = document.getElementById("loginPass").value;

    if (username === "" || password === "") {
        alert("Please fill all login fields");
    }
    else if (username === "rushi28" && password === "Rushikesh@2808") {
        alert("Login successful! Welcome " + username);
        window.location.href = "catalogue.html";
    }
    else {
        alert("Invalid username or password");
    }
}

function registerUser(event) {
    event.preventDefault();

    let name = document.getElementById("regName").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let password = document.getElementById("regPass").value.trim();
    let phone = document.getElementById("regPhone").value.trim();

    // Name: only alphabets & min 6 characters
    let namePattern = /^[A-Za-z]{6,}$/;

    // Email pattern
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Phone: exactly 10 digits
    let phonePattern = /^[0-9]{10}$/;

    if (!namePattern.test(name)) {
        alert("Name must contain only alphabets and be at least 6 characters long");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Enter a valid email (example: name@domain.com)");
        return;
    }

    if (!phonePattern.test(phone)) {
        alert("Phone number must be exactly 10 digits");
        return;
    }

    // If all valid
    alert("Registration successful!");
    window.location.href = "catalogue.html";
}


/* ADD TO CART FUNCTION */

let cart = [];
let total = 0;

function addToCart(bookName, price) {
    cart.push({ name: bookName, price: price });
    total += price;

    alert(bookName + " added to cart!");
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    let message = "Order Summary:\n";

    cart.forEach(item => {
        message += item.name + " - ₹" + item.price + "\n";
    });

    message += "\nTotal Price: ₹" + total;

    alert(message);
}