const campoTexto = document.querySelector(".campo")
const adicionaTarefa = document.querySelector(".adicionaTarefa")
const tarefas = document.querySelector(".tarefas")


function criaLi(){
    const li = document.createElement('li');
    return li;
}

campoTexto.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
    if(!campoTexto.value) return;
    criaTarefa(campoTexto.value);}
});

function limpaCampo(){
    campoTexto.value = '';
    campoTexto.focus();
}

function apagaTarefa(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText='Apagar';
    botaoApagar.setAttribute('class','apagar')
    li.appendChild(botaoApagar);

}

function criaTarefa(textoCampo){
    const li = criaLi()
    li.innerText = textoCampo;
    tarefas.appendChild(li)
    limpaCampo();
    apagaTarefa(li);
    salvaTarefas();
}

adicionaTarefa.addEventListener('click', function(){
    if(!campoTexto.value) return;
    criaTarefa(campoTexto.value);
})
document.addEventListener('click',function(e){
    const el = e.target;
    if (el.classList.contains('apagar')){
        el.parentElement.remove();
        salvaTarefas(); // apagando ela do localstorage.
    }
})


//CRIANDO UMA FORMA DE SALVAR AS TAREFAS APÓS FECHAR O NAVEGADOR 

function salvaTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaTarefas = [];

    for (let tarefa of liTarefas){
    let tarefaTexto = tarefa.innerText; //criando uma variavel pra retirar o "apagar" da lista
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();// substituindo o "apagar" por uma string vazia
    listaTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaTarefas); // transformando o array em string JSON
    localStorage.setItem('tarefas',tarefasJSON); // guardando os dados de uma forma que podemos recuperar depois
} 
 function tarefaSalvas(){
   const tarefas = localStorage.getItem('tarefas');
   const listaTarefas = JSON.parse(tarefas);

   for (let tarefas of listaTarefas){
    criaTarefa(tarefas);
   }

 }
 tarefaSalvas()