//INICIO FORMULA NUMEROS POSTIVOS
function validarPositivo(input) {
    if (input.value < 0) {
        input.value = 0;
    }
}
//FIM FORMULA NUMEROS POSTIVOS

//INICIO FUNÇÃO DE CALCULAR QUANTIDADE MAXIMA DO INVERSOR
function calcularCapacidadePainel(inversorKw, potenciaPaineis) {
    const fator1 = 180;
    const fator2 = 140;

    // Aplicando a fórmula: inversorKw * 180 / 140 / potenciaPaineis * 1000
    const capacidadePainel = Math.floor((inversorKw * fator1 / fator2) / potenciaPaineis * 1000);
    return capacidadePainel;
}
//FIM FUNÇÃO DE CALCULAR QUANTIDADE MAXIMA DO INVERSOR

//INICIO FUNÇÃO DE CALCULAR GERAÇÃO MAXIMA DO INVERSOR
function calcularGeracaoMaxima(quantidadePaineis, potenciaPaineis) {
    const fator2 = 140; // Fator de eficiência (ajustável)
    
    const potenciaTotalW = arredondarParaMenosProximo((quantidadePaineis * potenciaPaineis / 1000) * fator2, 50);
    return potenciaTotalW;
}
//FIM FUNÇÃO DE CALCULAR GERAÇÃO MAXIMA DO INVERSOR

//INICIO FUNÇÃO ARREDONDAR PARA MENOS
function arredondarParaMenosProximo(valor, multiplo) {
    return Math.floor(valor / multiplo) * multiplo;
}
//FIM FUNÇÃO ARREDONDAR PARA MENOS

//INICIO FORMATAÇÃO VALOR EM REAIS
function formatarParaReais(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}
//FIM FORMATAÇÃO VALOR EM REAIS

function arredondarParaMaisProximo(valor, multiplo) {
    return Math.floor(valor / multiplo) * multiplo;
}


function enviarWhatsApp() {
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const paineis = document.getElementById('paineis').value;
    const potenciaPaineis = document.getElementById('potenciaPaineis').value;
    const inversor = document.getElementById('inversor').value;
    const tipoInversor = document.getElementById('tipoInversor').value;
    const estrutura = document.getElementById('estrutura').value;
    const custo = document.getElementById('custo').value;
    const entrada = document.getElementById('entrada').value;
    const parcelas = document.getElementById('parcelas').value;
    const taxa = document.getElementById('taxa').value;

    const valorAVista = parseFloat(custo) + parseFloat(entrada);
    const capacidadeMaximaPaineis = calcularCapacidadePainel(inversor, potenciaPaineis);
    const geracaoMaxima = calcularGeracaoMaxima(capacidadeMaximaPaineis, potenciaPaineis);
    const geracao = arredondarParaMaisProximo(((paineis * potenciaPaineis) / 1000) * 140, 50); //geração com painéis digitados
    const valorParcela = taxa / parcelas; //valor parcelado

    //SCRIPT TEXTO WHATASAPP
    const mensagem = `*☀️SISTEMA PROPOSTO☀️*

01. 
- *Nome:* ${nome}
- *Endereço:* ${endereco}

📈 *Geração proposta:* ${geracao} kWh 

✅ ${paineis} painéis de ${potenciaPaineis}W
✅ 1 inversor de ${inversor}KW ${tipoInversor}
✅ Estrutura: ${estrutura}
✅ Cabos
✅ Projeto
✅ ART
✅ Instalação
✅ Homologação

*FORMA DE PAGAMENTO:*
*💰 À vista:* ${formatarParaReais(valorAVista)}

*💳 Cartão:*
Entrada de ${formatarParaReais(entrada)}
Restante em ${parcelas}x de ${formatarParaReais(valorParcela.toFixed(2))}

Inversor com capacidade para *${capacidadeMaximaPaineis} painéis de ${potenciaPaineis}W/${geracaoMaxima} kwh.*

⚠ ATENÇÃO!
Por que escolher a IrriSol?
🔗 Somos única empresa que oferece garantia estendida*;
🚿 Limpeza dos Painéis.`;

    const numeroWhatsApp = prompt("Por favor, insira o número de WhatsApp do cliente (com DDD):");

    if (numeroWhatsApp) {
        const url = `https://api.whatsapp.com/send?phone=55${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    }
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

//INICIO CONFIGURAÇÃO SEÇÃO TABELA


function arredondarParaMenos(valor) {
    return Math.floor(valor);
}


function calcularCapacidadePainel2(kwpMax, potenciaPainel) {
    // Aplicando a fórmula: kwpMax / potenciaPainel * 1000
    const capacidadePainel2 = arredondarParaMenos(kwpMax * 1000 / potenciaPainel);
    return capacidadePainel2;
}

function calcularGeracaoMaxima2(capacidadeMaximaPaineis, potenciaPainel) {
    const fator2 = 140; // Fator de eficiência (ajustável)
    
    const potenciaTotalW = arredondarParaMenosProximo((capacidadeMaximaPaineis * potenciaPainel / 1000) * fator2, 50);
    return potenciaTotalW;
}

function atualizarTabela() {
    const potenciaPainel = parseFloat(document.getElementById('potenciaPainel').value);

    const inversores = [
        { kw: 3, kwpMax: 3.6 },
        { kw: 4, kwpMax: 5.2 },
        { kw: 5, kwpMax: 6.5 },
        { kw: 8, kwpMax: 10.4 },
        { kw: 10, kwpMax: 13 },
        { kw: 12, kwpMax: 15.6 },
        { kw: 15, kwpMax: 19.5 },
        { kw: 18, kwpMax: 21.6 },
        { kw: 20, kwpMax: 26 },
        { kw: 25, kwpMax: 32.5 },
        { kw: 30, kwpMax: 39 },
        { kw: 35, kwpMax: 45.5 },
        { kw: 40, kwpMax: 52 },
        { kw: 45, kwpMax: 58.5 },
        { kw: 50, kwpMax: 65 },
        { kw: 60, kwpMax: 78 },
        { kw: 70, kwpMax: 91 },
        { kw: 75, kwpMax: 97.5 },
        { kw: 80, kwpMax: 104 },
        { kw: 90, kwpMax: 135 },
        { kw: 100, kwpMax: 150 },
        { kw: 110, kwpMax: 150 },

        // Adicione mais inversores conforme necessário
    ];

    inversores.forEach(inversor => {
        const capacidadeMaximaPaineis = calcularCapacidadePainel2(inversor.kwpMax, potenciaPainel);
        const geracaoMaxima2 = calcularGeracaoMaxima2(capacidadeMaximaPaineis, potenciaPainel);

        document.getElementById(`paineis${inversor.kw}`).innerText = capacidadeMaximaPaineis;
        document.getElementById(`geracao${inversor.kw}`).innerText = geracaoMaxima2;
    });
}

// Inicialize a tabela com valores padrão
atualizarTabela();






//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

