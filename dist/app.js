"use strict";
// Pega os elementos do HTML
const taiinput = document.getElementById('taimput');
const add = document.getElementById('add');
const taList = document.getElementById('taList');
const temp = document.getElementById('temp');
const dataInput = document.getElementById('data');
const totalAt = document.getElementById('totalAt');
const completoAt = document.getElementById('completoAt');
const faltaAt = document.getElementById('faltaAt');
// Armazena tarefas organizadas por data (ex: '2025-06-24': [...])
const tarefasPorData = {};
// Atualiza a lista visual e os contadores com base na data selecionada
function atualizarLista() {
    const data = dataInput.value;
    taList.innerHTML = ""; // limpa a lista antes
    const tarefas = tarefasPorData[data] || [];
    tarefas.forEach(tarefa => taList.appendChild(tarefa));
    atualizarContadores(tarefas);
}
// Atualiza os números (total, feitas, pendentes)
function atualizarContadores(tarefas) {
    const total = tarefas.length;
    const concluidas = tarefas.filter(tarefa => tarefa.classList.contains("concluido")).length;
    const pendentes = total - concluidas;
    totalAt.innerText = total.toString();
    completoAt.innerText = concluidas.toString();
    faltaAt.innerText = pendentes.toString();
}
// Quando clicar em "Adicionar"
add.onclick = () => {
    const texto = taiinput.value;
    const hora = temp.value;
    const data = dataInput.value;
    if (!texto || !hora || !data)
        return;
    const tarefa = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = () => {
        tarefa.classList.toggle("concluido");
        atualizarLista();
    };
    const excluir = document.createElement("button");
    excluir.innerText = "❌";
    excluir.className = "btn-excluir";
    excluir.onclick = () => {
        const lista = tarefasPorData[data];
        tarefasPorData[data] = lista.filter(item => item !== tarefa);
        atualizarLista();
    };
    tarefa.appendChild(checkbox);
    tarefa.append(` ${texto} - ${hora} `);
    tarefa.appendChild(excluir);
    // Salva a tarefa no dia certo
    if (!tarefasPorData[data]) {
        tarefasPorData[data] = [];
    }
    tarefasPorData[data].push(tarefa);
    // Limpa os campos
    taiinput.value = "";
    temp.value = "";
    atualizarLista(); // atualiza a tela
};
// Quando mudar a data, muda as tarefas visíveis
dataInput.onchange = () => {
    atualizarLista();
};
