const { select, input, checkbox } = require('@inquirer/prompts');
const { log } = require('console');

let meta = {
    value: 'Tomar 2L de água por dia',
    checked: false,
}
let metas = [meta];

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta: "})

    if(meta.length == 0) {
        console.log('O campo "meta" não pode estar vazio.');   
        return    
    }

    metas.push({ value: meta, checked: false })
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar/desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false;
    })

    if(respostas.length == 0) {
        console.log("Nenhuma meta foi selecionada");
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        })

        meta.checked = true;
    })

    console.log('Meta(s) concluída(s)');
    
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log('Nenhuma meta realizada! :(');
        return;
    }

    await select({
        message: "Metas Realizadas",
        choices: [...realizadas]
    })
}

const start = async () => {
    while(true) {
        
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
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas);
                break;
            case "listar":
                await listarMetas()
                break;
            case "realizadas":
                await metasRealizadas()
                break;
            case "sair":
                console.log("Até a próxima!");               
                return;               
        }
    }
    
    
}

start();