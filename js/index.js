$(document).ready(function() {
  const formulario = $('#cadastro-form');

  // Aplicar máscaras de entrada
  $('#idade').mask('00');

  // Função para mostrar mensagem de erro
  function mostrarMensagemDeErro(campo) {
    const spanErro = $(`#${campo.id}-error`);
    spanErro.text(campo.validationMessage);
    $(campo).addClass('invalid');
  }

  // Função para salvar os dados no localStorage, apenas se não houver nenhum cadastro anterior
  function salvarDadosNoLocalStorage(dados) {
    let dadosCadastrados = JSON.parse(localStorage.getItem('dadosCadastrados')) || [];

    if (dadosCadastrados.length === 0) {
      dadosCadastrados.push(dados);
      localStorage.setItem('dadosCadastrados', JSON.stringify(dadosCadastrados));
      return true; // Dados foram salvos com sucesso
    } else {
      return false; // Já existe um cadastro, não foi possível salvar
    }
  }

  // Função para limpar os dados do localStorage
  function limparLocalStorage() {
    localStorage.removeItem('dadosCadastrados');
  }

  // Função para carregar dados do localStorage e exibir na tela com animação
  function carregarDadosDoLocalStorage() {
    const dadosCadastrados = JSON.parse(localStorage.getItem('dadosCadastrados')) || [];
    const dadosContainer = $('#dados-cadastrados');

    if (dadosCadastrados.length > 0) {
      dadosContainer.html('<h3>Dados Cadastrados:</h3>');

      dadosCadastrados.forEach(dado => {
        const nomeElemento = $('<p>').text(`Nome: ${dado.nome}`);
        const emailElemento = $('<p>').text(`E-mail: ${dado.email}`);
        const idadeElemento = $('<p>').text(`Idade: ${dado.idade}`);

        dadosContainer.append(nomeElemento, emailElemento, idadeElemento);
      });

      dadosContainer.removeClass('hidden').hide().fadeIn(1000); // Remover classe hidden e aplicar fade-in
    } else {
      dadosContainer.addClass('hidden'); // Esconder o container se não houver dados
    }
  }

  // Função para enviar os dados para o servidor JSON usando Fetch API
  function salvarDadosNoServidor(dados) {
    fetch('http://localhost:3000/dados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ocorreu um problema ao salvar os dados no servidor.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Dados enviados para o servidor:', data);
      alert('Dados salvos com sucesso no servidor!');
    })
    .catch(error => {
      console.error('Erro ao enviar dados para o servidor:', error);
      alert('Erro ao salvar os dados no servidor. Verifique o console para mais detalhes.');
    });
  }

  // Evento de submit do formulário
  formulario.on('submit', function(event) {
    event.preventDefault(); // Evitar envio do formulário

    const nome = $('#nome')[0];
    const email = $('#email')[0];
    const idade = $('#idade')[0];

    if (!formulario[0].checkValidity()) {
      // Se o formulário não for válido, exibir mensagens de erro
      mostrarMensagemDeErro(nome);
      mostrarMensagemDeErro(email);
      mostrarMensagemDeErro(idade);
      return;
    }

    // Criar objeto com os dados do formulário
    const dadosFormulario = {
      nome: nome.value,
      email: email.value,
      idade: idade.value
    };

    // Tentar salvar os dados no localStorage
    const sucessoLocalStorage = salvarDadosNoLocalStorage(dadosFormulario);
    if (sucessoLocalStorage) {
      // Tentar salvar os dados no servidor JSON usando Fetch API
      salvarDadosNoServidor(dadosFormulario);
      
      // Atualizar exibição dos dados apenas se os dados foram salvos com sucesso no localStorage
      carregarDadosDoLocalStorage();
      // Limpar formulário
      formulario[0].reset();
    } else {
      // Se não foi possível salvar os dados no localStorage, exibir mensagem de alerta
      alert('Só é permitido um cadastro por vez.');
    }
  });

  // Evento de click do botão Limpar
  $('#limpar').on('click', function() {
    // Limpar campos e mensagens de erro
    $('input').each(function() {
      $(this).val('').removeClass('invalid');
    });
    $('.error').each(function() {
      $(this).text('');
    });

    // Limpar dados do localStorage
    limparLocalStorage();

    // Limpar dados exibidos na tela e esconder o card
    $('#dados-cadastrados').html('<h3>Dados Cadastrados:</h3>').addClass('hidden');
  });

  // Carregar dados do localStorage ao carregar a página
  carregarDadosDoLocalStorage();
});
