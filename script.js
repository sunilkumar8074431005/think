// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = [];

// Add task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if(taskText !== '') {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(task);
        renderTasks();
        taskInput.value = '';
    } else {
        alert('Please enter a task!');
    }
});

// Render tasks
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    let filteredTasks = tasks;

    if(filter === 'active') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if(filter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="complete-btn">${task.completed ? '<i class="fa-solid fa-rotate-left"></i> Undo' : '<i class="fa-solid fa-check"></i> Complete'}</button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i> Delete</button>
            </div>
        `;

        const completeBtn = li.querySelector('.complete-btn');
        completeBtn.addEventListener('click', () => toggleComplete(task.id));

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        taskList.appendChild(li);
    });
}

// Toggle complete
function toggleComplete(id) {
    tasks = tasks.map(task => {
        if(task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks(getActiveFilter());
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks(getActiveFilter());
}

// Filter tasks
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTasks(btn.dataset.filter);
    });
});

// Helper
function getActiveFilter() {
    const activeBtn = document.querySelector('.filter-btn.active');
    return activeBtn ? activeBtn.dataset.filter : 'all';
}

// Initial render
renderTasks();
