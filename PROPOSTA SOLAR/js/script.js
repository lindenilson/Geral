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
    
    const potenciaTotalW = arredondarParaMaisProximo((quantidadePaineis * potenciaPaineis / 1000) * fator2, 50);
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
    const inputs = document.querySelectorAll('input[required], select[required]');
        let allFilled = true;

        inputs.forEach(input => {
        if (!input.value) {
           input.classList.add('input-error');
            allFilled = false;
        } else {
            input.classList.remove('input-error');
        }
   });

        if (allFilled) {
            // Coloque aqui o código para enviar a mensagem via WhatsApp
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
    const observacao = document.getElementById('observacao').value;

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

*Observações:* ${observacao}

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

const numeroWhatsApp = document.getElementById('numeroWhatsApp').value;

    if (numeroWhatsApp) {
        const url = `https://api.whatsapp.com/send?phone=55${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    }
}  else {
    alert('Por favor, preencha todos os campos obrigatórios.');
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

// BOTÃO GERAR ORÇAMENTO EM PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

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
    const observacao = document.getElementById('observacao').value;


    const valorAVista = parseFloat(custo) + parseFloat(entrada);
    const capacidadeMaximaPaineis = calcularCapacidadePainel(inversor, potenciaPaineis);
    const geracaoMaxima = calcularGeracaoMaxima(capacidadeMaximaPaineis, potenciaPaineis);
    const geracao = arredondarParaMaisProximo(((paineis * potenciaPaineis) / 1000) * 140, 50); //geração com painéis digitados
    const valorParcela = taxa / parcelas; //valor parcelado


    // Adicionar foto de fundo
    const background = new Image();
    background.src = './img/background.png'; // Caminho para a sua imagem de fundo

     background.onload = function() {
     // Adicionar a imagem no PDF
     doc.addImage(background, 'PNG', 0, 0, 210, 297); // Ajuste conforme necessário

    // Adicionar negrito para o título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("PROPOSTA COMERCIAL", 105, 25, { align: 'center' });

    // Configurações para texto normal
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Cliente: `, 20, 35);
    doc.setFont("helvetica", "normal");
    doc.text(`${nome}`, 38, 35);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Endereço: `, 20, 40);
    doc.setFont("helvetica", "normal");
    doc.text(`${endereco}`, 43, 40);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("RESUMO - PROPOSTA", 105, 60, { align: 'center' });

        // Ajustar espaçamento entre linhas
        doc.setLineHeightFactor(1.2);


    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`O sistema proposto possui potência de ${potenciaPaineis * paineis / 1000} kWp, que, considerando um fator típico de perdas (posicionamento, temperatura, sombreamento e sujeira), permitirá a produção média estimada de ${geracao} KWh por mês. O inversor selecionado possui capacidade de gerar ${geracaoMaxima} KWh com o acréscimo de painéis no futuro.`, 20, 70, {align: 'justify', maxWidth: 170 });

    // Adicionando retângulo
    doc.rect(19, 98, 170, 7); // x, y, largura, altura
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("PROPOSTA COMERCIAL", 20, 103);

    // Adicionando retângulo
     doc.rect(19, 105, 170, 45); // x, y, largura, altura
     doc.setFont("helvetica", "normal");
     doc.setFontSize(12);
     doc.text(`- ${paineis} Painel Solar Fotovoltaico ${potenciaPaineis} Wp;`, 20, 110);
     doc.text(`- 1 Inversor Solar ${inversor} kW ${tipoInversor};`, 20, 115);
     doc.text(`- Estrutura ${estrutura};`, 20, 120);
     doc.text(`- Cabos;`, 20, 125);
     doc.text(`- Projeto;`, 20, 130);
     doc.text(`- ART;`, 20, 135);
     doc.text(`- Instalação;`, 20, 140);
     doc.text(`- Homologação;`, 20, 145);

     //TEXTO ALTERNATIVO - CASO QUEIRA ADICIONAR NO PDF
     //doc.setFont("helvetica", "bold");
     //doc.setFontSize(12);
     //doc.text(`* A marca e a potência dos equipamentos selecionados poderão variar de acordo com a disponibilidade do estoque, mantendo a qualidade e a geração média mensal igual ou superior às descritas nesta proposta.`, 20, 155, {align: 'justify', maxWidth: 170 });

     doc.setFont("helvetica", "bold");
     doc.setFontSize(12);
     doc.text(`Observações: ${observacao}`, 20, 155, {align: 'justify', maxWidth: 170 });

    // Verificar se a página está cheia
    if (doc.internal.getCurrentPageInfo().pageNumber > 1) {
        doc.addPage();
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`CONDIÇÃO DE PAGAMENTO`, 20, 187);
    doc.setFont("helvetica", "bold");
    doc.text(`À Vista:`,20, 195);
    doc.text(`Parcelado:`, 20, 200);
    doc.text(`Financiamento:`, 20, 205);
    doc.setFont("helvetica", "normal");
    doc.text(`${formatarParaReais(valorAVista)} Entrada de 75% e 25% após a instalação.`, 37, 195);
    doc.text(`Entrada de ${formatarParaReais(entrada)}, restante em ${parcelas}x de ${formatarParaReais(valorParcela.toFixed(2))} no cartão.`, 43, 200);
    doc.text(`Enviar documentação para simulação.`, 52, 205);


 // Verificar se a página está cheia
 if (doc.internal.getCurrentPageInfo().pageNumber > 1) {
    doc.addPage();
    doc.addImage(imgData, 'PNG', 0, 0, 210, 297); // Adiciona a imagem de fundo na nova página
}

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`VALIDADE DA PROPOSTA: 1 dia`, 20, 220);
    doc.setFont("helvetica", "normal");
    doc.text(`Candiba, ${new Date().toLocaleDateString()}.`, 20, 225);
    doc.text(`_________________________________`, 20, 235);
    doc.text(`${nome}`, 60, 240, {align: 'center', maxWidth: 60 });

    doc.text(`_________________________________`, 110, 235);
    doc.text(`Susilane Santana Dias Gonçalves`, 120, 240);
    doc.text(`IrriSol - Irrigação e Energia Solar`, 121, 245);
    doc.text(`CNPJ 33.476.074/0001-58`, 128, 250);

    doc.save(`orçamento_${nome}.pdf`);
};
}
