"use strict";
// Seleciona os elementos do HTML com garantia de que não são nulos
const inputTarefa = document.getElementById("tarefa");
const inputHora = document.getElementById("temp");
const inputData = document.getElementById("data");
const btnAdd = document.getElementById("add");
const lista = document.getElementById("lista");
// Onde as tarefas ficam guardadas separadas por data
let tarefasPorData = {};
// Pega as tarefas salvas no navegador
function carregarTarefas() {
    const salvas = localStorage.getItem("tarefas");
    if (salvas)
        tarefasPorData = JSON.parse(salvas);
}
// Salva no navegador
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefasPorData));
}
// Mostra as tarefas da data escolhida
function mostrarTarefas() {
    const data = inputData.value;
    lista.innerHTML = "";
    const tarefas = tarefasPorData[data] || [];
    tarefas.sort((a, b) => a.hora.localeCompare(b.hora));
    tarefas.forEach((tarefa, i) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefa.concluida;
        checkbox.onchange = () => {
            tarefa.concluida = checkbox.checked;
            li.classList.toggle("concluida", tarefa.concluida);
            salvarTarefas();
        };
        const texto = document.createElement("span");
        texto.innerText = `${tarefa.texto} - ${tarefa.hora}`;
        const excluir = document.createElement("button");
        excluir.innerText = "❌";
        excluir.onclick = () => {
            tarefasPorData[data] = tarefasPorData[data].filter((_, idx) => idx !== i);
            salvarTarefas();
            mostrarTarefas();
        };
        li.append(checkbox, texto, excluir);
        li.classList.toggle("concluida", tarefa.concluida);
        lista.appendChild(li);
    });
}
// Adiciona nova tarefa
btnAdd.onclick = () => {
    const texto = inputTarefa.value;
    const hora = inputHora.value;
    const data = inputData.value;
    if (!texto || !hora || !data)
        return;
    if (!tarefasPorData[data])
        tarefasPorData[data] = [];
    tarefasPorData[data].push({ texto, hora, concluida: false });
    inputTarefa.value = "";
    inputHora.value = "";
    salvarTarefas();
    mostrarTarefas();
};
// Quando trocar a data, atualiza a tela
inputData.onchange = mostrarTarefas;
// Carrega ao abrir a página
carregarTarefas();
