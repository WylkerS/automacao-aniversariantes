// Gera os textos com os aniversariantes no Illustrator
function gerarAniversariantes(doc, aniversariantes) {
    var layer = doc.layers[0]; // Usa a primeira camada do documento

    // Cores e fontes
    var corDiaMes = new RGBColor();
    corDiaMes.red = 66;
    corDiaMes.green = 116;
    corDiaMes.blue = 176;

    var fonteDiaMes = 'Arial-BoldMT';
    var fonteAniversariante = 'MicrosoftSansSerif';

    // Layout base
    var posXDiaMesRelativo = 290;
    var posXAniversarianteRelativo = 180;
    var posYInicial = 760;

    var espacamentoAniversariante = 15;
    var espacamentoTituloParaAniversariante = 20;
    var espacamentoEntreDias = 50;
    var limiteInferiorPagina = 50;
    var margemSeguranca = 20;
    var deslocamentoColuna = 200;
    var maxColunasPorPrancheta = 2;

    var colunaAtual = 0;
    var ultimoY = posYInicial;
    var mesAtual = '';

    var primeiraPrancheta = doc.artboards[0].artboardRect;
    var larguraPrancheta = primeiraPrancheta[2] - primeiraPrancheta[0];
    var baseX = primeiraPrancheta[0];

    var pranchetasX = [baseX];

    for (var i = 0; i < aniversariantes.length; i++) {
        var grupo = aniversariantes[i];
        var dia = grupo.dia;
        var mes = grupo.mes;
        var nomes = grupo.nomes;

        var alturaGrupo =
            (mes !== mesAtual ? espacamentoEntreDias : 0) +
            16 + espacamentoTituloParaAniversariante +
            (nomes.length * espacamentoAniversariante) +
            margemSeguranca;

        // Verifica se precisa mudar de coluna/prancheta
        if (ultimoY - alturaGrupo < limiteInferiorPagina) {
            colunaAtual++;

            // Se passou o limite de colunas da prancheta, cria nova
            if (colunaAtual >= maxColunasPorPrancheta * pranchetasX.length) {
                var novaX = baseX + (larguraPrancheta * pranchetasX.length);
                doc.artboards.add([novaX, primeiraPrancheta[1], novaX + larguraPrancheta, primeiraPrancheta[3]]);
                pranchetasX.push(novaX);

                // Duplica o RasterItem "Fundo"
                try {
                    var camada = doc.layers.getByName("Camada 1");
                    for (var k = 0; k < camada.pageItems.length; k++) {
                        var item = camada.pageItems[k];
                        if (item.typename === "RasterItem" && item.name.toLowerCase().replace(/\s/g, '') === "fundo") {
                            var duplicado = item.duplicate();
                            duplicado.left += larguraPrancheta * (pranchetasX.length - 1);
                            break;
                        }
                    }
                } catch (e) {
                    alert("Erro ao duplicar o fundo: " + e.message);
                }
            }

            ultimoY = posYInicial;
        }

        var pranchetaIndex = Math.floor(colunaAtual / maxColunasPorPrancheta);
        var colunaIndex = colunaAtual % maxColunasPorPrancheta;
        var baseColunaX = pranchetasX[pranchetaIndex];

        var posXDiaMes = baseColunaX + posXDiaMesRelativo + (colunaIndex * deslocamentoColuna);
        var posXAniversariante = baseColunaX + posXAniversarianteRelativo + (colunaIndex * deslocamentoColuna);

        // Espaço extra entre meses
        if (mes !== mesAtual && ultimoY !== posYInicial) {
            ultimoY -= espacamentoEntreDias;
        }

        mesAtual = mes;

        // Cria o texto do dia/mês
        var textoDiaMes = layer.textFrames.add();
        var diaFormatado = (dia < 10 ? '0' : '') + dia;
        textoDiaMes.contents = diaFormatado + ' ' + mes.toUpperCase();
        textoDiaMes.position = [posXDiaMes, ultimoY];
        textoDiaMes.textRange.characterAttributes.fillColor = corDiaMes;
        textoDiaMes.textRange.characterAttributes.textFont = app.textFonts.getByName(fonteDiaMes);
        textoDiaMes.textRange.characterAttributes.size = 16;
        textoDiaMes.paragraphs[0].paragraphAttributes.justification = Justification.RIGHT;

        ultimoY -= espacamentoTituloParaAniversariante;

        // Lista os aniversariantes
        for (var j = 0; j < nomes.length; j++) {
            var textoNome = layer.textFrames.add();
            textoNome.contents = nomes[j];
            textoNome.position = [posXAniversariante, ultimoY];
            textoNome.textRange.characterAttributes.textFont = app.textFonts.getByName(fonteAniversariante);
            textoNome.textRange.characterAttributes.size = 9;
            textoNome.paragraphs[0].paragraphAttributes.justification = Justification.LEFT;
            ultimoY -= espacamentoAniversariante;
        }

        ultimoY -= margemSeguranca;
    }
}

// Inclui a variável `aniversariantes` gerada por Python
#include "../output/Lista.jsx";

var doc = app.activeDocument;
gerarAniversariantes(doc, aniversariantes);
