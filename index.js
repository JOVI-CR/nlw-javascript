// Importa funções de prompt do pacote '@inquirer/prompts'
const { select, input, checkbox } = require('@inquirer/prompts');
// Importa a função de log do módulo 'console'
const { log } = require('console');

// Importa o módulo 'fs' com suporte a Promises
const fs = require("fs").promises

// Mensagem de boas-vindas
let mensagem = "Bem vindo(a) ao App de metas";

// Variável para armazenar as metas
let metas;

// Função assíncrona para carregar metas do arquivo
const carregarMetas = async () => {
    try {
        // Tenta ler o arquivo 'metas.json'
        const dados = await fs.readFile("metas.json", "utf-8");
        // Converte o conteúdo do arquivo para objeto JavaScript
        metas = JSON.parse(dados);
    }
    catch(erro) {
        // Se ocorrer um erro (arquivo não existe), inicializa metas como array vazio
        metas = [];
    }
}

// Função assíncrona para salvar metas no arquivo
const salvarMetas = async () => {
    // Escreve o array de metas no arquivo 'metas.json'
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

// Função assíncrona para cadastrar uma nova meta
const cadastrarMeta = async () => {
    // Solicita ao usuário que digite a meta
    const meta = await input({ message: "Digite a meta: "})

    // Verifica se a meta está vazia
    if(meta.length == 0) {
        mensagem = 'O campo "meta" não pode estar vazio.';   
        return    
    }

    // Adiciona a nova meta ao array de metas
    metas.push({ value: meta, checked: false })

    // Define mensagem de sucesso
    mensagem = "Meta cadastrada com sucesso!"
}

// Função assíncrona para listar e marcar metas como concluídas
const listarMetas = async () => {
    // Verifica se há metas cadastradas
    if(metas.length == 0) {
        mensagem = "Nenhuma meta cadastrada"
        return;
    }

    // Exibe lista de metas para o usuário selecionar
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar/desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    // Desmarca todas as metas
    metas.forEach((m) => {
        m.checked = false;
    })

    // Verifica se alguma meta foi selecionada
    if(respostas.length == 0) {
        mensagem = "Nenhuma meta foi selecionada";
        return
    }

    // Marca as metas selecionadas como concluídas
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        })

        meta.checked = true;
    })

    // Define mensagem de sucesso
    mensagem = 'Meta(s) concluída(s)';
    
}

// Função assíncrona para exibir metas realizadas
const metasRealizadas = async () => {
    // Verifica se há metas cadastradas
    if(metas.length == 0) {
        mensagem = "Nenhuma meta cadastrada"
        return;
    }

    // Filtra metas realizadas
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    // Verifica se há metas realizadas
    if(realizadas.length == 0) {
        mensagem = 'Nenhuma meta realizada! :(';
        return;
    }

    // Exibe lista de metas realizadas
    await select({
        message: "Metas Realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

// Função assíncrona para exibir metas abertas (não realizadas)
const metasAbertas = async () => {
    // Verifica se há metas cadastradas
    if(metas.length == 0) {
        mensagem = "Nenhuma meta cadastrada"
        return;
    }

    // Filtra metas abertas
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    // Verifica se há metas abertas
    if(abertas.length == 0) {
        mensagem = "Não existem metas abertas!";
        return;
    }

    // Exibe lista de metas abertas
    await select ({
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    })
}

// Função assíncrona para deletar metas
const deletarMetas = async () => {
    // Verifica se há metas cadastradas
    if(metas.length == 0) {
        mensagem = "Nenhuma meta cadastrada"
        return;
    }
    
    // Cria uma cópia das metas com todas desmarcadas
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    // Exibe lista de metas para o usuário selecionar quais deletar
    const itemDeletar = await checkbox({
        message: "Selecione item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    // Verifica se alguma meta foi selecionada para deletar
    if(itemDeletar.length == 0) {
        mensagem = "Nenhum item selecionado!";
        return;
    }

    // Remove as metas selecionadas do array de metas
    itemDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    // Exibe mensagem de sucesso
    console.log("Meta(s) deletada(s) com sucesso!");
}

// Função para limpar a tela e exibir mensagens
const mostrarMensagem = () => {
    console.clear();

    if(mensagem != "") {
        console.log(mensagem);
        console.log("");
        mensagem = ""
    }
}

// Função principal que inicia o aplicativo
const start = async () => {
    // Carrega metas do arquivo
    await carregarMetas();

    // Loop principal do aplicativo
    while(true) {
        mostrarMensagem()
        // Salva metas no arquivo após cada operação
        await salvarMetas()
        
        // Exibe menu principal e aguarda seleção do usuário
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        // Executa a função correspondente à opção selecionada
        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                break;
            case "listar":
                await listarMetas()
                break;
            case "realizadas":
                await metasRealizadas()
                break;
            case "abertas":
                await metasAbertas()
                break;
            case "deletar":
                await deletarMetas()
                break;
            case "sair":
                console.log("Até a próxima!");               
                return;               
        }
    }
    
    
}

// Inicia o aplicativo
start();