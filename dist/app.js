"use strict";
// Pega os elementos do HTML
const inputTarefa = document.getElementById("tarefa");
const inputHora = document.getElementById("temp");
const inputData = document.getElementById("data");
const btnAdd = document.getElementById("add");
const lista = document.getElementById("lista");
// Objeto de tarefas por data
let tarefasPorData = {};
// Carrega as tarefas do localStorage ao iniciar
function carregarDoLocalStorage() {
    const salvas = localStorage.getItem("tarefas");
    if (salvas) {
        tarefasPorData = JSON.parse(salvas);
    }
}
// Salva as tarefas no localStorage
function salvarNoLocalStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefasPorData));
}
// Atualiza a lista de tarefas da data atual
function atualizarLista() {
    const data = inputData.value;
    lista.innerHTML = "";
    const tarefas = [...(tarefasPorData[data] || [])];
    // Ordena pelo horário 
    tarefas.sort((a, b) => {
        return a.hora.localeCompare(b.hora);
    });
    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefa.concluida;
        checkbox.onchange = () => {
            tarefa.concluida = checkbox.checked;
            li.classList.toggle("concluida", tarefa.concluida);
            salvarNoLocalStorage();
        };
        const textoSpan = document.createElement("span");
        textoSpan.innerText = `${tarefa.texto} - ${tarefa.hora}`;
        const btnExcluir = document.createElement("button");
        btnExcluir.innerText = "❌";
        btnExcluir.onclick = () => {
            tarefas.splice(index, 1);
            salvarNoLocalStorage();
            atualizarLista();
        };
        li.appendChild(checkbox);
        li.appendChild(textoSpan);
        li.appendChild(btnExcluir);
        li.classList.toggle("concluida", tarefa.concluida);
        lista.appendChild(li);
    });
}
// Quando clicar em adicionar
btnAdd.onclick = () => {
    const texto = inputTarefa.value;
    const hora = inputHora.value;
    const data = inputData.value;
    if (!texto || !hora || !data)
        return;
    if (!tarefasPorData[data]) {
        tarefasPorData[data] = [];
    }
    tarefasPorData[data].push({
        texto,
        hora,
        concluida: false,
    });
    inputTarefa.value = "";
    inputHora.value = "";
    salvarNoLocalStorage();
    atualizarLista();
};
// Quando mudar a data
inputData.onchange = () => {
    atualizarLista();
};
// Inicializa
carregarDoLocalStorage(); // Carrega se tiver salvo
