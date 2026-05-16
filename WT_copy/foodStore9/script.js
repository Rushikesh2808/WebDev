function placeOrder(event) {
    event.preventDefault();

    let items = document.querySelectorAll("input[type='checkbox']:checked");

    if (items.length === 0) {
        alert("Please select at least one item");
        return;
    }

    let order = [];
    let total = 0;

    items.forEach(item => {
        let name = item.value;
        let price = parseInt(item.getAttribute("data-price"));

        order.push({ name, price });
        total += price;
    });

    // Store in localStorage
    localStorage.setItem("order", JSON.stringify(order));
    localStorage.setItem("total", total);

    window.location.href = "bill.html";
}



function loadBill() {
    let order = JSON.parse(localStorage.getItem("order"));
    let total = localStorage.getItem("total");

    let output = "<h3>Items:</h3><ul>";

    order.forEach(item => {
        output += `<li>${item.name} - ₹${item.price}</li>`;
    });

    output += "</ul>";
    output += `<h3>Total: ₹${total}</h3>`;

    document.getElementById("billDetails").innerHTML = output;
}



function submitFeedback(event) {
    event.preventDefault();
    alert("Thank you for your feedback!");
}


// Run bill loader only on bill page
if (document.getElementById("billDetails")) {
    loadBill();
}