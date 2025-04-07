const getTasksFromLocalStorage = () => { // Função que serve para pegar as tasks do localStorage
    const localTasks= JSON.parse(window.localStorage.getItem('tasks')) // Como você precisa das tasks no estado Object, a função .parse tranforma do JSON para Object
    return localTasks ? localTasks : []; // Se tiver algo armazenado retorna o que está armazenado, senão retorna um array vazio
}

const setTaskInLocalStorage = (tasks) => { // Coloca as tasks no localStorage
    window.localStorage.setItem('tasks', JSON.stringify(tasks)); // Transforma a task Object em JSON, pois o localStorage só armazena dados em JSON
}

const removeTask = (taskId) => {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(({id}) => parseInt(id) !== parseInt(taskId)); // Filtra array, removendo a task com o id igual ao TaskId
    setTaskInLocalStorage(updatedTasks)

    document
        .getElementById("todo-list") // Seleciona a "ul" elemento pai da "li"
        .removeChild(document.getElementById(taskId)); // Remove a "li" do DOM
}

const removeDoneTasks = () => {
    const tasks = getTasksFromLocalStorage()
    const tasksToRemove = tasks
        .filter(({checked}) => checked) // apenas marcadas com "checked"
        .map(({id}) => id) // apenas o id

    const updatedTasks = tasks.filter(({checked}) => !checked); // mantém as tasks não checadas
    setTaskInLocalStorage(updatedTasks)

    tasksToRemove.forEach((tasksToRemove) => { // pega todas as tasks marcadas com checked
        document
            .getElementById("todo-list") // pega o id da "li"
            .removeChild(document.getElementById(tasksToRemove)) // remove ela
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
    const [id] = event.target.id.split('-'); // pega apenas o id
    const tasks = getTasksFromLocalStorage();

    const updatedTasks = tasks.map((task) => {
        return parseInt(task.id) === parseInt(id) // avalia se o id é igual
            ? {...task, checked: event.target.checked}
            : task
    })

    setTaskInLocalStorage(updatedTasks)
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
    const tasks = getTasksFromLocalStorage()
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

    const tasks = getTasksFromLocalStorage()
    const updatedTasks = [
        ...tasks, 
        {id: newTaskData.id, description: newTaskData.description, checked:false}
    ]
    setTaskInLocalStorage(updatedTasks)

    document.getElementById('description').value = ''
}

window.onload = function() { // função que é carregada junto com a página
    const form = document.getElementById('create-todo-form');
    form.addEventListener('submit', createTask)

    const tasks = getTasksFromLocalStorage()
    tasks.forEach((task) => { // para cada task
        const checkbox = getCheckboxInput(task); // Constante que chama a função getCheckboxInput e passa como parâmetro a lista 
        createTaskListItem(task, checkbox)
    })
}