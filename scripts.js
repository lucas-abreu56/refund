//Seleciona os elementos do formulário
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');
const expenseInput = document.querySelector('#expense');
const categoryInput = document.querySelector('#category');
const dateInput = document.querySelector('#date');

//Adiciona um evento de input ao formulário
amountInput.oninput = function() {
    // Remove todos os caracteres que não sejam dígitos
    let value = amountInput.value.replace(/\D/g, '');

    // Converte o valor para centavos
    value = Number(value) / 100;

    // Atualiza o valor do input para exibir apenas números
    amountInput.value = formatCurrency(value);
}

function formatCurrency(value) {
    // Formata o valor como moeda brasileira
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
    //Retorna o valor formatado
    return value;
}

form.onsubmit = function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Cria um objeto com os dados do formulário
    const newExpense = {
        id: new Date().getTime(), // Gera um ID único baseado no timestamp
        expense: expenseInput.value,
        category_id: categoryInput.value,
        category_name: categoryInput.options[categoryInput.selectedIndex].text,
        amountInput: amountInput.value,
        created_at: new Date(),
    };

    expenseAdd(newExpense); // Chama a função para adicionar a despesa
}

function expenseAdd(newExpense){
    try {
        //Cria o elemento para lista
        const expenseItem = document.createElement('li');
        expenseItem.classList.add("expense");

        //Cria o ícone da caategoria
        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        //Adiciona as informações do item
        expenseItem.append(expenseIcon);
    } catch (error) {
        alert('Erro ao adicionar despesa: ' + error.message);
        // Loga o erro no console para depuração
        console.error('Erro ao adicionar despesa:', error);
    }
}




