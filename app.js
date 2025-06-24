var taskInput = document.getElementById('taskInput');
var taskTime = document.getElementById('taskTime');
var addTaskButton = document.getElementById('addTask');
var taskList = document.getElementById('taskList');

var totalCount = document.getElementById('totalCount');
var completedCount = document.getElementById('completedCount');
var pendingCount = document.getElementById('pendingCount');

var tasks = [];

function loadTasks() {
    var data = localStorage.getItem('tasks');
    if (data) {
        tasks = JSON.parse(data);
        renderTasks();
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    let completed = 0;

    tasks.forEach(function (task, index) {
        var li = document.createElement('li');
        li.innerHTML = `<strong>${task.time}</strong> - ${task.text}`;

        if (task.completed) {
            li.classList.add('completed');
            completed++;
        }

        li.addEventListener('click', function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    // Atualiza contadores
    totalCount.textContent = tasks.length;
    completedCount.textContent = completed;
    pendingCount.textContent = tasks.length - completed;
}

addTaskButton.addEventListener('click', function () {
    var text = taskInput.value.trim();
    var time = taskTime.value;

    if (text && time) {
        tasks.push({ text: text, time: time, completed: false });
        taskInput.value = '';
        taskTime.value = '';
        saveTasks();
        renderTasks();
    } else {
        alert('Preencha a tarefa e o horário!');
    }
});

loadTasks();
