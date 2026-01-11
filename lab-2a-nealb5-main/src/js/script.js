function on_submit(event) {
    let formData = new FormData(event.currentTarget);
    let json = JSON.stringify(Object.fromEntries(formData));
    alert(json);
    event.preventDefault();
}

function updateStorage(newData) {
    const jsonString = JSON.stringify(newData);
    localStorage.setItem('database', jsonString);
}

function readStorage() {
    const jsonString = localStorage.getItem('database');
    try {
        let result = JSON.parse(jsonString) || [];
        result = result.map(taskData => new Task(taskData));
        return result;
    } catch (error) {
        console.error("Error reading from local storage:", error);
        return [];
    }
}

class Task {
    constructor({ text, date, done, id }) {
        this.text = text;
        this.date = new Date(date);
        this.done = done;
        this.id = id;
    }

    toHTML() {
        return `
            <li class="task ${this.done ? 'task-done' : ''}">
                <input type="checkbox" class="checkbox task-done checkbox-icon" id="cb-task${this.id}" ${this.done ? 'checked' : ''} onchange="updateTask(${this.id})">
                <label for="cb-task${this.id}" class="task-name">${this.text}</label>
                <span class="date">${this.prettyDate()}</span>
                <button class="task-delete material-icon" onclick="deleteTask(${this.id})"><img src="Delete.png" alt="Delete"></button>
            </li>
        `;
    }

    prettyDate() {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return this.date.toLocaleDateString('en-US', options);
    }

    toggle() {
        this.done = !this.done;
    }
}

let tasks = readStorage();

function loadTasks() {
    tasks = readStorage();
    renderTasks();
}

function renderTasks() {
    const tasksContainer = document.querySelector('.task-list');
    tasksContainer.innerHTML = tasks.map(task => task.toHTML()).join('');
}

function createTask() {
    console.log('Creating task...');

    const inputDate = document.getElementById('date').value;
    const [year, month, day] = inputDate.split('-').map(Number);
    
    const newTask = new Task({
        text: document.getElementById('Description').value,
        date: new Date(year, month - 1, day),
        done: false,
        id: Date.now()
    });

    console.log('New Task:', newTask);

    tasks = readStorage().concat([newTask]);
    updateStorage(tasks);
    readTasks();

    document.getElementById('Description').value = '';
    document.getElementById('date').value = '';
}


function readTasks() {
    const tasksContainer = document.querySelector('.task-list');
    tasksContainer.innerHTML = '';

    tasks = readStorage();

    tasks.forEach(task => {
        tasksContainer.innerHTML += task.toHTML();
    });
}

function updateTask(id) {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (taskToUpdate) {
        taskToUpdate.toggle();
    }

    updateStorage(tasks);
    readTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    updateStorage(tasks);
    readTasks();
}