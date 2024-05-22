document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.getElementById('cadastro-form');
  const dadosCadastradosDiv = document.getElementById('dados-cadastrados');

  formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar envio do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const idade = document.getElementById('idade').value;

    if (!isValidEmail(email)) {
      // Exibir mensagem de erro para o usuário
      const errorMessage = document.querySelector('#email + .error-message');
      errorMessage.textContent = 'Por favor, insira um endereço de e-mail válido.';
      return;
    }

    if (nome && email && idade) {
      const dados = new DadosFormulario(nome, email, idade);
      dadosCadastradosDiv.innerHTML = `
        <h2>Dados Cadastrados:</h2>
        <p><strong>Nome:</strong> ${dados.nome}</p>
        <p><strong>E-mail:</strong> ${dados.email}</p>
        <p><strong>Idade:</strong> ${dados.idade}</p>
      `;
    } else {
      alert('Por favor, preencha todos os campos do formulário.');
    }
  });

  const botaoLimpar = document.getElementById('limpar');
  botaoLimpar.addEventListener('click', function() {
    const campos = document.querySelectorAll('input');
    campos.forEach(function(campo) {
      campo.value = ' ';
    });
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  class DadosFormulario {
    constructor(nome, email, idade) {
      this.nome = nome;
      this.email = email;
      this.idade = idade;
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.getElementById('cadastro-form');
  const dadosCardNome = document.getElementById('card-nome');
  const dadosCardEmail = document.getElementById('card-email');
  const dadosCardIdade = document.getElementById('card-idade');

  formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const idade = document.getElementById('idade').value;

    if (nome && email && idade) {
      dadosCardNome.textContent = nome;
      dadosCardEmail.textContent = email;
      dadosCardIdade.textContent = idade;
    } else {
      alert('Por favor, preencha todos os campos do formulário.');
    }
  });

  const botaoLimpar = document.getElementById('limpar');
  botaoLimpar.addEventListener('click', function() {
    const campos = document.querySelectorAll('input');
    campos.forEach(function(campo) {
      campo.value = '';
    });

    dadosCardNome.textContent = '';
    dadosCardEmail.textContent = '';
    dadosCardIdade.textContent = '';
  });
});
