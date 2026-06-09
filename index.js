

function init() {

	// uma classe para estilizar
	const app = document.getElementById('app');
    app.classList.add('container');
   
    // o nome da aplicação
	const title = document.createElement('h1');
	title.textContent = 'Minha lista 🛒';
		
    //input para digitar tarefa
	const inputArea = document.createElement('div');
	inputArea.classList.add('input-area');
	
	const input = document.createElement('input');
	input.placeholder = 'Digite aqui';
	
	const addBtn = document.createElement('button');
	addBtn.textContent = 'Adicionar';

	const lista = document.createElement('ul');
	lista.id = "lista";

	const topo = document.createElement("div");
	topo.classList.add("topo-fixo");
	// inserir na div
	inputArea.appendChild(input);
	inputArea.appendChild(addBtn);
    // inserir no indirectamente no body 
	app.appendChild(title)
	topo.appendChild(inputArea);
	app.appendChild(topo)
	app.appendChild(lista)
	


	let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // localStorage.getItem('tasks'): Procura no armazenamento local do navegador (Web Storage) uma chave com o nome 'tasks'. O localStorage guarda os dados como texto (strings).JSON.parse(...): Converte a string de texto recuperada de volta num objeto ou array manipulável pelo JavaScript.

	// Funcoes



	function saveTasks() {
		localStorage.setItem('tasks', JSON.stringify(tasks)) // A função saveTasks() serve para gravar permanentemente a sua lista de tarefas no navegador.Isto garante que as tarefas não desaparecem quando o utilizador atualiza a página ou fecha o browser.
	}

	function createTaskElement(task, index) {

    const li = document.createElement("li");
    const span = document.createElement("span");

    span.textContent = task.text;
    if(task.done) {
        span.classList.add("completed");
    }

    li.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;

      saveTasks();
      render();
    });






    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✖️";

    removeBtn.classList.add("delete-btn");

    removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const wantToDelete = confirm("Eliminar item?");

        if(!wantToDelete) return;
       li.classList.add("remover");
	   setTimeout(() => {
		tasks.splice(index, 1);
		saveTasks;
		render();
	   }, 300);
    });





const checkBtn = document.createElement("button");
checkBtn.classList.add("check-btn");
if(task.done) {
	checkBtn.textContent = "✔️"
}

checkBtn.addEventListener("click", (e) => {
	e.stopPropagation();

	task.done = !task.done;
	saveTasks();
	render();
})


    //li.appendChild(checkBtn); 
    li.appendChild(span);
    li.appendChild(removeBtn);
    return li;

}

 // atualizar o ecrã
	function render() {
		lista.innerHTML = '';
		tasks.forEach((task, index) => {
         lista.appendChild(createTaskElement(task, index));

		});

	}
	addBtn.addEventListener('click', () => {
		const text = input.value.trim();
		if(!text) return;

		tasks.push({
			text, done: false
		});
		input.value = '';

		saveTasks();
		render();
	});
render();

//. Desmarcar

const btnDesmarcarTudo = document.getElementById("btnDesmarcarTudo");

btnDesmarcarTudo.addEventListener("click", () => {

	const existeRiscado = tasks.some((task) => task.done);
    if(!existeRiscado) return;

	const confirmar = confirm("Desmarcar o(s) item(itens) da lista?");
	if(!confirmar) return;
    tasks.forEach((task) => {
		if(task.done) {
        task.done = false;
		}
    });

    saveTasks();
    render();
    
});

 // Eliminar botão
const btnEliminarTudo = document.getElementById("btnEliminarTudo");

btnEliminarTudo.addEventListener('click', () => {
const temConcluidas = tasks.some(task => task.done);
if(temConcluidas) {
	const eliminarConcluidas = confirm("Eliminar o(s) item(itens) concluído(s)?");
	
	if(eliminarConcluidas) {
		tasks = tasks.filter(task => !task.done);


		saveTasks();
		render();
		return;
	}
}


const eliminarTudo = confirm("Eliminar o(s) item(itens) da lista?");

if(eliminarTudo) {
	tasks = [];

	saveTasks();
	render();
}
});
}
init();

if("serviceWorker" in navigator) {
	navigator.serviceWorker.register("./service-worker.js")
	.then(() => {
		console.log("Service Worker registado");
	})
	.catch((erro) => {
		console.log("Erro", erro);
	});
}
// falta o offline