// Seleciona o container onde as necessidades serão exibidas
const lista = document.getElementById('listaNecessidades');

// Seleciona o campo de pesquisa por palavra-chave
const pesquisa = document.getElementById('pesquisa');

// Seleciona o campo de filtro por tipo de ajuda
const filtro = document.getElementById('filtroTipo');

// Recupera as necessidades salvas no localStorage (ou inicia com array vazio)
let necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];

/**
 * Função responsável por renderizar dinamicamente a lista de necessidades
 * com base nos critérios de pesquisa e filtro selecionados pelo usuário.
 */
function renderizarLista() {
    // Converte o termo digitado para minúsculas para busca case-insensitive
    const termo = pesquisa.value.toLowerCase();

    // Obtém o tipo de ajuda selecionado no filtro
    const tipo = filtro.value;

    // Limpa o conteúdo atual da lista para renderizar novamente
    lista.innerHTML = '';

    // Filtra as necessidades com base no termo digitado e tipo selecionado
    necessidades.filter(n => {
        // Verifica se o título ou a descrição contém o termo digitado
        const corresponde = n.titulo.toLowerCase().includes(termo) || n.descricao.toLowerCase().includes(termo);

        // Verifica se o tipo selecionado corresponde (ou se está em branco)
        const tipoOk = tipo === '' || n.tipoAjuda === tipo;

        // Retorna verdadeiro apenas se ambos os critérios forem satisfeitos
        return corresponde && tipoOk;

    }).forEach(n => {
        // Cria dinamicamente um card com os dados da necessidade
        const card = document.createElement('div');
        card.className = 'card';

        // Define o conteúdo HTML do card com os principais dados
        card.innerHTML = `
            <h3>${n.titulo}</h3>
            <p><strong>Instituição:</strong> ${n.instituicao}</p>
            <p><strong>Tipo:</strong> ${n.tipoAjuda}</p>
            <p>${n.descricao}</p>
        `;

        // Adiciona o card à lista na página
        lista.appendChild(card);
    });
}

// Atualiza a lista sempre que o usuário digitar algo no campo de pesquisa
pesquisa.addEventListener('input', renderizarLista);

// Atualiza a lista sempre que o usuário mudar o tipo de filtro
filtro.addEventListener('change', renderizarLista);

// Chama a função ao carregar a página para exibir a lista inicial
renderizarLista();
