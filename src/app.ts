//  Pega os elementos do HTML pelo ID (input de texto, botão, lista, input de hora)
const taiinput = document.getElementById('taimput') as HTMLInputElement; // onde digita a tarefa
const add = document.getElementById('add') as HTMLButtonElement; // botão "Adicionar"
const taList = document.getElementById('taList') as HTMLUListElement; // onde as tarefas aparecem
const temp = document.getElementById('temp') as HTMLInputElement; // onde coloca a hora da tarefa

//  Pega os elementos dos contadores
const totalAt = document.getElementById("totalAt") as HTMLSpanElement; // mostra o total de tarefas
const completoAt = document.getElementById("completoAt") as HTMLSpanElement; // quantas estão feitas
const faltaAt = document.getElementById("faltaAt") as HTMLSpanElement; // quantas ainda faltam

//  Atualiza os números dos contadores toda vez que algo muda
function atualizarContadores() {
  const tarefas = taList.querySelectorAll("li"); // pega todas as tarefas da lista
  const total = tarefas.length; // total de tarefas

  let concluidas = 0;
  // percorre cada tarefa e vê se está concluída tem a classe concluido
  tarefas.forEach((tarefa) => {
    if (tarefa.classList.contains("concluido")) {
      concluidas++;
    }
  });

  const pendentes = total - concluidas; // calcula as que ainda não foram feitas

  // mostra os números na tela
  totalAt.innerText = total.toString();
  completoAt.innerText = concluidas.toString();
  faltaAt.innerText = pendentes.toString();
}

//  Quando clicar no botão Adicionar
add.onclick = () => {
  if (taiinput.value === "") return; // se estiver vazio, não faz nada

  const text = taiinput.value; // pega o que a pessoa digitou
  const hora = temp.value; // pega a hora que ela escolheu

  const ativ = document.createElement("li"); // cria a tarefa linha da lista
  const checar = document.createElement("input"); // cria a caixinha de marcar
  checar.type = "checkbox";

  //  Cria o botão de excluir a tarefa
  const excluir = document.createElement("button");
  excluir.innerText = "❌"; // aparece um X
  excluir.className = "btn-excluir"; // classe usada no CSS

  //  Quando clicar no botão X remove a tarefa
  excluir.onclick = () => {
    taList.removeChild(ativ);
    atualizarContadores(); // atualiza os números
  };

  //  Quando clicar na caixinha, marca/desmarca como concluída
  checar.onchange = () => {
    ativ.classList.toggle("concluido"); // risca ou desrisca
    atualizarContadores(); // atualiza os números
  };

  //  Junta tudo dentro do item (li) a caixinha o texto e o botão X
  ativ.appendChild(checar);
  ativ.append(` ${text} - ${hora} `); // exibe o que foi digitado e a hora
  ativ.appendChild(excluir);

  //  Coloca a tarefa dentro da lista principal
  taList.appendChild(ativ);

  //  Limpa os campos de texto e hora para digitar outra tarefa
  taiinput.value = "";
  temp.value = "";

  //  Atualiza os contadores depois de adicionar
  atualizarContadores();
};
