async function loginUser() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ✅ VALIDATION
    if (!emailPattern.test(email)) {
        alert("Enter valid email");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("userId", data.userId);
            alert("Login successful 🚀");
            window.location.href = "home.html";
        } else {
            alert(data.message);
        }

    } catch (err) {
        console.log(err);
        alert("Server error");
    }
}