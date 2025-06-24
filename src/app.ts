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

  const ativ = document.createElement("li"); // cria um item de lista
  ativ.innerText = `${text} - ${hora}`; // coloca o texto e a hora juntos

  taList.appendChild(ativ); // adiciona o item na lista

  // limpa os campos
  taiinput.value = "";
  temp.value = "";
};
