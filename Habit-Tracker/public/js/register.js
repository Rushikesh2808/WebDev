async function register() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    // ✅ validations
    if (!email || !password || !confirmPassword) {
        alert("Please fill all fields");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Enter valid email");
        return;
    }

    if (!passwordPattern.test(password)) {
    alert("Password must include:\n- Uppercase\n- Lowercase\n- Number\n- Special character\n- Min 8 characters");
    return;
}

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }


    try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Registration Successful 🚀");

            // redirect to login
            window.location.href = "index.html";
        } else {
            alert(data.message);
        }

    } catch (err) {
        console.log(err);
        alert("Server error");
    }
}