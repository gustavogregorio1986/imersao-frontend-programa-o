let cardContainer = document.querySelector(".card-container");
let dados = [];

async function iniciarBusca(termoDeBusca = "") {
    // Busca os dados do JSON apenas na primeira vez
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Falha ao carregar os dados:", error);
            cardContainer.innerHTML = "<p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>";
            return;
        }
    }

    const termo = termoDeBusca.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termo) ||
        dado.descricao.toLowerCase().includes(termo)
    );

    rederizarCards(dadosFiltrados);
}

function rederizarCards(cardsParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes

    if (cardsParaRenderizar.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum resultado encontrado para sua busca.</p>";
        return;
    }

    for (let dado of cardsParaRenderizar) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.ano}</p> 
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `

        cardContainer.appendChild(article);
    }
}

// Adiciona um listener para o evento de 'input' no campo de busca
document.getElementById("search-input").addEventListener("input", (event) => {
    iniciarBusca(event.target.value);
});

// Chama a função para carregar os dados e exibir todos os cards inicialmente
iniciarBusca();