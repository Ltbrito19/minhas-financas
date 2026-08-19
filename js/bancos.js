/*
=====================================================
MINHAS FINANÇAS
bancos.js
Controle dos bancos e saldos bancários

Responsável por:
- Criar bancos
- Editar bancos
- Excluir bancos
- Alterar saldos
- Calcular total
- Renderizar a tela de bancos
- Inicializar bancos padrão

IMPORTANTE:
A persistência utiliza as funções do database.js.

A chave "minhas_financas_bancos" permanece
inalterada para preservar os dados existentes.
=====================================================
*/


// =====================================================
// ARMAZENAMENTO
// =====================================================
//
// O database.js é responsável pelo armazenamento.
//
// Aqui NÃO declaramos novamente:
// const DB_BANCOS_CHAVE
//
// Isso evita conflito entre os arquivos JS.
// =====================================================


// =====================================================
// OBTER BANCOS
// =====================================================

window.obterBancos =
function obterBancos() {

    const dados =
        localStorage.getItem(
            "minhas_financas_bancos"
        );


    if (
        !dados
    ) {

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

};


// =====================================================
// SALVAR BANCOS
// =====================================================

window.salvarBancos =
function salvarBancos(
    bancos
) {

    localStorage.setItem(

        "minhas_financas_bancos",

        JSON.stringify(
            bancos
        )

    );

};


// =====================================================
// GERAR ID DO BANCO
// =====================================================

window.gerarIdBanco =
function gerarIdBanco() {

    return (

        Date.now().toString() +

        Math.random()
            .toString(36)
            .substring(2, 8)

    );

};


// =====================================================
// ADICIONAR BANCO
// =====================================================

window.adicionarBanco =
function adicionarBanco(
    nome,
    saldo = 0
) {

    const nomeBanco =
        String(
            nome || ""
        ).trim();


    if (
        nomeBanco === ""
    ) {

        return false;

    }


    const bancos =
        window.obterBancos();


    const banco = {

        id:
            window.gerarIdBanco(),

        nome:
            nomeBanco,

        saldo:
            Number(
                saldo
            ) || 0

    };


    bancos.push(
        banco
    );


    window.salvarBancos(
        bancos
    );


    return banco;

};


// =====================================================
// ATUALIZAR BANCO
// =====================================================

window.atualizarBanco =
function atualizarBanco(
    id,
    dadosAtualizados = {}
) {

    const bancos =
        window.obterBancos();


    const indice =
        bancos.findIndex(
            banco =>
                String(
                    banco.id
                ) ===
                String(
                    id
                )
        );


    if (
        indice === -1
    ) {

        return false;

    }


    const bancoAtual =
        bancos[indice];


    const novoNome =
        dadosAtualizados.nome !==
        undefined

            ? String(
                dadosAtualizados.nome
              ).trim()

            : bancoAtual.nome;


    if (
        novoNome === ""
    ) {

        return false;

    }


    let novoSaldo =
        bancoAtual.saldo;


    if (
        dadosAtualizados.saldo !==
        undefined
    ) {

        novoSaldo =
            Number(
                dadosAtualizados.saldo
            );


        if (
            !Number.isFinite(
                novoSaldo
            )
        ) {

            novoSaldo = 0;

        }

    }


    bancos[indice] = {

        ...bancoAtual,

        ...dadosAtualizados,

        nome:
            novoNome,

        saldo:
            novoSaldo

    };


    window.salvarBancos(
        bancos
    );


    return true;

};


// =====================================================
// ALTERAR SALDO DO BANCO
// =====================================================

window.alterarSaldoBanco =
function alterarSaldoBanco(
    id,
    novoSaldo
) {

    const saldo =
        Number(
            novoSaldo
        );


    if (
        !Number.isFinite(
            saldo
        )
    ) {

        return false;

    }


    return window.atualizarBanco(

        id,

        {

            saldo:
                saldo

        }

    );

};


// =====================================================
// EXCLUIR BANCO
// =====================================================

window.excluirBanco =
function excluirBanco(
    id
) {

    const bancos =
        window.obterBancos();


    const novosBancos =
        bancos.filter(
            banco =>
                String(
                    banco.id
                ) !==
                String(
                    id
                )
        );


    if (
        novosBancos.length ===
        bancos.length
    ) {

        return false;

    }


    window.salvarBancos(
        novosBancos
    );


    return true;

};


// =====================================================
// OBTER BANCO POR ID
// =====================================================

window.obterBancoPorId =
function obterBancoPorId(
    id
) {

    const bancos =
        window.obterBancos();


    return bancos.find(
        banco =>
            String(
                banco.id
            ) ===
            String(
                id
            )
    );

};


// =====================================================
// CALCULAR TOTAL DOS BANCOS
// =====================================================

window.obterTotalBancos =
function obterTotalBancos() {

    const bancos =
        window.obterBancos();


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

};


// =====================================================
// FORMATAR SALDO
// =====================================================

window.formatarSaldoBanco =
function formatarSaldoBanco(
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

};


// =====================================================
// ESCAPAR TEXTO
// =====================================================

window.escaparTextoBanco =
function escaparTextoBanco(
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

};


// =====================================================
// RENDERIZAR BANCOS
// =====================================================

window.renderizarBancos =
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

        console.warn(
            "Elemento listaBancos não encontrado."
        );

        return;

    }


    const bancos =
        window.obterBancos();


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
            window.formatarSaldoBanco(
                window.obterTotalBancos()
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
                        ${window.escaparTextoBanco(
                            banco.nome
                        )}
                    </strong>

                    <small
                        class="${classeSaldo}"
                    >
                        ${window.formatarSaldoBanco(
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

};


// =====================================================
// INICIALIZAR BANCOS PADRÃO
// =====================================================
//
// IMPORTANTE:
// Só cria os bancos padrão se NÃO EXISTIR nenhum
// banco salvo.
//
// Se já houver bancos, absolutamente nada será
// alterado.
// =====================================================

window.inicializarBancosPadrao =
function inicializarBancosPadrao() {

    const bancos =
        window.obterBancos();


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
                    window.gerarIdBanco(),

                nome:
                    banco.nome,

                saldo:
                    banco.saldo

            })

        );


    window.salvarBancos(
        novosBancos
    );

};


// =====================================================
// FIM
// =====================================================
