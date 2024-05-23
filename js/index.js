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
    const dadosCadastradosDiv = document.getElementById('dados-cadastrados');
    const dados = new DadosFormulario(nome.value, email.value, idade.value);
    dadosCadastradosDiv.innerHTML = `
      <h2>Dados Cadastrados:</h2>
      <p>Nome: ${dados.nome}</p>
      <p>E-mail: ${dados.email}</p>
      <p>Idade: ${dados.idade}</p>
    `;
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
