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
