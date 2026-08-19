/*
=====================================================
MINHAS FINANÇAS
service-worker.js
Funcionamento offline
=====================================================
*/


// =====================================================
// VERSÃO DO CACHE
// =====================================================

const CACHE_NAME =
    "minhas-financas-v3";


// =====================================================
// ARQUIVOS DO APLICATIVO
// =====================================================

const ARQUIVOS = [

    "./",

    "./index.html",

    "./style.css",

    "./app.js",

    "./js/database.js",

    "./js/lancamentos.js",

    "./js/resumo.js",

    "./js/filtros.js",

    "./js/exportar.js",

    "./js/backup.js",

    "./js/lembretes.js",

    "./js/bancos.js",

    "./auth.js",

    "./manifest.json"

];


// =====================================================
// INSTALAÇÃO
// =====================================================

self.addEventListener(
    "install",

    event => {

        event.waitUntil(

            caches.open(
                CACHE_NAME
            )

            .then(
                cache => {

                    return cache.addAll(
                        ARQUIVOS
                    );

                }
            )

        );


        // Ativa imediatamente a nova versão

        self.skipWaiting();

    }

);


// =====================================================
// ATIVAÇÃO
// =====================================================

self.addEventListener(
    "activate",

    event => {

        event.waitUntil(

            caches.keys()

                .then(
                    nomes => {

                        return Promise.all(

                            nomes

                                .filter(
                                    nome =>
                                        nome !==
                                        CACHE_NAME
                                )

                                .map(
                                    nome =>
                                        caches.delete(
                                            nome
                                        )
                                )

                        );

                    }
                )

        );


        // Assume imediatamente o controle
        // das páginas abertas.

        self.clients.claim();

    }

);


// =====================================================
// FETCH
// =====================================================

self.addEventListener(
    "fetch",

    event => {

        /*
        -------------------------------------------------
        Para arquivos do aplicativo:

        1. Tenta buscar a versão atual na rede.
        2. Atualiza o cache.
        3. Se estiver offline, usa o cache.

        Isso evita que o aplicativo fique preso
        permanentemente em uma versão antiga.
        -------------------------------------------------
        */

        event.respondWith(

            fetch(
                event.request
            )

            .then(
                resposta => {

                    /*
                    -------------------------------------
                    Só armazenamos respostas válidas.
                    -------------------------------------
                    */

                    if (
                        resposta &&
                        resposta.status === 200 &&
                        resposta.type ===
                            "basic"
                    ) {

                        const copia =
                            resposta.clone();


                        caches.open(
                            CACHE_NAME
                        )
                        .then(
                            cache => {

                                cache.put(
                                    event.request,
                                    copia
                                );

                            }
                        );

                    }


                    return resposta;

                }
            )

            .catch(
                () => {

                    /*
                    -------------------------------------
                    Sem internet:
                    utiliza o arquivo salvo no cache.
                    -------------------------------------
                    */

                    return caches.match(
                        event.request
                    );

                }
            )

        );

    }

);
