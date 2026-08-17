// =====================================================
// CHAVES DO LOCALSTORAGE
// =====================================================

const DB_LANCAMENTOS_CHAVE = "minhas_financas_lancamentos";
const DB_LEMBRETES_CHAVE   = "minhas_financas_lembretes";
const DB_BACKUP_CHAVE      = "minhas_financas_backup";

// =====================================================
// LANCAMENTOS
// =====================================================

function obterLancamentos() {
    const texto = localStorage.getItem(DB_LANCAMENTOS_CHAVE);
    return texto ? JSON.parse(texto) : [];
}

function salvarLancamentos(lista) {
    localStorage.setItem(DB_LANCAMENTOS_CHAVE, JSON.stringify(lista));
}

function adicionarLancamento(lancamento) {
    const lista = obterLancamentos();
    lista.push(lancamento);
    salvarLancamentos(lista);
}

function atualizarLancamento(id, dadosAtualizados) {
    const lista = obterLancamentos();
    const indice = lista.findIndex(l => l.id === id);

    if (indice !== -1) {
        lista[indice] = { ...lista[indice], ...dadosAtualizados };
        salvarLancamentos(lista);
    }
}

function excluirLancamento(id) {
    const lista = obterLancamentos();
    const novaLista = lista.filter(l => l.id !== id);
    salvarLancamentos(novaLista);
}

function limparTodosLancamentos() {
    localStorage.removeItem(DB_LANCAMENTOS_CHAVE);
}

// =====================================================
// LEMBRETES
// =====================================================

function obterLembretes() {
    const texto = localStorage.getItem(DB_LEMBRETES_CHAVE);
    return texto ? JSON.parse(texto) : [];
}

function salvarLembretes(lista) {
    localStorage.setItem(DB_LEMBRETES_CHAVE, JSON.stringify(lista));
}

function adicionarLembrete(lembrete) {
    const lista = obterLembretes();
    lista.push(lembrete);
    salvarLembretes(lista);
}

function atualizarLembrete(id, dadosAtualizados) {
    const lista = obterLembretes();
    const indice = lista.findIndex(l => l.id === id);

    if (indice !== -1) {
        lista[indice] = { ...lista[indice], ...dadosAtualizados };
        salvarLembretes(lista);
    }
}

function excluirLembrete(id) {
    const lista = obterLembretes();
    const novaLista = lista.filter(l => l.id !== id);
    salvarLembretes(novaLista);
}

function limparTodosLembretes() {
    localStorage.removeItem(DB_LEMBRETES_CHAVE);
}

// =====================================================
// BACKUP
// =====================================================

function criarBackupCompleto() {
    return {
        lancamentos: obterLancamentos(),
        lembretes: obterLembretes()
    };
}

function restaurarBackupCompleto(dados) {
    if (dados.lancamentos) {
        salvarLancamentos(dados.lancamentos);
    }

    if (dados.lembretes) {
        salvarLembretes(dados.lembretes);
    }
}
