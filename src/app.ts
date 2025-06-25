// Chama os elementos 
const taiinput = document.getElementById('taimput') as HTMLInputElement;
const add = document.getElementById('add') as HTMLButtonElement;
const taList = document.getElementById('taList') as HTMLUListElement;
const temp = document.getElementById('temp') as HTMLInputElement;

// Assim que aperta o botão
add.onclick = () => {
  if (taiinput.value === "") return;

  const text = taiinput.value;
  const hora = temp.value;

  const ativ = document.createElement("li"); // Cria item da lista
  const checar = document.createElement("input"); // Cria checkbox
  checar.type = "checkbox";

  // Quando marcar a caixinha, risca a tarefa
  checar.onchange = () => {
    ativ.classList.toggle("concluido");
  };

  // Adiciona a checkbox e o texto dentro da tarefa
  ativ.appendChild(checar);
  ativ.append(` ${text} - ${hora}`);

  // Coloca o item na lista
  taList.appendChild(ativ);

  // Limpa os campos
  taiinput.value = "";
  temp.value = "";
};
