let tasks = [
    { id:1, description: 'comprar pão', checked: false },
    { id:2, description: 'passear com o cachorrro', checked: false },
    { id:3, description: 'fazer o almoço', checked: false },
] // Array com tasks

const getCheckboxInput = ({id, description, checked}) => { // Função que recebe como parâmetro o id, description e checked
    const checkbox = document.createElement('input'); // Constante que cria um input
    const label = document.createElement('label'); // Constante que cria uma label
    const wrapper = document.createElement('div'); // Constante que cria uma div
    const checkboxId = `${id}-checkbox`; // constante que têm como valor uma string com o id da task em questão

    checkbox.type = 'checkbox'; // definindo o tipo do input
    checkbox.id = checkboxId; // id do checkbox
    checkbox.checked = checked; // quando o checkbox for acionado

    label.textContent = description; // Pega a descrição da task e atribui na label
    label.htmlFor = checkboxId; // Atribui o htmlFor na label

    wrapper.className = 'checkbox-label-container'; // atribui uma classe na div

    wrapper.appendChild(checkbox); // Coloca o checkbox dentro da div
    wrapper.appendChild(label); // Coloca a label dentro da div

    return wrapper; // retorna a div
}

window.onload = function() { // função que é carregada junto com a página
    tasks.forEach((task) => { // para cada task
        const checkbox = getCheckboxInput(task); // Constante que chama a função getCheckboxInput e passa como parâmetro a lista 
        const list = document.getElementById('todo-list'); // Pega a lista criada no código HTML
        const toDo = document.createElement('li'); // Cria elementos de lista
        // const button = document.createElement('button')

        toDo.id = task.id; // Atribui na "li"o id da taskem questão
        toDo.appendChild(checkbox); // coloca a div dentro da "li"
        // toDo.appendChild(button);

        list.appendChild(toDo); // coloca a "li" dentro da ul
    })
}