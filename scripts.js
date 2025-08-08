//Seleciona os elementos do formulário
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');
const expenseInput = document.querySelector('#expense');
const categoryInput = document.querySelector('#category');
const dateInput = document.querySelector('#date');

//Seleciona os elementos da lista de despesas
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2");

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
        amount: amountInput.value,
        created_at: new Date(),
    };

    expenseAdd(newExpense); // Chama a função para adicionar a despesa
}

//Adiciona um novo item de despesa à lista
function expenseAdd(newExpense){
    try {
        //Cria o elemento para lista
        const expenseItem = document.createElement('li');
        expenseItem.classList.add("expense");

        //Cria o ícone da categoria
        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        //Cria a informação da despesa
        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");

        //Cria o nome da despesa
        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense;

        //Cria a categoria da despesa
        const expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExpense.category_name;

        //Adiciona name e category na div de informações
        expenseInfo.append(expenseName, expenseCategory);

        //Cria o valor da despesa
        const expenseAmount = document.createElement("span");
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.replace('R$', '')}`;

        //Cria o ícone de remover
        const removeIcon = document.createElement("img");
        removeIcon.classList.add("remove-icon");
        removeIcon.setAttribute("src", "img/remove.svg");
        removeIcon.setAttribute("alt", "Remover despesa");

        //Adiciona as informações do item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

        //Adiciona o item na lista
        expenseList.append(expenseItem);

        //Atualiza os totais de despesas
        updateTotals();


    } catch (error) {
        alert('Erro ao adicionar despesa: ' + error.message);
        // Loga o erro no console para depuração
        console.error('Erro ao adicionar despesa:', error);
    }
}

//Atualiza os totais de despesas
function updateTotals() {
    try {
        // Seleciona todos os itens de despesa
        const items = expenseList.children
        
        // Atualiza a quantidade de despesas
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? 'despesas' : 'despesa'}`;

        //Váriavel para incrementar o total
        let total = 0;
        for (let item = 0; item < items.length; item++) {
            //Seleciona o valor do item
            const itemAmount = items[item].querySelector('.expense-amount').textContent;

            let value = itemAmount.replace(/[^\d,]/g, '').replace(",", "."); 

            // Converte o valor para float
            value = parseFloat(value);

            //Verifica se o valor é um número
            if (isNaN(value)) {
                return alert('Erro ao calcular o total: valor inválido encontrado.');
            }

            //Incrementa o total
            total += Number(value);
        }

        //Cria a span para adicionar o R$ formatado
        const symbolBRL = document.createElement("small");
        symbolBRL.textContent = "R$";

        total = formatCurrency(total).toUpperCase().replace("R$", "");

        // Limpa o conteúdo do elemento
        expensesTotal.innerHTML = '';

        //
        expensesTotal.append(symbolBRL, total);

    } catch (error) {
        alert('Erro ao atualizar totais.');
    }
}



