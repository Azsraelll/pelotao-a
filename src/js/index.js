// Definindo o preço inicial
let currentPrice = 20.00;

// Lista para armazenar os lances anteriores
let bidHistory = [];

// Contador para os lances do usuário
let userBidCount = 0;

// Nome do item a ser arrematado
const itemName = document.getElementById('item-name').textContent;

// Função que é chamada quando o usuário dá um lance
function placeBid() {
    // Obtendo o valor inserido pelo usuário
    const userBid = parseFloat(document.getElementById('bid-input').value);

    // Verifica se o valor do lance é maior que o preço atual
    if (userBid > currentPrice) {
        // Atualiza o preço atual com o valor do lance
        currentPrice = userBid;

        // Adiciona o lance à lista de lances anteriores
        bidHistory.push(userBid);
        userBidCount++; // Incrementa o contador de lances do usuário

        // Atualiza a interface exibindo o preço atual e os lances anteriores
        updateBidHistory();
        document.getElementById('current-price').textContent = currentPrice.toFixed(2);

        // Verifica se o usuário arrematou o item
        if (userBidCount === 3) {
            document.getElementById('message').textContent = `Você arrematou o ${itemName}!`;
            disableBidding(); // Desativa o campo de lance e o botão
        } else {
            // Exibe uma mensagem de sucesso
            document.getElementById('message').textContent = `Você fez o maior lance de R$ ${currentPrice.toFixed(2)}!`;
        }

        // Limpa o campo de entrada de lance
        document.getElementById('bid-input').value = '';
    } else {
        // Se o lance for menor ou igual ao preço atual, exibe uma mensagem de erro
        document.getElementById('message').textContent = 'Seu lance deve ser maior que o preço atual!';
    }
}

// Função para atualizar a lista de lances anteriores na tela
function updateBidHistory() {
    // Seleciona o elemento da lista de lances
    const bidHistoryElement = document.getElementById('bid-history');

    // Limpa a lista atual
    bidHistoryElement.innerHTML = '';

    // Adiciona cada lance da lista à interface
    bidHistory.forEach((bid) => {
        const listItem = document.createElement('li');
        listItem.textContent = 'Lance: R$ ' + bid.toFixed(2);
        bidHistoryElement.appendChild(listItem);
    });
}

// Função para desativar lances após o arremate
function disableBidding() {
    document.getElementById('bid-input').disabled = true;
    document.querySelector('button').disabled = true;
}

// Função para detectar pressionamento da tecla "Enter"
document.getElementById('bid-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        placeBid(); // Chama a função de dar lance quando "Enter" é pressionado
    }
});

// Simulando lances de outros usuários
let simulationInterval = setInterval(() => {
    const simulatedBid = currentPrice + Math.random() * 10;
    if (simulatedBid > currentPrice) {
        bidHistory.push(simulatedBid);
        currentPrice = simulatedBid;

        updateBidHistory();
        document.getElementById('current-price').textContent = currentPrice.toFixed(2);
        document.getElementById('message').textContent = 'Outro usuário fez o maior lance de R$ ' + currentPrice.toFixed(2) + '!';
    }
}, 10000); // Simula novos lances a cada 10 segundos
