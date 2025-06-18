// Seleciona o formulário pelo ID
const form = document.getElementById('formCadastro');

// Recupera as necessidades salvas no localStorage (se houver) ou inicializa um array vazio
let necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];

// Evento que dispara quando o campo de CEP perde o foco (blur)
form.cep.addEventListener('blur', () => {
    // Remove qualquer caractere que não seja número
    const cep = form.cep.value.replace(/\D/g, '');

    // Se o CEP tiver exatamente 8 dígitos, realiza a consulta na API ViaCEP
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json()) // Converte a resposta para JSON
            .then(data => {
                // Preenche automaticamente os campos de endereço com os dados retornados
                form.rua.value = data.logradouro || '';
                form.bairro.value = data.bairro || '';
                form.cidade.value = data.localidade || '';
                form.estado.value = data.estado || '';
            });
    }
});

// Evento que trata o envio do formulário
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Cria um objeto com os dados preenchidos no formulário
    const necessidade = {
        instituicao: form.instituicao.value,
        tipoAjuda: form.tipoAjuda.value,
        titulo: form.titulo.value,
        descricao: form.descricao.value,
        cep: form.cep.value,
        rua: form.rua.value,
        bairro: form.bairro.value,
        cidade: form.cidade.value,
        estado: form.estado.value,
        contato: form.contato.value
    };

    // Adiciona a nova necessidade ao array
    necessidades.push(necessidade);

    // Salva o array atualizado no localStorage como string JSON
    localStorage.setItem('necessidades', JSON.stringify(necessidades));

    // Exibe mensagem de sucesso
    alert('Necessidade cadastrada com sucesso!');

    // Limpa o formulário
    form.reset();
});
