// Pega os elementos do HTML
const inputTarefa = document.getElementById("tarefa") as HTMLInputElement; // Campo de texto para escrever a tarefa
const inputHora = document.getElementById("temp") as HTMLInputElement; // Campo de hora da tarefa
const inputData = document.getElementById("data") as HTMLInputElement; // Campo de data
const btnAdd = document.getElementById("add") as HTMLButtonElement; // Botão de "Adicionar"
const lista = document.getElementById("lista") as HTMLUListElement; // Lista onde as tarefas aparecem

// Objeto que guarda tarefas separadas por data
let tarefasPorData: {
  [data: string]: { // cada data (ex: "2025-06-24") tem um array de tarefas
    texto: string;     // o que foi digitado
    hora: string;      // o horário escolhido
    concluida: boolean; // se a tarefa foi marcada como feita ou não
  }[];
} = {};

// Função que carrega as tarefas salvas no navegador (localStorage)
function carregarDoLocalStorage() {
  const salvas = localStorage.getItem("tarefas"); // tenta pegar as tarefas salvas
  if (salvas) {
    tarefasPorData = JSON.parse(salvas); // transforma o texto salvo em objeto de novo
  }
}

// Função que salva as tarefas no navegador (localStorage)
function salvarNoLocalStorage() {
  localStorage.setItem("tarefas", JSON.stringify(tarefasPorData)); // transforma o objeto em texto e salva
}

// Atualiza a lista de tarefas com base na data selecionada
function atualizarLista() {
  const data = inputData.value; // pega a data atual selecionada
  lista.innerHTML = ""; // limpa a lista na tela

  const tarefas = [...(tarefasPorData[data] || [])]; // pega as tarefas da data, ou cria lista vazia

  // Organiza as tarefas em ordem de horário (ex: 08:00, 09:30, 10:00)
  tarefas.sort((a, b) => {
    return a.hora.localeCompare(b.hora); // compara os horários como texto (funciona pois estão no formato HH:mm)
  });

  // Para cada tarefa, cria um item visual na tela (li)
  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li"); // cria o <li>

    const checkbox = document.createElement("input"); // cria a caixinha para marcar como feito
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.concluida; // marca se estiver concluída

    // Quando mudar o estado do checkbox
    checkbox.onchange = () => {
      tarefa.concluida = checkbox.checked; // atualiza o valor no objeto
      li.classList.toggle("concluida", tarefa.concluida); // adiciona ou remove classe CSS "concluida"
      salvarNoLocalStorage(); // salva de novo no navegador
    };

    const textoSpan = document.createElement("span"); // cria um <span> com o texto da tarefa e o horário
    textoSpan.innerText = `${tarefa.texto} - ${tarefa.hora}`;

    const btnExcluir = document.createElement("button"); // botão de excluir tarefa
    btnExcluir.innerText = "❌";
    btnExcluir.onclick = () => {
      tarefas.splice(index, 1); // remove a tarefa da lista pelo índice
      salvarNoLocalStorage();   // salva nova versão
      atualizarLista();         // atualiza a tela
    };

    li.appendChild(checkbox);   // adiciona o checkbox no <li>
    li.appendChild(textoSpan);  // adiciona o texto da tarefa
    li.appendChild(btnExcluir); // adiciona o botão de excluir
    li.classList.toggle("concluida", tarefa.concluida); // se estiver concluída, aplica o estilo
    lista.appendChild(li);      // coloca o <li> na tela (dentro do <ul>)
  });
}

// Quando clicar no botão "Adicionar"
btnAdd.onclick = () => {
  const texto = inputTarefa.value; // pega o que foi escrito
  const hora = inputHora.value;   // pega a hora
  const data = inputData.value;   // pega a data

  // se qualquer campo estiver vazio, não faz nada
  if (!texto || !hora || !data) return;

  // se ainda não existe lista pra essa data, cria uma nova
  if (!tarefasPorData[data]) {
    tarefasPorData[data] = [];
  }

  // adiciona uma nova tarefa no dia escolhido
  tarefasPorData[data].push({
    texto,
    hora,
    concluida: false, // começa como não concluída
  });

  // limpa os campos de entrada
  inputTarefa.value = "";
  inputHora.value = "";

  salvarNoLocalStorage(); // salva no navegador
  atualizarLista();       // mostra a tarefa na tela
};

// Quando mudar a data no campo de data
inputData.onchange = () => {
  atualizarLista(); // atualiza a lista com as tarefas desse novo dia
};

// Ao abrir a página, carrega as tarefas salvas
carregarDoLocalStorage();
