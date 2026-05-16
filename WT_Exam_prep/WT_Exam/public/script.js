async function registerUser(e) {
    e.preventDefault();

    let n = document.getElementById("name").value;
    let p = document.getElementById("pass").value;
    let eId = document.getElementById("email").value;
    let ph = document.getElementById("phone").value;

    // SIMPLE VALIDATION (no regex)
    if (n.length < 6) {
        alert("Name must be 6 characters");
        return;
    }

    if (p.length < 6) {
        alert("Password must be 6 characters");
        return;
    }

    if (!eId.includes("@")) {
        alert("Invalid Email");
        return;
    }

    if (ph.length != 10) {
        alert("Phone must be 10 digits");
        return;
    }

    // SEND DATA
    await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, email: eId, password: p })
    });
    console.log("working");
    alert("Registered Successfully");
    window.location = "login.html";
}

async function loginUser(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    let data = await res.text();

    if (data === "Success") {
        alert("Login Successful");
        window.location = "dashboard.html";
    } else {
        alert("Invalid Email or Password");
    }
}

let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    alert(name + " added to cart");
}

// CALCULATE TOTAL
function getTotal() {
    let total = 0;
    cart.forEach(item => total += item.price);
    return total;
}

// SEND ORDER TO BACKEND
async function placeOrder() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    let total = getTotal();

    let res = await fetch("/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            items: cart,
            total: total
        })
    });

    let data = await res.text();

    alert(data); // Order Saved

    cart = []; // clear cart
}