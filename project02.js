// Initialize an array
let taskList = [];

// Add a task
function addTask(title, priority, status) {
    const newTask = {
        id: taskList.length + 1,
        title: title,
        priority: priority,
        status: status
    };

    taskList.push(newTask); // Add to the array
    appendTaskToDOM(newTask); // Add to the DOM
}

// Append a task to DOM
function appendTaskToDOM(task) {
    const list = document.getElementById('taskList');
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.classList.add('list-group-item');
    li.innerHTML = `
        <strong>${task.title}</strong> - ${task.priority} priority - ${task.status}
        <button class="btn btn-danger btn-sm float-right delete">Remove</button>
        <button class="btn btn-success btn-sm float-right complete mr-2">Mark as complete</button>
    `;
    list.appendChild(li);
}

// Handle form submission
document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault(); //prevents the form from autosubmitting
    const taskTitle = document.getElementById('taskTitle').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskStatus = document.querySelector('input[name="status"]:checked').value;
    addTask(taskTitle, taskPriority, taskStatus);
    document.getElementById('taskForm').reset(); // Clear the form
});

// Remove and complete buttons
document.getElementById('taskList').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        const li = e.target.parentElement;
        removeTask(li.getAttribute('data-id'));
        li.remove();
    }
    if (e.target.classList.contains('complete')) {
        const li = e.target.parentElement;
        markAsComplete(li.getAttribute('data-id'));
        li.style.textDecoration = 'line-through';
    }
});

// Remove a task from the array
function removeTask(id) {
    taskList = taskList.filter(task => task.id !== parseInt(id));
}

// Mark a task as complete
function markAsComplete(id) {
    const task = taskList.find(task => task.id === parseInt(id));
    if (task) {
        task.status = 'Completed';
    }
}
