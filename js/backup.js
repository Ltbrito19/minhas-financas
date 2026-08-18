/*
=====================================================
MINHAS FINANÇAS
backup.js
Backup e restauração dos dados
=====================================================
*/


// =====================================================
// OBTER DADOS DO BACKUP (VERSÃO 2.0)
// =====================================================

function obterDadosBackup() {

    const lancamentos = obterLancamentos();
    const bancos = obterBancos();
    const lembretes = obterLembretes();

    return {
        aplicativo: "Minhas Finanças",
        versao: "2.0",
        dataBackup: new Date().toISOString(),

        lancamentos: lancamentos,
        bancos: bancos,
        lembretes: lembretes
    };
}


// =====================================================
// GERAR NOME DO BACKUP
// =====================================================

function obterNomeArquivoBackup() {

    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    return (
        "MinhasFinancas_Backup_" +
        ano + "-" + mes + "-" + dia +
        ".json"
    );
}


// =====================================================
// EXPORTAR BACKUP
// =====================================================

async function exportarBackup() {

    try {
        const dados = obterDadosBackup();

        const conteudo = JSON.stringify(dados, null, 4);

        const blob = new Blob([conteudo], {
            type: "application/json"
        });

        const nomeArquivo = obterNomeArquivoBackup();

        // Compartilhamento nativo
        if (navigator.share && navigator.canShare) {
            try {
                const arquivo = new File([blob], nomeArquivo, {
                    type: "application/json"
                });

                if (navigator.canShare({ files: [arquivo] })) {
                    await navigator.share({
                        files: [arquivo],
                        title: "Backup Minhas Finanças",
                        text: "Backup dos dados do aplicativo"
                    });

                    return true;
                }
            } catch (erroCompartilhamento) {
                console.log("Compartilhamento cancelado:", erroCompartilhamento);
                return false;
            }
        }

        // Fallback download
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = nomeArquivo;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(url), 1000);

        return true;

    } catch (erro) {
        console.error("Erro ao criar backup:", erro);
        alert("Não foi possível criar o backup.");
        return false;
    }
}


// =====================================================
// VALIDAR BACKUP (VERSÃO 2.0)
// =====================================================

function validarArquivoBackup(dados) {

    if (!dados || typeof dados !== "object") {
        return { valido: false, mensagem: "O arquivo não contém dados válidos." };
    }

    if (dados.aplicativo !== "Minhas Finanças") {
        return { valido: false, mensagem: "Este arquivo não pertence ao Minhas Finanças." };
    }

    if (!Array.isArray(dados.lancamentos)) {
        return { valido: false, mensagem: "O backup não possui uma lista válida de lançamentos." };
    }

    // Bancos e lembretes são opcionais para compatibilidade com backups antigos
    return { valido: true, mensagem: "Backup válido." };
}


// =====================================================
// LER ARQUIVO
// =====================================================

function lerArquivoBackup(arquivo) {

    return new Promise((resolve, reject) => {

        const leitor = new FileReader();

        leitor.onload = evento => {
            try {
                const dados = JSON.parse(evento.target.result);
                resolve(dados);
            } catch (erro) {
                reject(new Error("O arquivo não é um JSON válido."));
            }
        };

        leitor.onerror = () => {
            reject(new Error("Não foi possível ler o arquivo."));
        };

        leitor.readAsText(arquivo);
    });
}


// =====================================================
// RESTAURAR BACKUP (COMPATÍVEL COM V1 E V2)
// =====================================================

async function restaurarBackup(arquivo) {

    try {
        if (!arquivo) return false;

        const dados = await lerArquivoBackup(arquivo);
        const validacao = validarArquivoBackup(dados);

        if (!validacao.valido) {
            alert(validacao.mensagem);
            return false;
        }

        // 🔥 Compatibilidade com backups antigos (v1)
        const lancamentos = Array.isArray(dados.lancamentos) ? dados.lancamentos : [];

        // Se o backup não tiver bancos/lembretes, cria listas vazias
        const bancos = Array.isArray(dados.bancos) ? dados.bancos : [];
        const lembretes = Array.isArray(dados.lembretes) ? dados.lembretes : [];

        const confirmar = confirm(
            "Este backup possui:\n\n" +
            lancamentos.length + " lançamento(s)\n" +
            bancos.length + " banco(s)\n" +
            lembretes.length + " lembrete(s)\n\n" +
            "Ao restaurar, TODOS os dados atuais serão substituídos.\n\n" +
            "Deseja continuar?"
        );

        if (!confirmar) return false;

        // 🔥 RESTAURAÇÃO COMPLETA (com fallback para backups antigos)
        salvarLancamentos(lancamentos);
        salvarBancos(bancos);
        salvarLembretes(lembretes);

        alert("Backup restaurado com sucesso.");

        // 🔥 ATUALIZA TODAS AS TELAS
        if (typeof carregarTela === "function") carregarTela();
        if (typeof atualizarResumoCompleto === "function") atualizarResumoCompleto();
        if (typeof atualizarPreviaExportacao === "function") atualizarPreviaExportacao();
        if (typeof atualizarTelaBancos === "function") atualizarTelaBancos();
        if (typeof renderizarLembretes === "function") renderizarLembretes();
        if (typeof atualizarIndicadorLembretes === "function") atualizarIndicadorLembretes();

        return true;

    } catch (erro) {
        console.error("Erro ao restaurar backup:", erro);
        alert(erro.message || "Não foi possível restaurar o backup.");
        return false;
    }
}
