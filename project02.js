// Initialize array 
let taskList = [];

// Add a task to the array
function addTask(title, priority, status) {
    const task = {
        id: taskList.length + 1,
        title: title,
        priority: priority,
        status: status
    };
    taskList.push(task);  // Add to array
    appendTaskToDOM(task);  // Add to DOM
}

// Append a task to DOM
function appendTaskToDOM(task) {
    const list = document.getElementById('taskList');
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.classList.add('list-group-item');
    li.innerHTML = `
        ${task.title} - ${task.priority} priority - Status: ${task.status}
        <button class="btn btn-danger btn-sm float-right delete">Remove</button>
        <button class="btn btn-success btn-sm float-right complete mr-2">Mark as complete</button>
    `;
    list.appendChild(li);
}

// Onsubmit to add a new task
document.getElementById('taskForm').onsubmit = function(e) {
    e.preventDefault();  // Prevent the default form submission
    const taskTitle = document.getElementById('taskTitle').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskStatus = document.querySelector('input[name="status"]:checked').value;
    addTask(taskTitle, taskPriority, taskStatus);
    this.reset();  // Reset the form
};

// Remove and Complete
document.getElementById('taskList').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        const li = e.target.parentElement;
        removeTask(li.getAttribute('data-id'));
        li.remove();
    }

    // Complete
    if (e.target.classList.contains('complete')) {
        const li = e.target.parentElement;
        markAsComplete(li.getAttribute('data-id'));
        li.style.textDecoration = 'line-through'; //Shows complete by crossing line
    }
});

// Remove from array
function removeTask(id) {
    taskList = taskList.filter(task => task.id !== parseInt(id)); //totally don't understand. Found it from YouTube and Works!
}

// Complete
function markAsComplete(id) {
    const task = taskList.find(task => task.id === parseInt(id));
    if (task) {
        task.status = 'Completed'; 
    }
}
