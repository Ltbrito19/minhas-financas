alert("BANCOS.JS FOI CARREGADO");

/*
=====================================================
MINHAS FINANÇAS
bancos.js
Controle dos saldos bancários
=====================================================
*/


// =====================================================
// CHAVE DO ARMAZENAMENTO
// =====================================================

const DB_BANCOS_CHAVE =
    "minhas_financas_bancos";


// =====================================================
// OBTER BANCOS
// =====================================================

function obterBancos() {

    const dados =
        localStorage.getItem(
            DB_BANCOS_CHAVE
        );


    if (!dados) {

        return [];

    }


    try {

        const bancos =
            JSON.parse(
                dados
            );


        if (
            !Array.isArray(
                bancos
            )
        ) {

            return [];

        }


        return bancos;

    }

    catch (
        erro
    ) {

        console.error(
            "Erro ao carregar bancos:",
            erro
        );


        return [];

    }

}


// =====================================================
// SALVAR BANCOS
// =====================================================

function salvarBancos(
    bancos
) {

    localStorage.setItem(

        DB_BANCOS_CHAVE,

        JSON.stringify(
            bancos
        )

    );

}


// =====================================================
// GERAR ID
// =====================================================

function gerarIdBanco() {

    return (
        Date.now().toString() +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );

}


// =====================================================
// ADICIONAR BANCO
// =====================================================

function adicionarBanco(
    nome,
    saldo = 0
) {

    const bancos =
        obterBancos();


    const banco = {

        id:
            gerarIdBanco(),

        nome:
            String(
                nome
            ).trim(),

        saldo:
            Number(
                saldo
            ) || 0

    };


    bancos.push(
        banco
    );


    salvarBancos(
        bancos
    );


    return banco;

}


// =====================================================
// ATUALIZAR BANCO
// =====================================================

function atualizarBanco(
    id,
    dadosAtualizados
) {

    const bancos =
        obterBancos();


    const indice =
        bancos.findIndex(
            banco =>
                banco.id === id
        );


    if (
        indice === -1
    ) {

        return false;

    }


    bancos[indice] = {

        ...bancos[indice],

        ...dadosAtualizados

    };


    if (
        dadosAtualizados.saldo !==
        undefined
    ) {

        bancos[indice].saldo =
            Number(
                dadosAtualizados.saldo
            ) || 0;

    }


    salvarBancos(
        bancos
    );


    return true;

}


// =====================================================
// ALTERAR SALDO
// =====================================================

function alterarSaldoBanco(
    id,
    novoSaldo
) {

    return atualizarBanco(

        id,

        {

            saldo:
                Number(
                    novoSaldo
                ) || 0

        }

    );

}


// =====================================================
// EXCLUIR BANCO
// =====================================================

function excluirBanco(
    id
) {

    const bancos =
        obterBancos();


    const novosBancos =
        bancos.filter(
            banco =>
                banco.id !== id
        );


    if (
        novosBancos.length ===
        bancos.length
    ) {

        return false;

    }


    salvarBancos(
        novosBancos
    );


    return true;

}


// =====================================================
// OBTER BANCO POR ID
// =====================================================

function obterBancoPorId(
    id
) {

    const bancos =
        obterBancos();


    return bancos.find(
        banco =>
            banco.id === id
    );

}


// =====================================================
// CALCULAR TOTAL DOS BANCOS
// =====================================================

function obterTotalBancos() {

    const bancos =
        obterBancos();


    return bancos.reduce(

        (
            total,
            banco
        ) => {

            return (
                total +
                (
                    Number(
                        banco.saldo
                    ) || 0
                )
            );

        },

        0

    );

}


// =====================================================
// FORMATAR VALOR
// =====================================================

function formatarSaldoBanco(
    valor
) {

    return Number(
        valor
    || 0
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
// RENDERIZAR BANCOS
// =====================================================

function renderizarBancos() {

    const lista =
        document.getElementById(
            "listaBancos"
        );


    const quantidade =
        document.getElementById(
            "quantidadeBancos"
        );


    const total =
        document.getElementById(
            "totalBancos"
        );


    if (
        !lista
    ) {

        return;

    }


    const bancos =
        obterBancos();


    // =============================================
    // QUANTIDADE
    // =============================================

    if (
        quantidade
    ) {

        quantidade.textContent =
            bancos.length;

    }


    // =============================================
    // TOTAL
    // =============================================

    if (
        total
    ) {

        total.textContent =
            formatarSaldoBanco(
                obterTotalBancos()
            );

    }


    // =============================================
    // LISTA VAZIA
    // =============================================

    if (
        bancos.length === 0
    ) {

        lista.innerHTML = `

            <div
                class="vazio"
                id="mensagemBancosVazia"
            >

                <div class="icone-vazio">
                    🏦
                </div>

                <h3>
                    Nenhum banco cadastrado
                </h3>

                <p>
                    Adicione seu primeiro banco
                    para acompanhar o saldo.
                </p>

            </div>

        `;


        return;

    }


    // =============================================
    // RENDERIZAR LISTA
    // =============================================

    lista.innerHTML = "";


    bancos.forEach(
        banco => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "lancamento";


            const saldo =
                Number(
                    banco.saldo
                ) || 0;


            const classeSaldo =
                saldo < 0
                    ? "saida"
                    : "entrada";


            item.innerHTML = `

                <div
                    class="lancamento-icone"
                >
                    🏦
                </div>


                <div
                    class="lancamento-info"
                >

                    <strong>
                        ${escaparTextoBanco(
                            banco.nome
                        )}
                    </strong>

                    <small
                        class="${classeSaldo}"
                    >
                        ${formatarSaldoBanco(
                            saldo
                        )}
                    </small>

                </div>


                <button
                    type="button"
                    class="btn-editar-banco"
                    data-id="${banco.id}"
                >
                    Editar
                </button>

            `;


            lista.appendChild(
                item
            );

        }
    );

}


// =====================================================
// ESCAPAR TEXTO
// =====================================================

function escaparTextoBanco(
    texto
) {

    return String(
        texto
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
// INICIALIZAR BANCOS PADRÃO
// =====================================================

function inicializarBancosPadrao() {

    const bancos =
        obterBancos();


    if (
        bancos.length > 0
    ) {

        return;

    }


    const bancosPadrao = [

        {
            nome:
                "Sicoob",

            saldo:
                0

        },

        {
            nome:
                "Contabilizei",

            saldo:
                0

        },

        {
            nome:
                "Revolut",

            saldo:
                0

        },

        {
            nome:
                "Mercado Pago",

            saldo:
                0

        },

        {
            nome:
                "Porto Bank",

            saldo:
                0

        }

    ];


    const novosBancos =
        bancosPadrao.map(

            banco => ({

                id:
                    gerarIdBanco(),

                nome:
                    banco.nome,

                saldo:
                    banco.saldo

            })

        );


    salvarBancos(
        novosBancos
    );

}


// =====================================================
// DISPONIBILIZAR FUNÇÕES PARA O APP
// =====================================================

window.obterBancos =
    obterBancos;

window.salvarBancos =
    salvarBancos;

window.adicionarBanco =
    adicionarBanco;

window.atualizarBanco =
    atualizarBanco;

window.alterarSaldoBanco =
    alterarSaldoBanco;

window.excluirBanco =
    excluirBanco;

window.obterBancoPorId =
    obterBancoPorId;

window.obterTotalBancos =
    obterTotalBancos;

window.renderizarBancos =
    renderizarBancos;

window.inicializarBancosPadrao =
    inicializarBancosPadrao;
