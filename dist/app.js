"use strict";
// Chama os elementos do HTML
const taiinput = document.getElementById('taimput');
const add = document.getElementById('add');
const taList = document.getElementById('taList');
const temp = document.getElementById('temp');
// Contadores
const totalAt = document.getElementById("totalAt");
const completoAt = document.getElementById("completoAt");
const faltaAt = document.getElementById("faltaAt");
// Função que atualiza os contadores
function atualizarContadores() {
    const tarefas = taList.querySelectorAll("li");
    const total = tarefas.length;
    let concluidas = 0;
    tarefas.forEach((tarefa) => {
        if (tarefa.classList.contains("concluido")) {
            concluidas++;
        }
    });
    const pendentes = total - concluidas;
    totalAt.innerText = total.toString();
    completoAt.innerText = concluidas.toString();
    faltaAt.innerText = pendentes.toString();
}
// Quando clicar no botão "Adicionar"
add.onclick = () => {
    if (taiinput.value === "")
        return;
    const text = taiinput.value;
    const hora = temp.value;
    const ativ = document.createElement("li"); // Cria o item da tarefa
    const checar = document.createElement("input"); // Cria o checkbox
    checar.type = "checkbox";
    // Cria o botão para excluir
    const excluir = document.createElement("button");
    excluir.innerText = "❌";
    excluir.className = "btn-excluir";
    // Quando clicar no  remove a tarefa
    excluir.onclick = () => {
        taList.removeChild(ativ);
        atualizarContadores();
    };
    // Quando marcar ou desmarcar a tarefa como concluída
    checar.onchange = () => {
        ativ.classList.toggle("concluido");
        atualizarContadores();
    };
    // Monta o conteúdo da tarefa
    ativ.appendChild(checar);
    ativ.append(` ${text} - ${hora} `);
    ativ.appendChild(excluir);
    // Adiciona a tarefa na lista
    taList.appendChild(ativ);
    // Limpa os campos
    taiinput.value = "";
    temp.value = "";
    // Atualiza os contadores
    atualizarContadores();
};
