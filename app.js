/*
=====================================================
MINHAS FINANÇAS
app.js

Integração principal do aplicativo.

Responsável por:
- Inicialização
- Navegação
- Lançamentos
- Resumo
- Filtros
- Exportação
- Lembretes
- Integração com Bancos

IMPORTANTE:
A lógica dos bancos pertence ao bancos.js.
Este arquivo NÃO duplica essa lógica.
=====================================================
*/


// =====================================================
// ESTADO DO APLICATIVO
// =====================================================

let tipoSelecionado =
    "entrada";


let lancamentoEmEdicao =
    null;


let lembreteEmEdicao =
    null;


// =====================================================
// INICIALIZAÇÃO
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    iniciarAplicativo
);


function iniciarAplicativo() {

    configurarElementos();

    configurarNavegacao();

    configurarLancamentos();

    configurarFiltros();

    configurarExportacao();

    configurarLimpezaRegistros();

    configurarLembretes();

    configurarEventosBancos();

    definirDataAtual();

    atualizarMes();

    carregarTela();

    atualizarIndicadorLembretes();

    inicializarBancos();

}


// =====================================================
// ELEMENTOS DAS TELAS
// =====================================================

let telaInicio;

let telaResumo;

let telaExportar;

let telaLembretes;

let telaBancos;


// =====================================================
// ELEMENTOS DO MODAL DE LANÇAMENTO
// =====================================================

let modal;

let tituloModal;

let btnNovoLancamento;

let btnFecharModal;

let btnEntrada;

let btnSaida;

let btnSalvar;

let btnExcluir;


// =====================================================
// CAMPOS DO LANÇAMENTO
// =====================================================

let valorInput;

let descricaoInput;

let categoriaInput;

let pagamentoInput;

let dataInput;

let observacaoInput;


// =====================================================
// LISTA DE LANÇAMENTOS
// =====================================================

let listaLancamentos;

let mensagemVazia;

let totalEntradas;

let totalSaidas;

let saldo;

let quantidadeLancamentos;


// =====================================================
// ELEMENTOS DO RESUMO
// =====================================================

let resumoSaldo;

let resumoEntradas;

let resumoSaidas;

let resumoCategorias;

let resumoPagamentos;

let mesResumo;


// =====================================================
// ELEMENTOS DOS FILTROS
// =====================================================

let filtroPeriodo;

let filtroTipo;

let datasPersonalizadas;

let filtroDataInicial;

let filtroDataFinal;

let btnLimparFiltros;


// =====================================================
// MENU
// =====================================================

let btnMenuInicio;

let btnMenuResumo;

let btnMenuExcel;

let btnMenuLembretes;

let btnMenuBackup;

let btnMenuBancos;


// =====================================================
// BOTÕES DE NAVEGAÇÃO
// =====================================================

let btnResumoTopo;

let btnVoltarInicio;

let btnVoltarInicioExportar;

let btnVoltarInicioLembretes;

let btnVoltarInicioBancos;


// =====================================================
// ELEMENTOS DA EXPORTAÇÃO
// =====================================================

let exportarPeriodo;

let exportarTipo;

let exportarDatasPersonalizadas;

let exportarDataInicial;

let exportarDataFinal;

let exportarQuantidade;

let exportarPeriodoTexto;

let btnGerarExcel;

let mensagemExportacao;


// =====================================================
// LIMPEZA
// =====================================================

let btnLimparRegistros;


// =====================================================
// ELEMENTOS DOS LEMBRETES
// =====================================================

let btnNovoLembrete;

let btnFecharModalLembrete;

let btnSalvarLembrete;

let btnExcluirLembrete;

let modalLembrete;

let tituloModalLembrete;

let lembreteDataInput;

let lembreteValorInput;

let lembreteDescricaoInput;

let listaLembretes;

let mensagemLembretesVazia;

let quantidadeLembretes;

let badgeLembretes;


// =====================================================
// ELEMENTOS DOS BANCOS
// =====================================================

let btnNovoBanco;


// =====================================================
// CONFIGURAR ELEMENTOS
// =====================================================

function configurarElementos() {

    // =================================================
    // TELAS
    // =================================================

    telaInicio =
        document.getElementById(
            "telaInicio"
        );


    telaResumo =
        document.getElementById(
            "telaResumo"
        );


    telaExportar =
        document.getElementById(
            "telaExportar"
        );


    telaLembretes =
        document.getElementById(
            "telaLembretes"
        );


    telaBancos =
        document.getElementById(
            "telaBancos"
        );


    // =================================================
    // MODAL LANÇAMENTO
    // =================================================

    modal =
        document.getElementById(
            "modalLancamento"
        );


    tituloModal =
        document.getElementById(
            "tituloModal"
        );


    btnNovoLancamento =
        document.getElementById(
            "btnNovoLancamento"
        );


    btnFecharModal =
        document.getElementById(
            "btnFecharModal"
        );


    btnEntrada =
        document.getElementById(
            "btnEntrada"
        );


    btnSaida =
        document.getElementById(
            "btnSaida"
        );


    btnSalvar =
        document.getElementById(
            "btnSalvar"
        );


    btnExcluir =
        document.getElementById(
            "btnExcluir"
        );


    // =================================================
    // CAMPOS
    // =================================================

    valorInput =
        document.getElementById(
            "valor"
        );


    descricaoInput =
        document.getElementById(
            "descricao"
        );


    categoriaInput =
        document.getElementById(
            "categoria"
        );


    pagamentoInput =
        document.getElementById(
            "pagamento"
        );


    dataInput =
        document.getElementById(
            "data"
        );


    observacaoInput =
        document.getElementById(
            "observacao"
        );


    // =================================================
    // LISTA
    // =================================================

    listaLancamentos =
        document.getElementById(
            "listaLancamentos"
        );


    mensagemVazia =
        document.getElementById(
            "mensagemVazia"
        );


    totalEntradas =
        document.getElementById(
            "totalEntradas"
        );


    totalSaidas =
        document.getElementById(
            "totalSaidas"
        );


    saldo =
        document.getElementById(
            "saldo"
        );


    quantidadeLancamentos =
        document.getElementById(
            "quantidadeLancamentos"
        );


    // =================================================
    // RESUMO
    // =================================================

    resumoSaldo =
        document.getElementById(
            "resumoSaldo"
        );


    resumoEntradas =
        document.getElementById(
            "resumoEntradas"
        );


    resumoSaidas =
        document.getElementById(
            "resumoSaidas"
        );


    resumoCategorias =
        document.getElementById(
            "resumoCategorias"
        );


    resumoPagamentos =
        document.getElementById(
            "resumoPagamentos"
        );


    mesResumo =
        document.getElementById(
            "mesResumo"
        );


    // =================================================
    // FILTROS
    // =================================================

    filtroPeriodo =
        document.getElementById(
            "filtroPeriodo"
        );


    filtroTipo =
        document.getElementById(
            "filtroTipo"
        );


    datasPersonalizadas =
        document.getElementById(
            "datasPersonalizadas"
        );


    filtroDataInicial =
        document.getElementById(
            "filtroDataInicial"
        );


    filtroDataFinal =
        document.getElementById(
            "filtroDataFinal"
        );


    btnLimparFiltros =
        document.getElementById(
            "btnLimparFiltros"
        );


    // =================================================
    // MENU
    // =================================================

    btnMenuInicio =
        document.getElementById(
            "btnMenuInicio"
        );


    btnMenuResumo =
        document.getElementById(
            "btnMenuResumo"
        );


    btnMenuExcel =
        document.getElementById(
            "btnMenuExcel"
        );


    btnMenuLembretes =
        document.getElementById(
            "btnMenuLembretes"
        );


    btnMenuBackup =
        document.getElementById(
            "btnMenuBackup"
        );


    btnMenuBancos =
        document.getElementById(
            "btnMenuBancos"
        );


    // =================================================
    // NAVEGAÇÃO
    // =================================================

    btnResumoTopo =
        document.getElementById(
            "btnResumoTopo"
        );


    btnVoltarInicio =
        document.getElementById(
            "btnVoltarInicio"
        );


    btnVoltarInicioExportar =
        document.getElementById(
            "btnVoltarInicioExportar"
        );


    btnVoltarInicioLembretes =
        document.getElementById(
            "btnVoltarInicioLembretes"
        );


    btnVoltarInicioBancos =
        document.getElementById(
            "btnVoltarInicioBancos"
        );


    // =================================================
    // EXPORTAÇÃO
    // =================================================

    exportarPeriodo =
        document.getElementById(
            "exportarPeriodo"
        );


    exportarTipo =
        document.getElementById(
            "exportarTipo"
        );


    exportarDatasPersonalizadas =
        document.getElementById(
            "exportarDatasPersonalizadas"
        );


    exportarDataInicial =
        document.getElementById(
            "exportarDataInicial"
        );


    exportarDataFinal =
        document.getElementById(
            "exportarDataFinal"
        );


    exportarQuantidade =
        document.getElementById(
            "exportarQuantidade"
        );


    exportarPeriodoTexto =
        document.getElementById(
            "exportarPeriodoTexto"
        );


    btnGerarExcel =
        document.getElementById(
            "btnGerarExcel"
        );


    mensagemExportacao =
        document.getElementById(
            "mensagemExportacao"
        );


    // =================================================
    // LIMPEZA
    // =================================================

    btnLimparRegistros =
        document.getElementById(
            "btnLimparRegistros"
        );


    // =================================================
    // LEMBRETES
    // =================================================

    btnNovoLembrete =
        document.getElementById(
            "btnNovoLembrete"
        );


    btnFecharModalLembrete =
        document.getElementById(
            "btnFecharModalLembrete"
        );


    btnSalvarLembrete =
        document.getElementById(
            "btnSalvarLembrete"
        );


    btnExcluirLembrete =
        document.getElementById(
            "btnExcluirLembrete"
        );


    modalLembrete =
        document.getElementById(
            "modalLembrete"
        );


    tituloModalLembrete =
        document.getElementById(
            "tituloModalLembrete"
        );


    lembreteDataInput =
        document.getElementById(
            "lembreteData"
        );


    lembreteValorInput =
        document.getElementById(
            "lembreteValor"
        );


    lembreteDescricaoInput =
        document.getElementById(
            "lembreteDescricao"
        );


    listaLembretes =
        document.getElementById(
            "listaLembretes"
        );


    mensagemLembretesVazia =
        document.getElementById(
            "mensagemLembretesVazia"
        );


    quantidadeLembretes =
        document.getElementById(
            "quantidadeLembretes"
        );


    badgeLembretes =
        document.getElementById(
            "badgeLembretes"
        );


    // =================================================
    // BANCOS
    // =================================================

    btnNovoBanco =
        document.getElementById(
            "btnNovoBanco"
        );

}


// =====================================================
// NAVEGAÇÃO
// =====================================================

function configurarNavegacao() {

    if (
        btnMenuInicio
    ) {

        btnMenuInicio.addEventListener(
            "click",
            mostrarInicio
        );

    }


    if (
        btnMenuResumo
    ) {

        btnMenuResumo.addEventListener(
            "click",
            mostrarResumo
        );

    }


    if (
        btnMenuExcel
    ) {

        btnMenuExcel.addEventListener(
            "click",
            mostrarExportar
        );

    }


    if (
        btnMenuLembretes
    ) {

        btnMenuLembretes.addEventListener(
            "click",
            mostrarLembretes
        );

    }


    if (
        btnMenuBancos
    ) {

        btnMenuBancos.addEventListener(
            "click",
            mostrarBancos
        );

    }


    if (
        btnResumoTopo
    ) {

        btnResumoTopo.addEventListener(
            "click",
            mostrarResumo
        );

    }


    if (
        btnVoltarInicio
    ) {

        btnVoltarInicio.addEventListener(
            "click",
            mostrarInicio
        );

    }


    if (
        btnVoltarInicioExportar
    ) {

        btnVoltarInicioExportar.addEventListener(
            "click",
            mostrarInicio
        );

    }


    if (
        btnVoltarInicioLembretes
    ) {

        btnVoltarInicioLembretes.addEventListener(
            "click",
            mostrarInicio
        );

    }


    if (
        btnVoltarInicioBancos
    ) {

        btnVoltarInicioBancos.addEventListener(
            "click",
            mostrarInicio
        );

    }

}


// =====================================================
// MOSTRAR INÍCIO
// =====================================================

function mostrarInicio() {

    if (
        telaInicio
    ) {

        telaInicio.hidden =
            false;

    }


    if (
        telaResumo
    ) {

        telaResumo.hidden =
            true;

    }


    if (
        telaExportar
    ) {

        telaExportar.hidden =
            true;

    }


    if (
        telaLembretes
    ) {

        telaLembretes.hidden =
            true;

    }


    if (
        telaBancos
    ) {

        telaBancos.hidden =
            true;

    }


    atualizarMenuAtivo(
        btnMenuInicio
    );


    window.scrollTo(
        0,
        0
    );

}


// =====================================================
// MOSTRAR RESUMO
// =====================================================

function mostrarResumo() {

    atualizarResumoCompleto();


    if (
        telaInicio
    ) {

        telaInicio.hidden =
            true;

    }


    if (
        telaResumo
    ) {

        telaResumo.hidden =
            false;

    }


    if (
        telaExportar
    ) {

        telaExportar.hidden =
            true;

    }


    if (
        telaLembretes
    ) {

        telaLembretes.hidden =
            true;

    }


    if (
        telaBancos
    ) {

        telaBancos.hidden =
            true;

    }


    atualizarMenuAtivo(
        btnMenuResumo
    );


    window.scrollTo(
        0,
        0
    );

}


// =====================================================
// MOSTRAR EXPORTAR
// =====================================================

function mostrarExportar() {

    if (
        telaInicio
    ) {

        telaInicio.hidden =
            true;

    }


    if (
        telaResumo
    ) {

        telaResumo.hidden =
            true;

    }


    if (
        telaExportar
    ) {

        telaExportar.hidden =
            false;

    }


    if (
        telaLembretes
    ) {

        telaLembretes.hidden =
            true;

    }


    if (
        telaBancos
    ) {

        telaBancos.hidden =
            true;

    }


    atualizarMenuAtivo(
        btnMenuExcel
    );


    atualizarPreviaExportacao();


    window.scrollTo(
        0,
        0
    );

}


// =====================================================
// MOSTRAR LEMBRETES
// =====================================================

function mostrarLembretes() {

    if (
        telaInicio
    ) {

        telaInicio.hidden =
            true;

    }


    if (
        telaResumo
    ) {

        telaResumo.hidden =
            true;

    }


    if (
        telaExportar
    ) {

        telaExportar.hidden =
            true;

    }


    if (
        telaLembretes
    ) {

        telaLembretes.hidden =
            false;

    }


    if (
        telaBancos
    ) {

        telaBancos.hidden =
            true;

    }


    atualizarMenuAtivo(
        btnMenuLembretes
    );


    renderizarLembretes();

    atualizarIndicadorLembretes();


    window.scrollTo(
        0,
        0
    );

}


// =====================================================
// MOSTRAR BANCOS
// =====================================================
//
// Toda a lógica dos bancos está em bancos.js.
// Aqui apenas fazemos a navegação e chamamos
// renderizarBancos().
// =====================================================

function mostrarBancos() {

    if (
        telaInicio
    ) {

        telaInicio.hidden =
            true;

    }


    if (
        telaResumo
    ) {

        telaResumo.hidden =
            true;

    }


    if (
        telaExportar
    ) {

        telaExportar.hidden =
            true;

    }


    if (
        telaLembretes
    ) {

        telaLembretes.hidden =
            true;

    }


    if (
        telaBancos
    ) {

        telaBancos.hidden =
            false;

    }


    atualizarMenuAtivo(
        btnMenuBancos
    );


    if (
        typeof renderizarBancos ===
        "function"
    ) {

        renderizarBancos();

    }


    window.scrollTo(
        0,
        0
    );

}


// =====================================================
// ATUALIZAR MENU ATIVO
// =====================================================

function atualizarMenuAtivo(
    botaoAtivo
) {

    const botoes = [

        btnMenuInicio,

        btnMenuResumo,

        btnMenuExcel,

        btnMenuLembretes,

        btnMenuBancos

    ];


    botoes.forEach(
        botao => {

            if (
                botao
            ) {

                botao.classList.remove(
                    "ativo"
                );

            }

        }
    );


    if (
        botaoAtivo
    ) {

        botaoAtivo.classList.add(
            "ativo"
        );

    }

}


// =====================================================
// BANCOS
// =====================================================

function configurarEventosBancos() {

    if (
        btnNovoBanco
    ) {

        btnNovoBanco.addEventListener(
            "click",
            abrirNovoBanco
        );

    }


    if (
        telaBancos
    ) {

        telaBancos.addEventListener(
            "click",
            evento => {

                const botao =
                    evento.target.closest(
                        ".btn-editar-banco"
                    );


                if (
                    !botao
                ) {

                    return;

                }


                evento.stopPropagation();


                const id =
                    botao.dataset.id;


                editarBanco(
                    id
                );

            }
        );

    }

}


// =====================================================
// INICIALIZAR BANCOS
// =====================================================

function inicializarBancos() {

    if (
        typeof inicializarBancosPadrao ===
        "function"
    ) {

        inicializarBancosPadrao();

    }


    if (
        typeof renderizarBancos ===
        "function"
    ) {

        renderizarBancos();

    }

}


// =====================================================
// NOVO BANCO
// =====================================================

function abrirNovoBanco() {

    const nome =
        prompt(
            "Digite o nome do banco:"
        );


    if (
        nome ===
        null
    ) {

        return;

    }


    const nomeBanco =
        nome.trim();


    if (
        nomeBanco ===
        ""
    ) {

        alert(
            "Digite o nome do banco."
        );

        return;

    }


    const saldoDigitado =
        prompt(
            "Digite o saldo atual do banco:"
        );


    if (
        saldoDigitado ===
        null
    ) {

        return;

    }


    const saldoNumerico =
        converterValorMonetario(
            saldoDigitado
        );


    if (
        saldoNumerico ===
        null
    ) {

        alert(
            "Digite um saldo válido."
        );

        return;

    }


    if (
        typeof adicionarBanco !==
        "function"
    ) {

        alert(
            "O módulo de bancos não foi carregado."
        );

        return;

    }


    adicionarBanco(

        nomeBanco,

        saldoNumerico

    );


    renderizarBancos();

}


// =====================================================
// EDITAR BANCO
// =====================================================

function editarBanco(
    id
) {

    if (
        typeof obterBancoPorId !==
        "function"
    ) {

        alert(
            "O módulo de bancos não foi carregado."
        );

        return;

    }


    const banco =
        obterBancoPorId(
            id
        );


    if (
        !banco
    ) {

        alert(
            "Banco não encontrado."
        );

        return;

    }


    const nome =
        prompt(
            "Nome do banco:",
            banco.nome
        );


    if (
        nome ===
        null
    ) {

        return;

    }


    const nomeBanco =
        nome.trim();


    if (
        nomeBanco ===
        ""
    ) {

        alert(
            "Digite o nome do banco."
        );

        return;

    }


    const saldoAtual =
        formatarValorParaEdicao(
            banco.saldo
        );


    const saldoDigitado =
        prompt(
            "Saldo atual do banco:",
            saldoAtual
        );


    if (
        saldoDigitado ===
        null
    ) {

        return;

    }


    const saldoNumerico =
        converterValorMonetario(
            saldoDigitado
        );


    if (
        saldoNumerico ===
        null
    ) {

        alert(
            "Digite um saldo válido."
        );

        return;

    }


    const atualizado =
        atualizarBanco(

            id,

            {

                nome:
                    nomeBanco,

                saldo:
                    saldoNumerico

            }

        );


    if (
        !atualizado
    ) {

        alert(
            "Não foi possível atualizar o banco."
        );

        return;

    }


    renderizarBancos();

}


// =====================================================
// CONVERTER VALOR MONETÁRIO
// =====================================================

function converterValorMonetario(
    valor
) {

    let texto =
        String(
            valor ?? ""
        ).trim();


    if (
        texto ===
        ""
    ) {

        return null;

    }


    texto =
        texto.replace(
            /R\$/gi,
            ""
        ).trim();


    /*
    -----------------------------------------------------
    Trata formatos:

    1234,56
    1.234,56
    1234.56
    -1234,56
    -----------------------------------------------------
    */


    if (
        texto.includes(",")
    ) {

        texto =
            texto.replace(
                /\./g,
                ""
            );


        texto =
            texto.replace(
                ",",
                "."
            );

    }


    const numero =
        Number(
            texto
        );


    if (
        !Number.isFinite(
            numero
        )
    ) {

        return null;

    }


    return numero;

}


// =====================================================
// FORMATAR VALOR PARA EDIÇÃO
// =====================================================

function formatarValorParaEdicao(
    valor
) {

    const numero =
        Number(
            valor
        ) || 0;


    return numero
        .toFixed(2)
        .replace(
            ".",
            ","
        );

}


// =====================================================
// LANÇAMENTOS
// =====================================================

function configurarLancamentos() {

    if (
        btnNovoLancamento
    ) {

        btnNovoLancamento.addEventListener(
            "click",
            abrirNovoLancamento
        );

    }


    if (
        btnFecharModal
    ) {

        btnFecharModal.addEventListener(
            "click",
            fecharModal
        );

    }


    if (
        btnEntrada
    ) {

        btnEntrada.addEventListener(
            "click",
            () => {

                selecionarTipo(
                    "entrada"
                );

            }
        );

    }


    if (
        btnSaida
    ) {

        btnSaida.addEventListener(
            "click",
            () => {

                selecionarTipo(
                    "saida"
                );

            }
        );

    }


    if (
        btnSalvar
    ) {

        btnSalvar.addEventListener(
            "click",
            salvarLancamentoFormulario
        );

    }


    if (
        btnExcluir
    ) {

        btnExcluir.addEventListener(
            "click",
            excluirLancamentoAtual
        );

    }


    if (
        listaLancamentos
    ) {

        listaLancamentos.addEventListener(
            "click",
            tratarCliqueLancamento
        );

    }


    if (
        modal
    ) {

        modal.addEventListener(
            "click",
            evento => {

                if (
                    evento.target ===
                    modal
                ) {

                    fecharModal();

                }

            }
        );

    }

}


// =====================================================
// DEFINIR DATA ATUAL
// =====================================================

function definirDataAtual() {

    if (
        !dataInput
    ) {

        return;

    }


    if (
        dataInput.value
    ) {

        return;

    }


    const hoje =
        new Date();


    const ano =
        hoje.getFullYear();


    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const dia =
        String(
            hoje.getDate()
        ).padStart(
            2,
            "0"
        );


    dataInput.value =
        `${ano}-${mes}-${dia}`;

}


// =====================================================
// ABRIR NOVO LANÇAMENTO
// =====================================================

function abrirNovoLancamento() {

    lancamentoEmEdicao =
        null;


    if (
        tituloModal
    ) {

        tituloModal.textContent =
            "Novo lançamento";

    }


    if (
        btnExcluir
    ) {

        btnExcluir.hidden =
            true;

    }


    limparFormularioLancamento();


    selecionarTipo(
        "entrada"
    );


    definirDataAtual();


    if (
        modal
    ) {

        modal.hidden =
            false;

    }


    if (
        valorInput
    ) {

        valorInput.focus();

    }

}


// =====================================================
// FECHAR MODAL
// =====================================================

function fecharModal() {

    if (
        modal
    ) {

        modal.hidden =
            true;

    }


    lancamentoEmEdicao =
        null;

}


// =====================================================
// LIMPAR FORMULÁRIO
// =====================================================

function limparFormularioLancamento() {

    if (
        valorInput
    ) {

        valorInput.value =
            "";

    }


    if (
        descricaoInput
    ) {

        descricaoInput.value =
            "";

    }


    if (
        categoriaInput
    ) {

        categoriaInput.value =
            "";

    }


    if (
        pagamentoInput
    ) {

        pagamentoInput.value =
            "";

    }


    if (
        observacaoInput
    ) {

        observacaoInput.value =
            "";

    }


    if (
        dataInput
    ) {

        dataInput.value =
            "";

    }

}


// =====================================================
// SELECIONAR TIPO
// =====================================================

function selecionarTipo(
    tipo
) {

    tipoSelecionado =
        tipo;


    if (
        btnEntrada
    ) {

        btnEntrada.classList.toggle(
            "ativo",
            tipo === "entrada"
        );

    }


    if (
        btnSaida
    ) {

        btnSaida.classList.toggle(
            "ativo",
            tipo === "saida"
        );

    }

}


// =====================================================
// SALVAR LANÇAMENTO
// =====================================================

function salvarLancamentoFormulario() {

    const valorTexto =
        valorInput
            ? valorInput.value.trim()
            : "";


    const descricao =
        descricaoInput
            ? descricaoInput.value.trim()
            : "";


    const categoria =
        categoriaInput
            ? categoriaInput.value
            : "";


    const pagamento =
        pagamentoInput
            ? pagamentoInput.value
            : "";


    const data =
        dataInput
            ? dataInput.value
            : "";


    const observacao =
        observacaoInput
            ? observacaoInput.value.trim()
            : "";


    // =================================================
    // VALIDAÇÕES
    // =================================================

    if (
        valorTexto === ""
    ) {

        alert(
            "Informe o valor do lançamento."
        );

        if (
            valorInput
        ) {

            valorInput.focus();

        }

        return;

    }


    const valor =
        converterValorLancamento(
            valorTexto
        );


    if (
        valor === null ||
        valor <= 0
    ) {

        alert(
            "Informe um valor válido."
        );

        if (
            valorInput
        ) {

            valorInput.focus();

        }

        return;

    }


    if (
        descricao === ""
    ) {

        alert(
            "Informe a descrição do lançamento."
        );

        if (
            descricaoInput
        ) {

            descricaoInput.focus();

        }

        return;

    }


    if (
        data === ""
    ) {

        alert(
            "Informe a data do lançamento."
        );

        if (
            dataInput
        ) {

            dataInput.focus();

        }

        return;

    }


    // =================================================
    // EDIÇÃO
    // =================================================

    if (
        lancamentoEmEdicao
    ) {

        const sucesso =
            atualizarLancamento(

                lancamentoEmEdicao.id,

                {

                    tipo:
                        tipoSelecionado,

                    valor:
                        valor,

                    descricao:
                        descricao,

                    categoria:
                        categoria,

                    pagamento:
                        pagamento,

                    data:
                        data,

                    observacao:
                        observacao

                }

            );


        if (
            !sucesso
        ) {

            alert(
                "Não foi possível atualizar o lançamento."
            );

            return;

        }

    }

    // =================================================
    // NOVO
    // =================================================

    else {

        const novoLancamento = {

            id:
                gerarIdLancamento(),

            tipo:
                tipoSelecionado,

            valor:
                valor,

            descricao:
                descricao,

            categoria:
                categoria,

            pagamento:
                pagamento,

            data:
                data,

            observacao:
                observacao

        };


        adicionarLancamento(
            novoLancamento
        );

    }


    fecharModal();


    atualizarTela();


    atualizarResumoCompleto();


    atualizarPreviaExportacao();

}


// =====================================================
// GERAR ID DO LANÇAMENTO
// =====================================================

function gerarIdLancamento() {

    return (

        Date.now().toString() +

        Math.random()
            .toString(36)
            .substring(2, 8)

    );

}


// =====================================================
// CONVERTER VALOR DO LANÇAMENTO
// =====================================================

function converterValorLancamento(
    valor
) {

    let texto =
        String(
            valor ?? ""
        ).trim();


    if (
        texto === ""
    ) {

        return null;

    }


    texto =
        texto.replace(
            /R\$/gi,
            ""
        ).trim();


    /*
    -----------------------------------------------------
    Formatos aceitos:

    100
    100,50
    1.000,50
    1000.50
    -----------------------------------------------------
    */

    if (
        texto.includes(",")
    ) {

        texto =
            texto.replace(
                /\./g,
                ""
            );


        texto =
            texto.replace(
                ",",
                "."
            );

    }


    const numero =
        Number(
            texto
        );


    if (
        !Number.isFinite(
            numero
        )
    ) {

        return null;

    }


    return numero;

}


// =====================================================
// EDITAR LANÇAMENTO
// =====================================================

function editarLancamento(
    id
) {

    const lancamento =
        obterLancamentoPorId(
            id
        );


    if (
        !lancamento
    ) {

        alert(
            "Lançamento não encontrado."
        );

        return;

    }


    lancamentoEmEdicao =
        lancamento;


    if (
        tituloModal
    ) {

        tituloModal.textContent =
            "Editar lançamento";

    }


    if (
        btnExcluir
    ) {

        btnExcluir.hidden =
            false;

    }


    selecionarTipo(
        lancamento.tipo ||
        "entrada"
    );


    if (
        valorInput
    ) {

        valorInput.value =
            formatarValorParaEdicaoLancamento(
                lancamento.valor
            );

    }


    if (
        descricaoInput
    ) {

        descricaoInput.value =
            lancamento.descricao ||
            "";

    }


    if (
        categoriaInput
    ) {

        categoriaInput.value =
            lancamento.categoria ||
            "";

    }


    if (
        pagamentoInput
    ) {

        pagamentoInput.value =
            lancamento.pagamento ||
            "";

    }


    if (
        dataInput
    ) {

        dataInput.value =
            lancamento.data ||
            "";

    }


    if (
        observacaoInput
    ) {

        observacaoInput.value =
            lancamento.observacao ||
            "";

    }


    if (
        modal
    ) {

        modal.hidden =
            false;

    }


    if (
        valorInput
    ) {

        valorInput.focus();

    }

}


// =====================================================
// FORMATAR VALOR PARA EDIÇÃO
// =====================================================

function formatarValorParaEdicaoLancamento(
    valor
) {

    const numero =
        Number(
            valor
        ) || 0;


    return numero
        .toFixed(2)
        .replace(
            ".",
            ","
        );

}


// =====================================================
// EXCLUIR LANÇAMENTO ATUAL
// =====================================================

function excluirLancamentoAtual() {

    if (
        !lancamentoEmEdicao
    ) {

        return;

    }


    const confirmar =
        confirm(
            "Deseja realmente excluir este lançamento?"
        );


    if (
        !confirmar
    ) {

        return;

    }


    const sucesso =
        excluirLancamento(
            lancamentoEmEdicao.id
        );


    if (
        !sucesso
    ) {

        alert(
            "Não foi possível excluir o lançamento."
        );

        return;

    }


    fecharModal();


    atualizarTela();


    atualizarResumoCompleto();


    atualizarPreviaExportacao();

}


// =====================================================
// TRATAR CLIQUE NA LISTA
// =====================================================

function tratarCliqueLancamento(
    evento
) {

    const elemento =
        evento.target.closest(
            "[data-id]"
        );


    if (
        !elemento
    ) {

        return;

    }


    const id =
        elemento.dataset.id;


    if (
        !id
    ) {

        return;

    }


    editarLancamento(
        id
    );

}


// =====================================================
// ATUALIZAR TELA PRINCIPAL
// =====================================================

function atualizarTela() {

    const lancamentos =
        obterLancamentos();


    renderizarLancamentos(
        lancamentos
    );


    atualizarTotais(
        lancamentos
    );


    atualizarQuantidade(
        lancamentos
    );

}


// =====================================================
// RENDERIZAR LANÇAMENTOS
// =====================================================

function renderizarLancamentos(
    lancamentos
) {

    if (
        !listaLancamentos
    ) {

        return;

    }


    listaLancamentos.innerHTML =
        "";


    if (
        !lancamentos ||
        lancamentos.length === 0
    ) {

        if (
            mensagemVazia
        ) {

            mensagemVazia.hidden =
                false;

        }

        return;

    }


    if (
        mensagemVazia
    ) {

        mensagemVazia.hidden =
            true;

    }


    const ordenados =
        [...lancamentos].sort(

            (
                a,
                b
            ) => {

                const dataA =
                    String(
                        a.data || ""
                    );


                const dataB =
                    String(
                        b.data || ""
                    );


                if (
                    dataA !==
                    dataB
                ) {

                    return dataB.localeCompare(
                        dataA
                    );

                }


                return String(
                    b.id || ""
                ).localeCompare(
                    String(
                        a.id || ""
                    )
                );

            }

        );


    ordenados.forEach(
        lancamento => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "lancamento";


            item.dataset.id =
                lancamento.id;


            const tipo =
                lancamento.tipo ===
                "saida"

                    ? "saida"

                    : "entrada";


            const sinal =
                tipo === "saida"
                    ? "-"
                    : "+";


            const classeValor =
                tipo === "saida"
                    ? "saida"
                    : "entrada";


            const descricao =
                escaparHtmlLancamento(
                    lancamento.descricao ||
                    "Sem descrição"
                );


            const categoria =
                escaparHtmlLancamento(
                    lancamento.categoria ||
                    "Outros"
                );


            const dataFormatada =
                formatarDataLancamento(
                    lancamento.data
                );


            item.innerHTML = `

                <div class="lancamento-icone">

                    ${
                        tipo === "entrada"
                            ? "↙"
                            : "↗"
                    }

                </div>


                <div class="lancamento-info">

                    <strong>
                        ${descricao}
                    </strong>

                    <small>
                        ${categoria}
                        •
                        ${dataFormatada}
                    </small>

                </div>


                <div
                    class="lancamento-valor ${classeValor}"
                >
                    ${sinal}
                    ${formatarMoedaLancamento(
                        lancamento.valor
                    )}
                </div>

            `;


            listaLancamentos.appendChild(
                item
            );

        }

    );

}


// =====================================================
// ATUALIZAR TOTAIS
// =====================================================

function atualizarTotais(
    lancamentos
) {

    let entradas =
        0;


    let saidas =
        0;


    lancamentos.forEach(
        lancamento => {

            const valor =
                Number(
                    lancamento.valor
                ) || 0;


            if (
                lancamento.tipo ===
                "entrada"
            ) {

                entradas +=
                    valor;

            }

            else if (
                lancamento.tipo ===
                "saida"
            ) {

                saidas +=
                    valor;

            }

        }
    );


    const saldoAtual =
        entradas -
        saidas;


    if (
        totalEntradas
    ) {

        totalEntradas.textContent =
            formatarMoedaLancamento(
                entradas
            );

    }


    if (
        totalSaidas
    ) {

        totalSaidas.textContent =
            formatarMoedaLancamento(
                saidas
            );

    }


    if (
        saldo
    ) {

        saldo.textContent =
            formatarMoedaLancamento(
                saldoAtual
            );

    }

}


// =====================================================
// ATUALIZAR QUANTIDADE
// =====================================================

function atualizarQuantidade(
    lancamentos
) {

    if (
        quantidadeLancamentos
    ) {

        quantidadeLancamentos.textContent =
            lancamentos.length;

    }

}


// =====================================================
// FORMATAR MOEDA
// =====================================================

function formatarMoedaLancamento(
    valor
) {

    return Number(
        valor || 0
    ).toLocaleString(

        "pt-BR",

        {

            style:
                "currency",

            currency:
                "BRL"

        }

    );

}


// =====================================================
// FORMATAR DATA
// =====================================================

function formatarDataLancamento(
    data
) {

    if (
        !data
    ) {

        return "";

    }


    const partes =
        String(
            data
        ).split(
            "-"
        );


    if (
        partes.length !==
        3
    ) {

        return data;

    }


    return (

        `${partes[2]}/` +
        `${partes[1]}/` +
        `${partes[0]}`

    );

}


// =====================================================
// ESCAPAR HTML
// =====================================================

function escaparHtmlLancamento(
    texto
) {

    return String(
        texto ?? ""
    )

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// =====================================================
// FILTROS
// =====================================================

function configurarFiltros() {

    if (
        filtroPeriodo
    ) {

        filtroPeriodo.addEventListener(
            "change",
            aplicarFiltros
        );

    }


    if (
        filtroTipo
    ) {

        filtroTipo.addEventListener(
            "change",
            aplicarFiltros
        );

    }


    if (
        filtroDataInicial
    ) {

        filtroDataInicial.addEventListener(
            "change",
            aplicarFiltros
        );

    }


    if (
        filtroDataFinal
    ) {

        filtroDataFinal.addEventListener(
            "change",
            aplicarFiltros
        );

    }


    if (
        btnLimparFiltros
    ) {

        btnLimparFiltros.addEventListener(
            "click",
            limparFiltros
        );

    }


    if (
        datasPersonalizadas
    ) {

        datasPersonalizadas.hidden =
            true;

    }

}


// =====================================================
// APLICAR FILTROS
// =====================================================

function aplicarFiltros() {

    const todos =
        obterLancamentos();


    let filtrados =
        [...todos];


    const tipo =
        filtroTipo
            ? filtroTipo.value
            : "";


    if (
        tipo &&
        tipo !== "todos"
    ) {

        filtrados =
            filtrados.filter(
                lancamento =>
                    lancamento.tipo ===
                    tipo
            );

    }


    const periodo =
        filtroPeriodo
            ? filtroPeriodo.value
            : "";


    if (
        periodo ===
        "personalizado"
    ) {

        const inicio =
            filtroDataInicial
                ? filtroDataInicial.value
                : "";


        const fim =
            filtroDataFinal
                ? filtroDataFinal.value
                : "";


        if (
            inicio
        ) {

            filtrados =
                filtrados.filter(
                    lancamento =>
                        lancamento.data >=
                        inicio
                );

        }


        if (
            fim
        ) {

            filtrados =
                filtrados.filter(
                    lancamento =>
                        lancamento.data <=
                        fim
                );

        }

    }


    else if (
        periodo ===
        "mes-atual"
    ) {

        const hoje =
            new Date();


        const ano =
            hoje.getFullYear();


        const mes =
            String(
                hoje.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const prefixo =
            `${ano}-${mes}`;


        filtrados =
            filtrados.filter(
                lancamento =>
                    String(
                        lancamento.data ||
                        ""
                    ).startsWith(
                        prefixo
                    )
            );

    }


    renderizarLancamentos(
        filtrados
    );


    atualizarTotais(
        filtrados
    );


    atualizarQuantidade(
        filtrados
    );

}


// =====================================================
// LIMPAR FILTROS
// =====================================================

function limparFiltros() {

    if (
        filtroPeriodo
    ) {

        filtroPeriodo.value =
            "todos";

    }


    if (
        filtroTipo
    ) {

        filtroTipo.value =
            "todos";

    }


    if (
        filtroDataInicial
    ) {

        filtroDataInicial.value =
            "";

    }


    if (
        filtroDataFinal
    ) {

        filtroDataFinal.value =
            "";

    }


    if (
        datasPersonalizadas
    ) {

        datasPersonalizadas.hidden =
            true;

    }


    atualizarTela();

}


// =====================================================
// RESUMO
// =====================================================

function atualizarResumoCompleto() {

    const lancamentos =
        obterLancamentos();


    if (
        typeof calcularResumo !==
        "function"
    ) {

        return;

    }


    const resumo =
        calcularResumo(
            lancamentos
        );


    if (
        resumoSaldo
    ) {

        resumoSaldo.textContent =
            formatarMoedaLancamento(
                resumo.saldo
            );

    }


    if (
        resumoEntradas
    ) {

        resumoEntradas.textContent =
            formatarMoedaLancamento(
                resumo.entradas
            );

    }


    if (
        resumoSaidas
    ) {

        resumoSaidas.textContent =
            formatarMoedaLancamento(
                resumo.saidas
            );

    }


    atualizarResumoCategorias(
        lancamentos
    );


    atualizarResumoPagamentos(
        lancamentos
    );

}


// =====================================================
// RESUMO POR CATEGORIA
// =====================================================

function atualizarResumoCategorias(
    lancamentos
) {

    if (
        !resumoCategorias
    ) {

        return;

    }


    if (
        typeof calcularPorCategoria !==
        "function"
    ) {

        return;

    }


    const dados =
        calcularPorCategoria(
            lancamentos
        );


    const categorias =
        Object.keys(
            dados
        );


    if (
        categorias.length ===
        0
    ) {

        resumoCategorias.innerHTML = `

            <p class="vazio-resumo">
                Nenhum lançamento.
            </p>

        `;

        return;

    }


    resumoCategorias.innerHTML =
        "";


    categorias.forEach(
        categoria => {

            const entrada =
                Number(
                    dados[categoria].entrada
                ) || 0;


            const saida =
                Number(
                    dados[categoria].saida
                ) || 0;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "resumo-item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${escaparHtmlLancamento(
                            categoria
                        )}
                    </strong>

                </div>

                <div>

                    <span class="entrada">
                        ${formatarMoedaLancamento(
                            entrada
                        )}
                    </span>

                    &nbsp;

                    <span class="saida">
                        ${formatarMoedaLancamento(
                            saida
                        )}
                    </span>

                </div>

            `;


            resumoCategorias.appendChild(
                item
            );

        }

    );

}


// =====================================================
// RESUMO POR PAGAMENTO
// =====================================================

function atualizarResumoPagamentos(
    lancamentos
) {

    if (
        !resumoPagamentos
    ) {

        return;

    }


    if (
        typeof calcularPorPagamento !==
        "function"
    ) {

        return;

    }


    const dados =
        calcularPorPagamento(
            lancamentos
        );


    const pagamentos =
        Object.keys(
            dados
        );


    if (
        pagamentos.length ===
        0
    ) {

        resumoPagamentos.innerHTML = `

            <p class="vazio-resumo">
                Nenhum lançamento.
            </p>

        `;

        return;

    }


    resumoPagamentos.innerHTML =
        "";


    pagamentos.forEach(
        pagamento => {

            const entrada =
                Number(
                    dados[pagamento].entrada
                ) || 0;


            const saida =
                Number(
                    dados[pagamento].saida
                ) || 0;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "resumo-item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${escaparHtmlLancamento(
                            pagamento
                        )}
                    </strong>

                </div>

                <div>

                    <span class="entrada">
                        ${formatarMoedaLancamento(
                            entrada
                        )}
                    </span>

                    &nbsp;

                    <span class="saida">
                        ${formatarMoedaLancamento(
                            saida
                        )}
                    </span>

                </div>

            `;


            resumoPagamentos.appendChild(
                item
            );

        }

    );

}


// =====================================================
// EXPORTAÇÃO
// =====================================================

function configurarExportacao() {

    if (
        exportarPeriodo
    ) {

        exportarPeriodo.addEventListener(
            "change",
            atualizarPreviaExportacao
        );

    }


    if (
        exportarTipo
    ) {

        exportarTipo.addEventListener(
            "change",
            atualizarPreviaExportacao
        );

    }


    if (
        exportarDataInicial
    ) {

        exportarDataInicial.addEventListener(
            "change",
            atualizarPreviaExportacao
        );

    }


    if (
        exportarDataFinal
    ) {

        exportarDataFinal.addEventListener(
            "change",
            atualizarPreviaExportacao
        );

    }


    if (
        btnGerarExcel
    ) {

        btnGerarExcel.addEventListener(
            "click",
            gerarExcel
        );

    }

}


// =====================================================
// ATUALIZAR PRÉVIA DA EXPORTAÇÃO
// =====================================================

function atualizarPreviaExportacao() {

    const lancamentos =
        obterLancamentos();


    let filtrados =
        [...lancamentos];


    const periodo =
        exportarPeriodo
            ? exportarPeriodo.value
            : "todos";


    const tipo =
        exportarTipo
            ? exportarTipo.value
            : "todos";


    // =================================================
    // FILTRO POR TIPO
    // =================================================

    if (
        tipo &&
        tipo !== "todos"
    ) {

        filtrados =
            filtrados.filter(
                lancamento =>
                    lancamento.tipo ===
                    tipo
            );

    }


    // =================================================
    // FILTRO POR PERÍODO
    // =================================================

    if (
        periodo ===
        "personalizado"
    ) {

        const inicio =
            exportarDataInicial
                ? exportarDataInicial.value
                : "";


        const fim =
            exportarDataFinal
                ? exportarDataFinal.value
                : "";


        if (
            inicio
        ) {

            filtrados =
                filtrados.filter(
                    lancamento =>
                        lancamento.data >=
                        inicio
                );

        }


        if (
            fim
        ) {

            filtrados =
                filtrados.filter(
                    lancamento =>
                        lancamento.data <=
                        fim
                );

        }

    }


    else if (
        periodo ===
        "mes-atual"
    ) {

        const hoje =
            new Date();


        const ano =
            hoje.getFullYear();


        const mes =
            String(
                hoje.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const prefixo =
            `${ano}-${mes}`;


        filtrados =
            filtrados.filter(
                lancamento =>
                    String(
                        lancamento.data ||
                        ""
                    ).startsWith(
                        prefixo
                    )
            );

    }


    // =================================================
    // ATUALIZAR QUANTIDADE
    // =================================================

    if (
        exportarQuantidade
    ) {

        exportarQuantidade.textContent =
            filtrados.length;

    }


    // =================================================
    // TEXTO DO PERÍODO
    // =================================================

    if (
        exportarPeriodoTexto
    ) {

        if (
            periodo ===
            "personalizado"
        ) {

            const inicio =
                exportarDataInicial
                    ? exportarDataInicial.value
                    : "";


            const fim =
                exportarDataFinal
                    ? exportarDataFinal.value
                    : "";


            if (
                inicio &&
                fim
            ) {

                exportarPeriodoTexto.textContent =
                    `${formatarDataLancamento(
                        inicio
                    )} até ${formatarDataLancamento(
                        fim
                    )}`;

            }

            else {

                exportarPeriodoTexto.textContent =
                    "Período personalizado";

            }

        }

        else if (
            periodo ===
            "mes-atual"
        ) {

            const hoje =
                new Date();


            exportarPeriodoTexto.textContent =
                hoje.toLocaleDateString(
                    "pt-BR",
                    {
                        month:
                            "long",
                        year:
                            "numeric"
                    }
                );

        }

        else {

            exportarPeriodoTexto.textContent =
                "Todos os lançamentos";

        }

    }


    // =================================================
    // DATAS PERSONALIZADAS
    // =================================================

    if (
        exportarDatasPersonalizadas
    ) {

        exportarDatasPersonalizadas.hidden =
            periodo !==
            "personalizado";

    }

}


// =====================================================
// GERAR EXCEL
// =====================================================

function gerarExcel() {

    if (
        typeof exportarParaExcel !==
        "function"
    ) {

        alert(
            "O módulo de exportação não foi carregado."
        );

        return;

    }


    const lancamentos =
        obterLancamentos();


    let filtrados =
        [...lancamentos];


    const periodo =
        exportarPeriodo
            ? exportarPeriodo.value
            : "todos";


    const tipo =
        exportarTipo
            ? exportarTipo.value
            : "todos";


    // =================================================
    // TIPO
    // =================================================

    if (
        tipo &&
        tipo !== "todos"
    ) {

        filtrados =
            filtrados.filter(
                lancamento =>
                    lancamento.tipo ===
                    tipo
            );

    }


    // =================================================
    // PERÍODO
    // =================================================

    if (
        periodo ===
        "personalizado"
    ) {

        const inicio =
            exportarDataInicial
                ? exportarDataInicial.value
                : "";


        const fim =
            exportarDataFinal
                ? exportarDataFinal.value
                : "";


        if (
            inicio
        ) {

            filtrados =
                filtrados.filter(
                    lancamento =>
                        lancamento.data >=
                        inicio
                );

        }


        if (
            fim
        ) {

            filtrados =
                filtrados.filter(
                    lancamento =>
                        lancamento.data <=
                        fim
                );

        }

    }


    else if (
        periodo ===
        "mes-atual"
    ) {

        const hoje =
            new Date();


        const ano =
            hoje.getFullYear();


        const mes =
            String(
                hoje.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const prefixo =
            `${ano}-${mes}`;


        filtrados =
            filtrados.filter(
                lancamento =>
                    String(
                        lancamento.data ||
                        ""
                    ).startsWith(
                        prefixo
                    )
            );

    }


    if (
        filtrados.length ===
        0
    ) {

        alert(
            "Não existem lançamentos para exportar."
        );

        return;

    }


    try {

        exportarParaExcel(
            filtrados
        );


        if (
            mensagemExportacao
        ) {

            mensagemExportacao.hidden =
                false;


            mensagemExportacao.textContent =
                "Arquivo Excel gerado com sucesso.";

        }

    }

    catch (
        erro
    ) {

        console.error(
            "Erro ao gerar Excel:",
            erro
        );


        alert(
            "Não foi possível gerar o arquivo Excel."
        );

    }

}


// =====================================================
// LIMPEZA DE REGISTROS
// =====================================================

function configurarLimpezaRegistros() {

    if (
        btnLimparRegistros
    ) {

        btnLimparRegistros.addEventListener(
            "click",
            limparTodosRegistros
        );

    }

}


// =====================================================
// LIMPAR TODOS OS REGISTROS
// =====================================================

function limparTodosRegistros() {

    const confirmar =
        confirm(
            "ATENÇÃO!\n\n" +
            "Isso apagará todos os lançamentos " +
            "salvos neste aparelho.\n\n" +
            "Deseja realmente continuar?"
        );


    if (
        !confirmar
    ) {

        return;

    }


    const confirmacaoFinal =
        confirm(
            "Esta operação não poderá ser desfeita.\n\n" +
            "Confirma a exclusão de todos os lançamentos?"
        );


    if (
        !confirmacaoFinal
    ) {

        return;

    }


    limparTodosLancamentos();


    atualizarTela();


    atualizarResumoCompleto();


    atualizarPreviaExportacao();


    alert(
        "Todos os lançamentos foram apagados."
    );

}


// =====================================================
// LEMBRETES
// =====================================================

function configurarLembretes() {

    if (
        btnNovoLembrete
    ) {

        btnNovoLembrete.addEventListener(
            "click",
            abrirNovoLembrete
        );

    }


    if (
        btnFecharModalLembrete
    ) {

        btnFecharModalLembrete.addEventListener(
            "click",
            fecharModalLembrete
        );

    }


    if (
        btnSalvarLembrete
    ) {

        btnSalvarLembrete.addEventListener(
            "click",
            salvarLembreteFormulario
        );

    }


    if (
        btnExcluirLembrete
    ) {

        btnExcluirLembrete.addEventListener(
            "click",
            excluirLembreteAtual
        );

    }


    if (
        listaLembretes
    ) {

        listaLembretes.addEventListener(
            "click",
            tratarCliqueLembrete
        );

    }


    if (
        modalLembrete
    ) {

        modalLembrete.addEventListener(
            "click",
            evento => {

                if (
                    evento.target ===
                    modalLembrete
                ) {

                    fecharModalLembrete();

                }

            }
        );

    }

}


// =====================================================
// ABRIR NOVO LEMBRETE
// =====================================================

function abrirNovoLembrete() {

    lembreteEmEdicao =
        null;


    if (
        tituloModalLembrete
    ) {

        tituloModalLembrete.textContent =
            "Novo lembrete";

    }


    if (
        btnExcluirLembrete
    ) {

        btnExcluirLembrete.hidden =
            true;

    }


    if (
        lembreteDataInput
    ) {

        const hoje =
            new Date();


        const ano =
            hoje.getFullYear();


        const mes =
            String(
                hoje.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const dia =
            String(
                hoje.getDate()
            ).padStart(
                2,
                "0"
            );


        lembreteDataInput.value =
            `${ano}-${mes}-${dia}`;

    }


    if (
        lembreteValorInput
    ) {

        lembreteValorInput.value =
            "";

    }


    if (
        lembreteDescricaoInput
    ) {

        lembreteDescricaoInput.value =
            "";

    }


    if (
        modalLembrete
    ) {

        modalLembrete.hidden =
            false;

    }


    if (
        lembreteDescricaoInput
    ) {

        lembreteDescricaoInput.focus();

    }

}


// =====================================================
// FECHAR MODAL LEMBRETE
// =====================================================

function fecharModalLembrete() {

    if (
        modalLembrete
    ) {

        modalLembrete.hidden =
            true;

    }


    lembreteEmEdicao =
        null;

}


// =====================================================
// SALVAR LEMBRETE
// =====================================================

function salvarLembreteFormulario() {

    const data =
        lembreteDataInput
            ? lembreteDataInput.value
            : "";


    const valorTexto =
        lembreteValorInput
            ? lembreteValorInput.value.trim()
            : "";


    const descricao =
        lembreteDescricaoInput
            ? lembreteDescricaoInput.value.trim()
            : "";


    if (
        data === ""
    ) {

        alert(
            "Informe a data do lembrete."
        );

        return;

    }


    if (
        descricao === ""
    ) {

        alert(
            "Informe a descrição do lembrete."
        );

        if (
            lembreteDescricaoInput
        ) {

            lembreteDescricaoInput.focus();

        }

        return;

    }


    let valor =
        0;


    if (
        valorTexto !== ""
    ) {

        valor =
            converterValorLancamento(
                valorTexto
            );


        if (
            valor === null
        ) {

            alert(
                "Informe um valor válido."
            );

            return;

        }

    }


    // =================================================
    // EDITAR
    // =================================================

    if (
        lembreteEmEdicao
    ) {

        const sucesso =
            atualizarLembrete(

                lembreteEmEdicao.id,

                {

                    data:
                        data,

                    valor:
                        valor,

                    descricao:
                        descricao

                }

            );


        if (
            !sucesso
        ) {

            alert(
                "Não foi possível atualizar o lembrete."
            );

            return;

        }

    }

    // =================================================
    // NOVO
    // =================================================

    else {

        adicionarLembrete({

            id:
                gerarIdLembrete(),

            data:
                data,

            valor:
                valor,

            descricao:
                descricao

        });

    }


    fecharModalLembrete();


    renderizarLembretes();


    atualizarIndicadorLembretes();

}


// =====================================================
// GERAR ID DO LEMBRETE
// =====================================================

function gerarIdLembrete() {

    return (

        Date.now().toString() +

        Math.random()
            .toString(36)
            .substring(2, 8)

    );

}


// =====================================================
// EDITAR LEMBRETE
// =====================================================

function editarLembrete(
    id
) {

    const lembrete =
        obterLembretePorId(
            id
        );


    if (
        !lembrete
    ) {

        alert(
            "Lembrete não encontrado."
        );

        return;

    }


    lembreteEmEdicao =
        lembrete;


    if (
        tituloModalLembrete
    ) {

        tituloModalLembrete.textContent =
            "Editar lembrete";

    }


    if (
        btnExcluirLembrete
    ) {

        btnExcluirLembrete.hidden =
            false;

    }


    if (
        lembreteDataInput
    ) {

        lembreteDataInput.value =
            lembrete.data ||
            "";

    }


    if (
        lembreteValorInput
    ) {

        lembreteValorInput.value =
            formatarValorParaEdicaoLancamento(
                lembrete.valor
            );

    }


    if (
        lembreteDescricaoInput
    ) {

        lembreteDescricaoInput.value =
            lembrete.descricao ||
            "";

    }


    if (
        modalLembrete
    ) {

        modalLembrete.hidden =
            false;

    }


    if (
        lembreteDescricaoInput
    ) {

        lembreteDescricaoInput.focus();

    }

}


// =====================================================
// EXCLUIR LEMBRETE
// =====================================================

function excluirLembreteAtual() {

    if (
        !lembreteEmEdicao
    ) {

        return;

    }


    const confirmar =
        confirm(
            "Deseja realmente excluir este lembrete?"
        );


    if (
        !confirmar
    ) {

        return;

    }


    const sucesso =
        excluirLembrete(
            lembreteEmEdicao.id
        );


    if (
        !sucesso
    ) {

        alert(
            "Não foi possível excluir o lembrete."
        );

        return;

    }


    fecharModalLembrete();


    renderizarLembretes();


    atualizarIndicadorLembretes();

}


// =====================================================
// TRATAR CLIQUE NO LEMBRETE
// =====================================================

function tratarCliqueLembrete(
    evento
) {

    const elemento =
        evento.target.closest(
            "[data-id]"
        );


    if (
        !elemento
    ) {

        return;

    }


    const id =
        elemento.dataset.id;


    if (
        !id
    ) {

        return;

    }


    editarLembrete(
        id
    );

}


// =====================================================
// RENDERIZAR LEMBRETES
// =====================================================

function renderizarLembretes() {

    if (
        !listaLembretes
    ) {

        return;

    }


    const lembretes =
        obterLembretes();


    listaLembretes.innerHTML =
        "";


    if (
        quantidadeLembretes
    ) {

        quantidadeLembretes.textContent =
            lembretes.length;

    }


    if (
        lembretes.length ===
        0
    ) {

        if (
            mensagemLembretesVazia
        ) {

            mensagemLembretesVazia.hidden =
                false;

        }

        return;

    }


    if (
        mensagemLembretesVazia
    ) {

        mensagemLembretesVazia.hidden =
            true;

    }


    const ordenados =
        [...lembretes].sort(

            (
                a,
                b
            ) => {

                return String(
                    a.data || ""
                ).localeCompare(
                    String(
                        b.data || ""
                    )
                );

            }

        );


    ordenados.forEach(
        lembrete => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "lembrete-item";


            item.dataset.id =
                lembrete.id;


            item.innerHTML = `

                <div
                    class="lembrete-icone"
                >
                    🔔
                </div>


                <div
                    class="lembrete-info"
                >

                    <strong>
                        ${escaparHtmlLancamento(
                            lembrete.descricao ||
                            "Lembrete"
                        )}
                    </strong>

                    <small>
                        ${formatarDataLancamento(
                            lembrete.data
                        )}
                    </small>

                </div>


                <div
                    class="lembrete-valor"
                >

                    ${
                        Number(
                            lembrete.valor
                        ) > 0

                            ? formatarMoedaLancamento(
                                lembrete.valor
                              )

                            : ""

                    }

                </div>

            `;


            listaLembretes.appendChild(
                item
            );

        }

    );

}


// =====================================================
// ATUALIZAR INDICADOR DE LEMBRETES
// =====================================================

function atualizarIndicadorLembretes() {

    const lembretes =
        obterLembretes();


    const hoje =
        new Date();


    hoje.setHours(
        0,
        0,
        0,
        0
    );


    const pendentes =
        lembretes.filter(
            lembrete => {

                if (
                    !lembrete.data
                ) {

                    return false;

                }


                const partes =
                    String(
                        lembrete.data
                    ).split(
                        "-"
                    );


                if (
                    partes.length !==
                    3
                ) {

                    return false;

                }


                const data =
                    new Date(

                        Number(
                            partes[0]
                        ),

                        Number(
                            partes[1]
                        ) - 1,

                        Number(
                            partes[2]
                        )

                    );


                data.setHours(
                    0,
                    0,
                    0,
                    0
                );


                return data >= hoje;

            }

        );


    if (
        badgeLembretes
    ) {

        badgeLembretes.textContent =
            pendentes.length;


        badgeLembretes.hidden =
            pendentes.length ===
            0;

    }

}


// =====================================================
// ATUALIZAR MÊS
// =====================================================

function atualizarMes() {

    const elementos = [

        document.getElementById(
            "mesAtual"
        ),

        document.getElementById(
            "mesResumo"
        )

    ];


    const hoje =
        new Date();


    const texto =
        hoje.toLocaleDateString(

            "pt-BR",

            {

                month:
                    "long",

                year:
                    "numeric"

            }

        );


    elementos.forEach(
        elemento => {

            if (
                elemento
            ) {

                elemento.textContent =
                    texto;

            }

        }

    );

}


// =====================================================
// CARREGAR TELA
// =====================================================

function carregarTela() {

    mostrarInicio();


    atualizarTela();


    atualizarResumoCompleto();


    atualizarPreviaExportacao();


    renderizarLembretes();


    if (
        typeof renderizarBancos ===
        "function"
    ) {

        renderizarBancos();

    }

}


// =====================================================
// ATUALIZAR VISIBILIDADE DAS DATAS PERSONALIZADAS
// =====================================================

if (
    filtroPeriodo
) {

    filtroPeriodo.addEventListener(
        "change",
        () => {

            if (
                datasPersonalizadas
            ) {

                datasPersonalizadas.hidden =
                    filtroPeriodo.value !==
                    "personalizado";

            }

        }
    );

}


// =====================================================
// ATUALIZAR EXPORTAÇÃO — DATAS PERSONALIZADAS
// =====================================================

if (
    exportarPeriodo
) {

    exportarPeriodo.addEventListener(
        "change",
        () => {

            if (
                exportarDatasPersonalizadas
            ) {

                exportarDatasPersonalizadas.hidden =
                    exportarPeriodo.value !==
                    "personalizado";

            }


            atualizarPreviaExportacao();

        }
    );

}


// =====================================================
// FECHAR MODAIS COM ESC
// =====================================================

document.addEventListener(
    "keydown",
    evento => {

        if (
            evento.key !==
            "Escape"
        ) {

            return;

        }


        if (
            modal &&
            !modal.hidden
        ) {

            fecharModal();

        }


        if (
            modalLembrete &&
            !modalLembrete.hidden
        ) {

            fecharModalLembrete();

        }

    }
);


// =====================================================
// ATUALIZAÇÃO AUTOMÁTICA DO APLICATIVO
// =====================================================

window.addEventListener(
    "storage",
    evento => {

        /*
        -------------------------------------------------
        Caso outra aba/janela do aplicativo altere os
        dados, atualizamos a interface.
        -------------------------------------------------
        */

        if (
            evento.key ===
            "minhas_financas_lancamentos"
        ) {

            atualizarTela();

            atualizarResumoCompleto();

            atualizarPreviaExportacao();

        }


        if (
            evento.key ===
            "minhas_financas_lembretes"
        ) {

            renderizarLembretes();

            atualizarIndicadorLembretes();

        }


        if (
            evento.key ===
            "minhas_financas_bancos"
        ) {

            if (
                typeof renderizarBancos ===
                "function"
            ) {

                renderizarBancos();

            }

        }

    }
);


// =====================================================
// GARANTIR QUE A PÁGINA NÃO FIQUE TRAVADA
// =====================================================

window.addEventListener(
    "pageshow",
    () => {

        try {

            atualizarTela();

            atualizarResumoCompleto();

            atualizarPreviaExportacao();

            renderizarLembretes();

            atualizarIndicadorLembretes();


            if (
                typeof renderizarBancos ===
                "function"
            ) {

                renderizarBancos();

            }

        }

        catch (
            erro
        ) {

            console.error(
                "Erro ao atualizar o aplicativo:",
                erro
            );

        }

    }
);


// =====================================================
// PROTEÇÃO CONTRA ERROS DE LOCALSTORAGE
// =====================================================

window.addEventListener(
    "error",
    evento => {

        console.error(
            "Erro no aplicativo:",
            evento.error ||
            evento.message
        );

    }
);


// =====================================================
// FINAL DO APP.JS
// =====================================================
