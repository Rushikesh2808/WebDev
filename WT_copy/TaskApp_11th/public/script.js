async function loadTasks() {
    let res = await fetch('/tasks');
    let tasks = await res.json();

    let table = document.getElementById("taskTable");
    table.innerHTML = "";

    tasks.forEach((task, index) => {
        let row = `
        <tr>
            <td>${index + 1}</td>
            <td>${task.title}</td>
            <td>
                <span class="${task.status === 'Completed' ? 'completed' : 'pending'}">
                    ${task.status}
                </span>
            </td>
            <td>${new Date(task.createdAt).toLocaleString()}</td>
            <td>
                <button class="edit-btn" onclick="markDone('${task._id}')">
                ${task.status === 'Completed' ? 'Completed' : 'Mark Complete'}</button>
                <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
            </td>
        </tr>`;
        table.innerHTML += row;
    });
}

async function addTask() {
    let title = document.getElementById("taskInput").value;
    let status = document.getElementById("statusInput").value;

    await fetch('/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, status })
    });

    loadTasks();
}

async function deleteTask(id) {
    await fetch('/delete/' + id, { method: 'DELETE' });
    loadTasks();
}

async function markDone(id) {
    await fetch('/update/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: "Completed" })
    });

    loadTasks();
}

loadTasks();