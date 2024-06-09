var lista_hospedes = [];
var quartos_ocupados = Array(20).fill(false);
var meiadiaria = 0;
var diariagratis = 0;
var nomeUsuario;

function inicio() {
    alert("Seja bem-vindo(a) ao Vista Garden!");

    var nome = prompt("Por favor, informe seu nome:");
    var senha = prompt("Por favor, informe sua senha:");

    ///2678
    if (senha === "2") {
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
4. Evento
5. Combustivel
6. Calcular Orcamento`));

    switch (escolha) { // evento
        //verificarCombustivelMaisBarato
        //calcularOrcamento
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
            evento();
            break;
        case 5:
           combustivelBarato();
            break;
        case 6:
            calcularOrcamento();
            break;
        case 7:
            alert(`Muito obrigado e até logo, ${nomeUsuario}.`);
            break;
        default:
            erro();
            break;
    }
}

function sistema_cadastrar_hospedes() {
    var escolha_hospedes = parseInt(prompt('Cadastro de Hóspedes\n\n Selecione uma opção: \n1. Cadastrar \n2. Pesquisar \n3. Listar Hospedes \n4.Sair'));

    switch (escolha_hospedes) {
        case 1:
            cadastrar_hospedes();
            break;
        case 2:
            pesquisar_hospedes();
            break;
        case 3:
            listar_hospedes();
            break;
        case 4:
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
        var idade_hospede = prompt('Por favor, informe a idade da(o) hóspede:');
        lista_hospedes.push(nome_hospede);
        if (nome_hospede === "PARE") {
            cadastrar_hospedes();
        } if (idade_hospede <= 6) {
            diariagratis += 1; // Variavel de contagem de gratuidade
            alert(nome_hospede + " possui gratuidade.")
        } if (idade_hospede >= 60) {
            meiadiaria += 1; // Variavel de contagem de meia diaria
            alert(nome_hospede + " paga meia")
        }

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

function listar_hospedes() {
    alert('Lista de hospedes: ' + lista_hospedes);
    menuOpcoes();
}

function reservar_quarto() {
    var valorDiaria = parseFloat(prompt('Qual o valor padrão da diária?'));
    var qtdDias = parseInt(prompt('Quantas diárias serão necessárias?'));
    var qtdHospedes = prompt('Quantos hospedes são?');

    if (valorDiaria <= 0 || qtdDias <= 0 || qtdDias > 30) {
        alert('Valor inválido.');
        inicio();
        return;
    }

    if (qtdHospedes > 1) {
        for (x = 0; x <= qtdHospedes; x++) {
            var nomeHospede = prompt('Qual o nome do(s) hóspede?');
            if (!lista_hospedes.includes(nomeHospede)) {
                x--;
                alert(nomeHospede + ' não está na lista de hóspedes.');
            }
        }
        var total_hosp = (valorDiaria * qtdHospedes) * qtdDias;
        alert(`O valor de ${qtdDias} dias de hospedagem pela familia é de R$${total_hosp.toFixed(2)}`); // Mostrar quantidade de gratuidades e meia
    } else {
        var total = valorDiaria * qtdDias;

        alert(`O valor de ${qtdDias} dias de hospedagem é de R$${total.toFixed(2)}`);
    }



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

function verificarAuditorio(numConvidados) {
    const capacidadeLaranja = 150;
    const capacidadeAdicionalLaranja = 70;
    const capacidadeColorado = 350;

    if (numConvidados > 350 || numConvidados < 0) {
        console.log("Número de convidados inválido");
        return null;
    } else if (numConvidados <= capacidadeLaranja + capacidadeAdicionalLaranja) {
        let cadeirasAdicionais = 0;
        if (numConvidados > capacidadeLaranja) {
            cadeirasAdicionais = numConvidados - capacidadeLaranja;
        }
        console.log(`Use o auditório Laranja (inclua mais ${cadeirasAdicionais} cadeiras)`);
        return { auditório: "Laranja", cadeirasAdicionais: cadeirasAdicionais };
    } else if (numConvidados <= capacidadeColorado) {
        console.log("Use o auditório Colorado");
        return { auditório: "Colorado", cadeirasAdicionais: 0 };
    }
}

function verificarDisponibilidade(dia, hora) {
    const diasUteis = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];
    const fimDeSemana = ['sabado', 'domingo'];

    if (diasUteis.includes(dia)) {
        return (hora >= 7 && hora <= 23);
    } else if (fimDeSemana.includes(dia)) {
        return (hora >= 7 && hora <= 15);
    } else {
        return false;
    }
}


function calcularGarcons(numConvidados, duracaoEvento) {
    const convidadosPorGarcom = 12;
    const custoPorHoraGarcom = 10.50;

    let garconsNecessarios = Math.ceil(numConvidados / convidadosPorGarcom);
    let garconsExtras = Math.ceil(duracaoEvento / 2);
    garconsNecessarios += garconsExtras;

    let custoTotal = garconsNecessarios * duracaoEvento * custoPorHoraGarcom;

    return {
        garconsNecessarios: garconsNecessarios,
        custoTotal: custoTotal.toFixed(2)
    };
}

function calcularBuffet(numConvidados) {
    const cafePorConvidado = 0.2;
    const aguaPorConvidado = 0.5;
    const salgadosPorConvidado = 7;

    const custoCafePorLitro = 0.80;
    const custoAguaPorLitro = 0.40;
    const custoSalgadosPorCento = 34.00;

    let litrosCafe = numConvidados * cafePorConvidado;
    let litrosAgua = numConvidados * aguaPorConvidado;
    let quantidadeSalgados = numConvidados * salgadosPorConvidado;

    let custoCafe = litrosCafe * custoCafePorLitro;
    let custoAgua = litrosAgua * custoAguaPorLitro;
    let custoSalgados = Math.ceil(quantidadeSalgados / 100) * custoSalgadosPorCento;

    let custoTotalBuffet = (custoCafe + custoAgua + custoSalgados).toFixed(2);

    return {
        litrosCafe: litrosCafe.toFixed(1),
        litrosAgua: litrosAgua.toFixed(1),
        quantidadeSalgados: quantidadeSalgados,
        custoTotalBuffet: custoTotalBuffet
    };
}

function evento() {

var numConvidados = parseInt(prompt("Qual o número de convidados para o seu evento?"), 10);

var auditorio = verificarAuditorio(numConvidados);

if (auditorio) {

    var diaSemana = prompt("Qual o dia do seu evento?").toLowerCase();
    var horaEvento = parseInt(prompt("Qual a hora do seu evento?"), 10);
    

    if (verificarDisponibilidade(diaSemana, horaEvento)) {
        var nomeEmpresa = prompt("Qual o nome da empresa?");
        
        var duracaoEvento = parseInt(prompt("Qual a duração do evento em horas?"), 10);
        
        var resultadoGarcons = calcularGarcons(numConvidados, duracaoEvento);
        
        var resultadoBuffet = calcularBuffet(numConvidados);
        
        // Relatório completo
        console.log(`Evento no Auditório ${auditorio.auditório}.`);
        console.log(`Nome da Empresa: ${nomeEmpresa}.`);
        console.log(`Data: ${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)}, ${horaEvento}H às ${horaEvento + duracaoEvento}H.`);
        console.log(`Duração do evento: ${duracaoEvento}H.`);
        console.log(`Quantidade de garçons: ${resultadoGarcons.garconsNecessarios}.`);
        console.log(`Quantidade de Convidados: ${numConvidados}.`);
        console.log(`Custo dos garçons: R$${resultadoGarcons.custoTotal}.`);
        console.log(`O evento precisará de ${resultadoBuffet.litrosCafe} litros de café, ${resultadoBuffet.litrosAgua} litros de água, ${resultadoBuffet.quantidadeSalgados} salgados.`);
        console.log(`Custo do Buffet: R$${resultadoBuffet.custoTotalBuffet}.`);
        
        let custoTotalEvento = (parseFloat(resultadoGarcons.custoTotal) + parseFloat(resultadoBuffet.custoTotalBuffet)).toFixed(2);
        console.log(`Valor total do Evento: R$${custoTotalEvento}.`);
        

        var confirmacao = prompt("Gostaria de efetuar a reserva? S/N").toUpperCase();
        if (confirmacao === 'S') {
            console.log(`${nomeEmpresa}, reserva efetuada com sucesso.`);
        } else {
            console.log("Reserva não efetuada.");
        }
    } else {
        console.log("Auditório indisponível");
    }
}

}
function combustivelBarato() {

    function calcularCusto(valorCombustivel, litros) {
        return valorCombustivel * litros;
    }
    function AlcoolMaisBarato(valorAlcool, valorGasolina) {
        return valorAlcool <= (valorGasolina * 0.7);
    }

    var valorAlcoolWayne = parseFloat(prompt("Qual o valor do álcool no posto Wayne Oil?"));
    var valorGasolinaWayne = parseFloat(prompt("Qual o valor da gasolina no posto Wayne Oil?"));

    var valorAlcoolStark = parseFloat(prompt("Qual o valor do álcool no posto Stark Petrol?"));
    var valorGasolinaStark = parseFloat(prompt("Qual o valor da gasolina no posto Stark Petrol?"));
    const litros = 42;



    var custoAlcoolWayne = calcularCusto(valorAlcoolWayne, litros);
    var custoGasolinaWayne = calcularCusto(valorGasolinaWayne, litros);

    var custoAlcoolStark = calcularCusto(valorAlcoolStark, litros);
    var custoGasolinaStark = calcularCusto(valorGasolinaStark, litros);


    var alcoolMaisBaratoWayne = AlcoolMaisBarato(valorAlcoolWayne, valorGasolinaWayne);
    var alcoolMaisBaratoStark = AlcoolMaisBarato(valorAlcoolStark, valorGasolinaStark);

    if (alcoolMaisBaratoWayne) {
        menorCusto = custoAlcoolWayne;
        combustivelMaisBarato = "álcool";
        postoMaisBarato = "Wayne Oil";
    } else {
        menorCusto = custoGasolinaWayne;
        combustivelMaisBarato = "gasolina";
        postoMaisBarato = "Wayne Oil";
    }

    if (alcoolMaisBaratoStark && calcularCusto(valorAlcoolStark, litros) < menorCusto) {
        menorCusto = calcularCusto(valorAlcoolStark, litros);
        combustivelMaisBarato = "álcool";
        postoMaisBarato = "Stark Petrol";
    } else if (!alcoolMaisBaratoStark && calcularCusto(valorGasolinaStark, litros) < menorCusto) {
        menorCusto = calcularCusto(valorGasolinaStark, litros);
        combustivelMaisBarato = "gasolina";
        postoMaisBarato = "Stark Petrol";
    }


    alert(`É mais barato abastecer com ${combustivelMaisBarato} no posto ${postoMaisBarato}.`);
}

function calcularOrcamento() {
    let continuar = true;
    let menorOrcamento = Number.MAX_VALUE;
    let empresaMenorOrcamento = "";

    while (continuar) {
        let nomeEmpresa = prompt("Qual o nome da empresa?");
        let valorPorAparelho = parseFloat(prompt("Qual o valor por aparelho?"));
        let quantidadeAparelhos = parseInt(prompt("Qual a quantidade de aparelhos?"));
        let porcentagemDesconto = parseFloat(prompt("Qual a porcentagem de desconto?"));
        let quantidadeMinimaParaDesconto = parseInt(prompt("Qual o número mínimo de aparelhos para conseguir o desconto?"));



        let valorTotal = valorPorAparelho * quantidadeAparelhos;


        if (quantidadeAparelhos >= quantidadeMinimaParaDesconto) {
            let desconto = valorTotal * (porcentagemDesconto / 100);
            valorTotal -= desconto;
        }

        alert(`O serviço de ${nomeEmpresa} custará R$ ${valorTotal.toFixed(2)}`);

        if (valorTotal < menorOrcamento) {
            menorOrcamento = valorTotal;
            empresaMenorOrcamento = nomeEmpresa;
        }

        let resposta = prompt("Deseja informar novos dados? (S/N)").toUpperCase();
        if (resposta === 'N') {
            continuar = false;
        }
    }

    alert(`O orçamento de menor valor é o de ${empresaMenorOrcamento} por R$ ${menorOrcamento.toFixed(2)}`);
}
inicio();