function placeOrder() {
    const phone = document.getElementById("phone").value;

    if (!/^\d{10}$/.test(phone)) {
        alert("Invalid phone");
        return false;
    }

    const rows = document.querySelectorAll(".menu-row");

    let total = 0;
    let billHTML = "<h3>Bill</h3>";

    rows.forEach(row => {
        const checkbox = row.querySelector("input[type='checkbox']");
        const qtyInput = row.querySelector(".qty");

        if (checkbox.checked) {
            let price = parseInt(checkbox.dataset.price);
            let qty = parseInt(qtyInput.value) || 0;

            if (qty > 0) {
                let cost = price * qty;
                total += cost;

                billHTML += `<p>${checkbox.value} x ${qty} = ₹${cost}</p>`;
            }
        }
    });

    if (total === 0) {
        alert("Please select at least one item with quantity");
        return false;
    }

    billHTML += `<h2>Total: ₹${total}</h2>`;
    document.getElementById("bill").innerHTML = billHTML;

    return false;
}