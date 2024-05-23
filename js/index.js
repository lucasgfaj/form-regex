document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.getElementById('cadastro-form');

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

    // Se o formulário for válido, exibir os dados capturados na tela
    const cardNome = document.getElementById('card-nome');
    const cardEmail = document.getElementById('card-email');
    const cardIdade = document.getElementById('card-idade');
    cardNome.textContent = nome.value;
    cardEmail.textContent = email.value;
    cardIdade.textContent = idade.value;
  });

  const botaoLimpar = document.getElementById('limpar');
  botaoLimpar.addEventListener('click', function() {
    const campos = document.querySelectorAll('input');
    campos.forEach(function(campo) {
      campo.value = '';
      campo.classList.remove('invalid');
    });
    const mensagensErro = document.querySelectorAll('.error');
    mensagensErro.forEach(function(mensagem) {
      mensagem.textContent = '';
    });
  });

  function mostrarMensagemDeErro(campo) {
    const spanErro = document.getElementById(`${campo.id}-error`);
    spanErro.textContent = campo.validationMessage;
    campo.classList.add('invalid');
  }

  class DadosFormulario {
    constructor(nome, email, idade) {
      this.nome = nome;
      this.email = email;
      this.idade = idade;
    }
  }
});