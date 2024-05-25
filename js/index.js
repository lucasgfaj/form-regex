document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.getElementById('cadastro-form');

  // Função para mostrar mensagem de erro
  function mostrarMensagemDeErro(campo) {
    const spanErro = document.getElementById(`${campo.id}-error`);
    spanErro.textContent = campo.validationMessage;
    campo.classList.add('invalid');
  }

  // Função para salvar os dados no localStorage, apenas se não houver nenhum cadastro anterior
  function salvarDadosNoLocalStorage(dados) {
    let dadosCadastrados = JSON.parse(localStorage.getItem('dadosCadastrados')) || [];

    // Verificar se já existe algum cadastro
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

  // Função para carregar dados do localStorage e exibir na tela
  function carregarDadosDoLocalStorage() {
    const dadosCadastrados = JSON.parse(localStorage.getItem('dadosCadastrados')) || [];
    const dadosContainer = document.getElementById('dados-cadastrados');

    dadosContainer.innerHTML = '<h3>Dados Cadastrados:</h3>';

    dadosCadastrados.forEach(dado => {
      const nomeElemento = document.createElement('p');
      nomeElemento.textContent = `Nome: ${dado.nome}`;
      const emailElemento = document.createElement('p');
      emailElemento.textContent = `E-mail: ${dado.email}`;
      const idadeElemento = document.createElement('p');
      idadeElemento.textContent = `Idade: ${dado.idade}`;

      dadosContainer.appendChild(nomeElemento);
      dadosContainer.appendChild(emailElemento);
      dadosContainer.appendChild(idadeElemento);
    });
  }

  // Evento de submit do formulário
  formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar envio do formulário

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const idade = document.getElementById('idade');

    if (!formulario.checkValidity()) {
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
    const sucesso = salvarDadosNoLocalStorage(dadosFormulario);
    if (sucesso) {
      // Atualizar exibição dos dados apenas se os dados foram salvos com sucesso
      carregarDadosDoLocalStorage();
      // Limpar formulário
      formulario.reset();
    } else {
      // Se não foi possível salvar os dados, exibir mensagem de alerta
      alert('Só é permitido um cadastro por vez.');
    }
  });

  // Evento de click do botão Limpar
  const botaoLimpar = document.getElementById('limpar');
  botaoLimpar.addEventListener('click', function() {
    // Limpar campos e mensagens de erro
    const campos = document.querySelectorAll('input');
    campos.forEach(function(campo) {
      campo.value = '';
      campo.classList.remove('invalid');
    });
    const mensagensErro = document.querySelectorAll('.error');
    mensagensErro.forEach(function(mensagem) {
      mensagem.textContent = '';
    });

    // Limpar dados do localStorage
    limparLocalStorage();

    // Limpar dados exibidos na tela
    const dadosContainer = document.getElementById('dados-cadastrados');
    dadosContainer.innerHTML = '<h3>Dados Cadastrados:</h3>';
  });

  // Carregar dados do localStorage ao carregar a página
  carregarDadosDoLocalStorage();
});
