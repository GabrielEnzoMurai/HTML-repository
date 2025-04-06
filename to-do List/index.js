let tasks = [
    { id:1, description: 'comprar pão', checked: false },
    { id:2, description: 'passear com o cachorrro', checked: false },
    { id:3, description: 'fazer o almoço', checked: false },
] // Array com tasks

const removeTask = (taskId) => {
    tasks = tasks.filter(({id}) => parseInt(id) !== parseInt(taskId)); // Filtra array, removendo a task com o id igual ao TaskId

    document
        .getElementById("todo-list") // Seleciona a "ul" elemento pai da "li"
        .removeChild(document.getElementById(taskId)); // Remove a "li" do DOM
}

const removeDoneTasks = () => {
    const tasksToRemove = tasks
        .filter(({checked}) => checked)
        .map(({id}) => id)

    tasks = tasks.filter(({checked}) => !checked);

    tasksToRemove.forEach((tasksToRemove) => {
        document
            .getElementById("todo-list")
            .removeChild(document.getElementById(tasksToRemove))
    })
}

const createTaskListItem = (task, checkbox) => {
    const list = document.getElementById('todo-list'); // Pega a lista criada no código HTML
    const toDo = document.createElement('li'); // Cria elementos de lista

    const removeTaskButton = document.createElement('button'); // Criando o botão
    removeTaskButton.textContent = 'x'; // Texto do botão
    removeTaskButton.ariaLabel = 'Remover tarefa'; // aria label do botão

    removeTaskButton.onclick = () => removeTask(task.id); // No click vai executar a função que remove a tarefa

    toDo.id = task.id; // Atribui na "li" o id da task em questão
    toDo.appendChild(checkbox); // coloca a div dentro da "li"
    toDo.appendChild(removeTaskButton) // coloca o botão na "li"
    list.appendChild(toDo); // coloca a "li" dentro da ul

    return toDo;
}

const onCheckboxClick = (event) => {
    const [id] = event.target.id.split('-');

    tasks = tasks.map((task) => {
        return parseInt(task.id) === parseInt(id)
            ? {...task, checked: event.target.checked}
            : task
    })
}

const getCheckboxInput = ({id, description, checked}) => { // Função que recebe como parâmetro o id, description e checked
    const checkbox = document.createElement('input'); // Constante que cria um input
    const label = document.createElement('label'); // Constante que cria uma label
    const wrapper = document.createElement('div'); // Constante que cria uma div
    const checkboxId = `${id}-checkbox`; // constante que têm como valor uma string com o id da task em questão

    checkbox.type = 'checkbox'; // definindo o tipo do input
    checkbox.id = checkboxId; // id do checkbox
    checkbox.checked = checked || false; // quando o checkbox for acionado
    checkbox.addEventListener('change', onCheckboxClick)

    label.textContent = description; // Pega a descrição da task e atribui na label
    label.htmlFor = checkboxId; // Atribui o htmlFor na label

    wrapper.className = 'checkbox-label-container'; // atribui uma classe na div

    wrapper.appendChild(checkbox); // Coloca o checkbox dentro da div
    wrapper.appendChild(label); // Coloca a label dentro da div

    return wrapper; // retorna a div
}

const getNewTaskId = () => {
    const lastId = tasks[tasks.length - 1]?.id; // calcula o último id da lista
    return lastId ? lastId + 1 : 1; // Retorna o última Id + 1, se não tiver nenhum retorna 1, pois será o primeiro
}

const getNewTaskData = (event) => {
    const description = event.target.elements.description.value;  // pega a descrição do evento
    const id = getNewTaskId(); // usa a função getNewTaskId para calcular o id da task

    return { description, id }; // retorna a descrição e o Id da task
}

const createTask = (event) => {
    event.preventDefault(); //Prevê o default do navegador
    const newTaskData = getNewTaskData(event); // Salva em uma constante a descrição e o Id usando a função getNewTaskData

    //const { id, description } = newTaskData;

    const checkbox = getCheckboxInput(newTaskData) // joga os valores da nova tarefa na função que coloca ela na lista
    createTaskListItem(newTaskData, checkbox);

    tasks = [
        ...tasks, 
        {id: newTaskData.id, description: newTaskData.description, checked:false}
    ]
}

window.onload = function() { // função que é carregada junto com a página
    const form = document.getElementById('create-todo-form');
    form.addEventListener('submit', createTask)

    tasks.forEach((task) => { // para cada task
        const checkbox = getCheckboxInput(task); // Constante que chama a função getCheckboxInput e passa como parâmetro a lista 
        createTaskListItem(task, checkbox)
    })
}