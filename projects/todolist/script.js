document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const deadlineInput = document.getElementById('deadline-input');
    const priorityInput = document.getElementById('priority-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const progress = document.querySelector('.progress');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateProgressBar() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        const percentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
        progress.style.width = `${percentage}%`;
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.setAttribute('draggable', 'true');
            taskItem.setAttribute('data-index', index);

            taskItem.innerHTML = `
                <div class="task-details">
                    <input type="checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                    <span class="task-priority priority-${task.priority}">${task.priority}</span>
                    <span class="task-deadline">${task.deadline}</span>
                </div>
                <div>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            taskList.appendChild(taskItem);
        });
        updateProgressBar();
    }

    addTaskBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        const deadline = deadlineInput.value;
        const priority = priorityInput.value;

        if (text === '') return;

        const task = {
            text,
            deadline,
            priority,
            completed: false
        };

        tasks.push(task);
        updateLocalStorage();
        renderTasks();
        taskInput.value = '';
        deadlineInput.value = '';
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.closest('li').dataset.index;
            tasks.splice(index, 1);
            updateLocalStorage();
            renderTasks();
        }

        if (e.target.classList.contains('edit-btn')) {
            const index = e.target.closest('li').dataset.index;
            const task = tasks[index];
            taskInput.value = task.text;
            deadlineInput.value = task.deadline;
            priorityInput.value = task.priority;
            tasks.splice(index, 1);
            updateLocalStorage();
            renderTasks();
        }

        if (e.target.type === 'checkbox') {
            const index = e.target.closest('li').dataset.index;
            tasks[index].completed = e.target.checked;
            updateLocalStorage();
            renderTasks();
        }
    });

    taskList.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.dataset.index);
    });

    taskList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingTask = taskList.querySelector('.dragging');
        const closestTask = e.target.closest('li');
        if (closestTask && closestTask !== draggingTask) {
            const bounding = closestTask.getBoundingClientRect();
            const offset = e.clientY - bounding.top + bounding.height / 2;
            taskList.insertBefore(draggingTask, offset > bounding.height / 2 ? closestTask.nextSibling : closestTask);
        }
    });

    taskList.addEventListener('dragend', () => {
        const newTasksOrder = Array.from(taskList.children).map(li => tasks[li.dataset.index]);
        tasks = newTasksOrder;
        updateLocalStorage();
        renderTasks();
    });

    renderTasks();
});
