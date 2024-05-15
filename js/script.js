  // Definindo uma classe para armazenar os dados do formulário
  class DadosFormulario {
    constructor(nome, email, idade) {
      this.nome = nome;
      this.email = email;
      this.idade = idade;
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('cadastro-form');
    const dadosCadastradosDiv = document.getElementById('dados-cadastrados');

    formulario.addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar envio do formulário

      // Capturando os dados do formulário
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const idade = document.getElementById('idade').value;

      // Criando um objeto com os dados capturados
      const dados = new DadosFormulario(nome, email, idade);

      // Exibindo os dados na div
      dadosCadastradosDiv.innerHTML = `
        <h2>Dados Cadastrados:</h2>
        <p><strong>Nome:</strong> ${dados.nome}</p>
        <p><strong>E-mail:</strong> ${dados.email}</p>
        <p><strong>Idade:</strong> ${dados.idade}</p>
      `;
    });

    // Tratador de evento para o botão "Limpar"
    const botaoLimpar = document.getElementById('limpar');
    botaoLimpar.addEventListener('click', function() {
      const campos = document.querySelectorAll('input');
      campos.forEach(function(campo) {
        campo.value = '';
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.getElementById('cadastro-form');
  const dadosCadastradosDiv = document.getElementById('dados-cadastrados');

  formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar envio do formulário

    // Capturando os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const idade = document.getElementById('idade').value;

    // Validar o campo de e-mail
    if (!isValidEmail(email)) {
      // Exibir mensagem de erro para o usuário
      alert('Por favor, insira um endereço de e-mail válido.');
      return;
    }

    // Criando um objeto com os dados capturados
    const dados = new DadosFormulario(nome, email, idade);

    // Exibindo os dados na div
    dadosCadastradosDiv.innerHTML = `
      <h2>Dados Cadastrados:</h2>
      <p><strong>Nome:</strong> ${dados.nome}</p>
      <p><strong>E-mail:</strong> ${dados.email}</p>
      <p><strong>Idade:</strong> ${dados.idade}</p>
    `;
  });

  // Tratador de evento para o botão "Limpar"
  const botaoLimpar = document.getElementById('limpar');
  botaoLimpar.addEventListener('click', function() {
    const campos = document.querySelectorAll('input');
    campos.forEach(function(campo) {
      campo.value = '';
    });
  });

  // Função para validar o formato do e-mail
  function isValidEmail(email) {
    // Expressão regular para verificar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Definindo uma classe para armazenar os dados do formulário
  class DadosFormulario {
    constructor(nome, email, idade) {
      this.nome = nome;
      this.email = email;
      this.idade = idade;
    }
  }
});

