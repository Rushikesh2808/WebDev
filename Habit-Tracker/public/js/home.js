let habits = [];
let selectedDate = new Date().toISOString().split("T")[0];

// LOAD HABITS
async function loadHabits() {
    let userId = localStorage.getItem("userId");

    let res = await fetch(`http://localhost:5000/api/habits/${userId}`);
    habits = await res.json();

    displayHabits();
}

// OPEN MODAL
function openModal() {
    document.getElementById("modal").classList.add("active");
}

// SAVE HABIT
async function saveHabit() {
    let userId = localStorage.getItem("userId");

    await fetch("http://localhost:5000/api/habits/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId,
            name: habitName.value,
            category: category.value
        })
    });

    document.getElementById("modal").classList.remove("active");
    await loadHabits();
}

// DISPLAY HABITS
function displayHabits() {
    let list = document.getElementById("habitList");
    list.innerHTML = "";

    if (habits.length === 0) {
        list.innerHTML = `
        <div class="empty">
            <h4>🚀 Build your first habit</h4>
            <p>Consistency beats motivation.</p>
        </div>`;
        return;
    }

    let completed = 0;

    habits.forEach((h, i) => {

        let status = h.history ? h.history[selectedDate] : null;
        let icon = "⏳";
        let cls = "pending";

        if (status === "done") {
            icon = "✔";
            cls = "green";
            completed++;
        }
        else if (status === "missed") {
            icon = "❌";
            cls = "red";
        }

        list.innerHTML += `
<div class="habit">

    <div class="habit-left">
        <span class="delete-btn" onclick="deleteHabit('${h._id}')">🗑️</span>

        <div onclick="showCalendar(${i})" style="cursor:pointer;">
            <b>${h.name}</b><br>
            <small>${h.category}</small>
        </div>
    </div>

    <div class="status ${cls}" onclick="toggle('${h._id}', ${i})">
        ${icon}
    </div>

</div>`;
    });

    let percent = Math.round((completed / habits.length) * 100) || 0;

    document.getElementById("percent").innerText = percent + "%";
    document.getElementById("progressFill").style.width = percent + "%";
    document.getElementById("completedCount").innerText = completed;
}

async function toggle(habitId, index) {

    // SAFE HISTORY FIX
    if (!habits[index].history) {
        habits[index].history = {};
    }

    let current = habits[index].history[selectedDate] || null;

    let newStatus; // ✅ declare first

    if (!current) newStatus = "done";
    else if (current === "done") newStatus = "missed";
    else newStatus = null;

    // ✅ NOW log AFTER value is set
    console.log("Sending:", {
        habitId,
        date: selectedDate,
        status: newStatus
    });

    await fetch("http://localhost:5000/api/habits/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            habitId,
            date: selectedDate,
            status: newStatus
        })
    });

    await loadHabits();

    if (document.querySelector(".mini-calendar").style.display === "block") {
        showCalendar(index);
    }
}
// SHOW CALENDAR
function showCalendar(index) {
    let habit = habits[index];

    let grid = document.getElementById("calendarGrid");
    grid.innerHTML = "";

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    let daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {

        // ✅ FIX: proper date format (YYYY-MM-DD)
        let day = String(i).padStart(2, "0");
        let monthStr = String(month + 1).padStart(2, "0");
        let key = `${year}-${monthStr}-${day}`;

        let status = habit.history ? habit.history[key] : null;

        let cls = "";
        if (status === "done") cls = "green";
        else if (status === "missed") cls = "red";

        grid.innerHTML += `
        <div class="day-circle ${cls}">
            ${i}
        </div>`;
    }

    document.querySelector(".mini-calendar").style.display = "block";
}

// LOGOUT
function logout() {
    localStorage.removeItem("userId");
    window.location.href = "index.html";
}

// CLOSE MODAL
window.onclick = (e) => {
    if (e.target.id === "modal") {
        document.getElementById("modal").classList.remove("active");
    }
};

// DATE STRIP
function generateDates() {
    let container = document.getElementById("datesContainer");
    container.innerHTML = "";

    let today = new Date();

    for (let i = -2; i <= 3; i++) {
        let d = new Date();
        d.setDate(today.getDate() + i);

        let day = d.toLocaleDateString("en-US", { weekday: "short" });
        let num = d.getDate();

        let dateKey = d.toISOString().split("T")[0];
        let isActive = dateKey === selectedDate ? "active" : "";

        container.innerHTML += `
        <div class="date ${isActive}" onclick="setActiveDate('${dateKey}', this)">
            <span class="day">${day}</span>
            <span class="num">${num}</span>
        </div>`;
    }
}

// SET ACTIVE DATE
function setActiveDate(date, el) {
    selectedDate = date;

    document.querySelectorAll(".date").forEach(d => d.classList.remove("active"));
    el.classList.add("active");

    displayHabits();
}

// GO TO TODAY
function goToToday() {
    selectedDate = new Date().toISOString().split("T")[0];
    generateDates();
    displayHabits();
}

// RUN
window.onload = function () {
    generateDates();
    loadHabits();
};
async function deleteHabit(habitId) {
    const confirmDelete = confirm("Delete this habit?");

    if (!confirmDelete) return;

    try {
        await fetch(`http://localhost:5000/api/habits/${habitId}`, {
            method: "DELETE"
        });

        await loadHabits(); // refresh UI
    } catch (err) {
        console.error(err);
        alert("Error deleting habit");
    }
}