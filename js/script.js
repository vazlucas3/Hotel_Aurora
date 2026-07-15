// Pega os elementos do formulário que vamos usar
const formulario = document.getElementById("formContato");
const campoCep = document.getElementById("cep");
const campoRua = document.getElementById("rua");
const campoCidade = document.getElementById("cidade");
const campoEstado = document.getElementById("estado");
const feedback = document.getElementById("formFeedback");

/* -----------------------------------------------------
PARTE 1: Consumo da API ViaCEP
Quando o usuário termina de digitar o CEP (evento "blur",
ou seja, quando ele sai do campo), buscamos o endereço.
----------------------------------------------------- */

// Deixa o CEP só com números enquanto o usuário digita
campoCep.addEventListener("input", function () {
campoCep.value = campoCep.value.replace(/\D/g, "").slice(0, 8);
});

// Busca o endereço na API assim que o campo perde o foco
campoCep.addEventListener("blur", buscarEnderecoPeloCep);

async function buscarEnderecoPeloCep() {
const cep = campoCep.value;

// Um CEP válido tem 8 números. Se não tiver, não buscamos nada.
if (cep.length !== 8) {
    return;
}

try {
    mostrarFeedback("Buscando endereço...", "info");

    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    // A API do ViaCEP retorna { erro: true } quando o CEP não existe
    if (dados.erro) {
    mostrarFeedback("CEP não encontrado. Verifique e tente novamente.", "erro");
    return;
    }

    // Preenche os campos automaticamente com os dados recebidos
    campoRua.value = dados.logradouro;
    campoCidade.value = dados.localidade;
    campoEstado.value = dados.uf;

    limparFeedback();
} catch (erro) {
    mostrarFeedback("Não foi possível buscar o CEP agora. Tente novamente.", "erro");
}
}

/* -----------------------------------------------------
PARTE 2: Validação do formulário
A regra é simples: só enviamos se TODOS os campos
obrigatórios estiverem preenchidos.
----------------------------------------------------- */

formulario.addEventListener("submit", function (evento) {
// Sempre impedimos o envio padrão do navegador primeiro
evento.preventDefault();

const formularioValido = validarFormulario();

if (formularioValido) {
    exibirMensagemDeAgradecimento();
} else {
    mostrarFeedback("Preencha todos os campos antes de enviar.", "erro");
}
});

function validarFormulario() {
// Pega todos os campos obrigatórios do formulário
const camposObrigatorios = formulario.querySelectorAll("[required]");
let tudoPreenchido = true;

camposObrigatorios.forEach(function (campo) {
    const estaVazio = campo.value.trim() === "";

    if (estaVazio) {
    tudoPreenchido = false;
    campo.classList.add("campo-invalido");
    } else {
    campo.classList.remove("campo-invalido");
    }
});

// Verifica também se o e-mail digitado tem um formato básico válido
const email = document.getElementById("email");
const emailValido = /\S+@\S+\.\S+/.test(email.value);

if (!emailValido) {
    tudoPreenchido = false;
    email.classList.add("campo-invalido");
}

return tudoPreenchido;
}

/* -----------------------------------------------------
PARTE 3: Mensagem de agradecimento
----------------------------------------------------- */

function exibirMensagemDeAgradecimento() {
const nome = document.getElementById("nome").value;

// Esconde o formulário e mostra uma mensagem no lugar dele
formulario.style.display = "none";

const mensagem = document.createElement("p");
mensagem.className = "form__feedback form__feedback--sucesso";
mensagem.textContent = `Obrigado, ${nome}! Recebemos sua mensagem e em breve entraremos em contato.`;

formulario.insertAdjacentElement("afterend", mensagem);
}

/* -----------------------------------------------------
Funções auxiliares para mostrar/limpar mensagens
----------------------------------------------------- */

function mostrarFeedback(texto, tipo) {
feedback.textContent = texto;
feedback.className = "form__feedback";

    if (tipo === "erro") {
        feedback.classList.add("form__feedback--erro");
    } else if (tipo === "sucesso") {
        feedback.classList.add("form__feedback--sucesso");
    }
}

function limparFeedback() {
    feedback.textContent = "";
    feedback.className = "form__feedback";
}
