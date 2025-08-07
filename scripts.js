//Seleciona os elementos do formulário
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');
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




