var lista_hospedes = [];
var quartos_ocupados = Array(20).fill(false); // Inicializa todos os quartos como livres.

var nomeUsuario;

function inicio() {
    alert("Seja bem-vindo(a) ao Vista Garden!");

    var nome = prompt("Por favor, informe seu nome:");
    var senha = prompt("Por favor, informe sua senha:");

    if (senha === "2678") {
        nomeUsuario = nome;
        alert(`Bem-vindo ao Hotel Vista Garden, ${nome}. É um imenso prazer ter você por aqui!`);
        menuOpcoes();
    } else {
        alert("Senha incorreta. Tente novamente.");
        inicio();
    }
}

function menuOpcoes() {
    var escolha = parseInt(prompt(`Menu de Opções:
1. Cadastrar Hóspedes
2. Pesquisar Hóspedes
3. Reservar Quarto
4. Sair`));

    switch (escolha) {
        case 1:
            sistema_cadastrar_hospedes();
            break;
        case 2:
            pesquisar_hospedes();
            break;
        case 3:
            reservar_quarto();
            break;
        case 4:
            alert(`Muito obrigado e até logo, ${nomeUsuario}.`);
            break;
        default:
            erro();
            break;
    }
}

function sistema_cadastrar_hospedes() {
    var escolha_hospedes = parseInt(prompt('Cadastro de Hóspedes\n\n Selecione uma opção: \n1. Cadastrar \n2. Pesquisar \n3. Sair'));

    switch (escolha_hospedes) {
        case 1:
            cadastrar_hospedes();
            break;
        case 2:
            pesquisar_hospedes();
            break;
        case 3:
            menuOpcoes();
            break;
        default:
            erro();
            break;
    }
}

function cadastrar_hospedes() {
    if (lista_hospedes.length >= 15) {
        alert("Número máximo de hóspedes cadastrados.");
    } else {
        var nome_hospede = prompt('Por favor, informe o nome da(o) hóspede:');
        lista_hospedes.push(nome_hospede);
        console.log(lista_hospedes); // O console é usado apenas para exibir ao desenvolvedor todo mundo que já está cadastrado.
        alert("Sucesso! Hóspede " + nome_hospede + " foi cadastrado(a) com sucesso!\n");
    }

    sistema_cadastrar_hospedes();
}

function pesquisar_hospedes() {
    var nome_hospede = prompt('Por favor, informe o nome da(o) hóspede para pesquisa:');
    if (lista_hospedes.includes(nome_hospede)) {
        alert(nome_hospede + ' encontrada(o).');
    } else {
        alert(nome_hospede + ' não foi encontrada(o).');
    }

    sistema_cadastrar_hospedes();
}

function erro() {
    alert('Por favor, informe um número válido entre 1 e 4');
    menuOpcoes();
}

function reservar_quarto() {
    var valorDiaria = parseFloat(prompt('Qual o valor padrão da diária?'));
    var qtdDias = parseInt(prompt('Quantas diárias serão necessárias?'));

    if (valorDiaria <= 0 || qtdDias <= 0 || qtdDias > 30) {
        alert('Valor inválido.');
        inicio();
        return;
    }

    var total = valorDiaria * qtdDias;
    alert(`O valor de ${qtdDias} dias de hospedagem é de R$${total.toFixed(2)}`);

    var nomeHospede = prompt('Qual o nome do hóspede?');

    var numQuarto;
    do {
        numQuarto = parseInt(prompt('Qual o quarto para reserva? (1 - 20)?'));
        if (numQuarto < 1 || numQuarto > 20) {
            alert('Número de quarto inválido.');
        } else if (quartos_ocupados[numQuarto - 1]) {
            alert('Quarto já está ocupado. Escolha outro.');
        } else {
            quartos_ocupados[numQuarto - 1] = true;
            alert('Quarto Livre.');
            break;
        }
    } while (true); 
    
    

    var confirmacao = prompt(`${nomeUsuario}, você confirma a hospedagem para ${nomeHospede} por ${qtdDias} dias para o quarto ${numQuarto} por R$${total.toFixed(2)}? (S/N)`);

    if (confirmacao.toUpperCase() === 'S') {
        alert(`${nomeUsuario}, reserva efetuada para ${nomeHospede}.`);
    }

    menuOpcoes();
}

inicio();