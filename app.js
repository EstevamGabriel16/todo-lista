var taskInput = document.getElementById('taskInput');
var addTaskButton = document.getElementById('addTask');
var taskList = document.getElementById('taskList');
// getElementById localiza os elementos no HTML.
var tasks = [];
// Cria um array vazio chamado tasks, onde cada item é do tipo Task.
function loadTasks() {
    var data = localStorage.getItem('tasks');
    if (data) {
        tasks = JSON.parse(data);
        renderTasks();
    }
    // Pega o item "tasks" salvo no localStorage. Se existir, converte em array e exibe na tela.
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Converte o array em string JSON e salva no localStorage.
}
function renderTasks() {
    taskList.innerHTML = '';
    // Limpa o conteúdo da lista antes de recriar.
    tasks.forEach(function (task, index) {
        var li = document.createElement('li');
        li.textContent = task.text;
        // Cria um <li> com o texto da tarefa.
        if (task.completed)
            li.classList.add('completed');
        // Se a tarefa estiver concluída, adiciona a classe 'completed'.
        li.addEventListener('click', function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });
        // Alterna o estado de concluído ao clicar.
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        // Botão de excluir a tarefa.
        deleteBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        // Ao clicar no botão, remove a tarefa e atualiza.
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
addTaskButton.addEventListener('click', function () {
    var text = taskInput.value.trim();
    // Pega o texto da tarefa digitada.
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
    // Se o campo não estiver vazio, adiciona a tarefa.
});
loadTasks();
// Ao abrir a página, carrega tarefas salvas.
