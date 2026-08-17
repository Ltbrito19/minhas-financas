// =====================================================
// CHAVE DO LOCALSTORAGE
// =====================================================

const DB_BANCOS_CHAVE = "minhas_financas_bancos";

// =====================================================
// OBTER BANCOS
// =====================================================

window.obterBancos = function obterBancos() {
    const texto = localStorage.getItem(DB_BANCOS_CHAVE);
    return texto ? JSON.parse(texto) : [];
};

// =====================================================
// SALVAR BANCOS
// =====================================================

window.salvarBancos = function salvarBancos(lista) {
    localStorage.setItem(DB_BANCOS_CHAVE, JSON.stringify(lista));
};

// =====================================================
// ADICIONAR BANCO
// =====================================================

window.adicionarBanco = function adicionarBanco(nome, saldo) {
    const bancos = window.obterBancos();

    bancos.push({
        id: Date.now(),
        nome,
        saldo
    });

    window.salvarBancos(bancos);
};

// =====================================================
// ATUALIZAR SALDO DO BANCO
// =====================================================

window.atualizarSaldoBanco = function atualizarSaldoBanco(id, novoSaldo) {
    const bancos = window.obterBancos();
    const banco = bancos.find(b => b.id === id);

    if (!banco) return;

    banco.saldo = novoSaldo;

    window.salvarBancos(bancos);
};

// =====================================================
// EXCLUIR BANCO
// =====================================================

window.excluirBanco = function excluirBanco(id) {
    const bancos = window.obterBancos();
    const novaLista = bancos.filter(b => b.id !== id);

    window.salvarBancos(novaLista);
};

// =====================================================
// TOTAL DE BANCOS
// =====================================================

window.obterTotalBancos = function obterTotalBancos() {
    const bancos = window.obterBancos();
    return bancos.reduce((total, b) => total + Number(b.saldo || 0), 0);
};

// =====================================================
// FORMATAR SALDO
// =====================================================

window.formatarSaldoBanco = function formatarSaldoBanco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
};

// =====================================================
// ESCAPAR TEXTO
// =====================================================

window.escaparTextoBanco = function escaparTextoBanco(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
};

// =====================================================
// EDITAR BANCO (OPÇÃO 1 - VIA PROMPT)
// =====================================================

window.editarBanco = function editarBanco(id) {

    const bancos = window.obterBancos();
    const banco = bancos.find(b => b.id === id);

    if (!banco) {
        alert("Banco não encontrado.");
        return;
    }

    const novoSaldo = prompt(
        `Saldo atual de ${banco.nome}: ${window.formatarSaldoBanco(banco.saldo)}\n\nDigite o novo saldo:`
    );

    if (novoSaldo === null) return;

    let saldoTexto = novoSaldo.trim();
    saldoTexto = saldoTexto.replace(/R\$/gi, "").trim();
    saldoTexto = saldoTexto.replace(/\./g, "");
    saldoTexto = saldoTexto.replace(",", ".");
    const saldoNumerico = Number(saldoTexto);

    if (isNaN(saldoNumerico)) {
        alert("Digite um saldo válido.");
        return;
    }

    banco.saldo = saldoNumerico;

    window.salvarBancos(bancos);
    window.renderizarBancos();
};

// =====================================================
// RENDERIZAR BANCOS
// =====================================================

window.renderizarBancos = function renderizarBancos() {

    const lista = document.getElementById("listaBancos");
    const quantidade = document.getElementById("quantidadeBancos");
    const total = document.getElementById("totalBancos");

    if (!lista) return;

    const bancos = window.obterBancos();

    // QUANTIDADE
    if (quantidade) quantidade.textContent = bancos.length;

    // TOTAL
    if (total) total.textContent = window.formatarSaldoBanco(window.obterTotalBancos());

    // LISTA VAZIA
    if (bancos.length === 0) {
        lista.innerHTML = `
            <div class="vazio" id="mensagemBancosVazia">
                <div class="icone-vazio">🏦</div>
                <h3>Nenhum banco cadastrado</h3>
                <p>Adicione seu primeiro banco para acompanhar o saldo.</p>
            </div>
        `;
        return;
    }

    // RENDERIZAR LISTA
    lista.innerHTML = "";

    bancos.forEach(banco => {

        const item = document.createElement("div");
        item.className = "item-banco";

        const saldo = Number(banco.saldo) || 0;
        const classeSaldo = saldo < 0 ? "saida" : "entrada";

        item.innerHTML = `
            <div class="lancamento-icone">🏦</div>
            <div class="lancamento-info">
                <strong>${window.escaparTextoBanco(banco.nome)}</strong>
                <small class="${classeSaldo}">
                    ${window.formatarSaldoBanco(saldo)}
                </small>
            </div>
        `;

        // CLIQUE PARA EDITAR
        item.addEventListener("click", () => {
            window.editarBanco(banco.id);
        });

        lista.appendChild(item);
    });
};

console.log("BANCOS.JS CARREGADO");

