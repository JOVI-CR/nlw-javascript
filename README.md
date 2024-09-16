# Aplicativo de Metas

Este é um simples aplicativo de linha de comando para gerenciamento de metas pessoais, desenvolvido como um projeto de estudo para revisar conceitos de JavaScript e Node.js.

## Objetivo

O objetivo principal deste projeto é criar uma ferramenta interativa que permita aos usuários:
- Cadastrar novas metas
- Listar metas existentes
- Marcar metas como concluídas
- Visualizar metas realizadas e abertas
- Deletar metas

## Funcionalidades

1. **Cadastrar meta**: Adiciona uma nova meta à lista.
2. **Listar metas**: Exibe todas as metas e permite marcar/desmarcar como concluídas.
3. **Metas realizadas**: Mostra uma lista de metas já concluídas.
4. **Metas abertas**: Exibe metas ainda não concluídas.
5. **Deletar metas**: Permite remover metas da lista.

## Como instalar

1. Certifique-se de ter o Node.js instalado em seu sistema.
2. Clone este repositório:
   ```
   git clone https://github.com/JOVI-CR/nlw-javascript.git
   ```
3. Navegue até o diretório do projeto:
   ```
   cd [nome-do-diretorio]
   ```
4. Instale as dependências:
   ```
   npm install
   ```

## Como usar

Execute o aplicativo com o seguinte comando:

```
node index.js
```

Siga as instruções na tela para interagir com o aplicativo.

## Estrutura do código

- O código utiliza o pacote `@inquirer/prompts` para criar uma interface de linha de comando interativa.
- As metas são armazenadas em um arquivo JSON (`metas.json`).
- Funções assíncronas são usadas para operações de leitura/escrita de arquivos e interações com o usuário.
- O aplicativo é estruturado em várias funções, cada uma responsável por uma operação específica (cadastrar, listar, deletar, etc.).
- Um loop principal (`start()`) gerencia o fluxo do aplicativo, permitindo que o usuário escolha diferentes ações.

## Tecnologias utilizadas

- JavaScript
- Node.js
- fs (File System) para operações de arquivo
- @inquirer/prompts para interface de linha de comando

## Aprendizados

Este projeto demonstra o uso de:
- Programação assíncrona em JavaScript
- Manipulação de arquivos com Node.js
- Criação de interfaces de linha de comando interativas
- Estruturação de código em funções modulares
- Uso de arrays e objetos para gerenciamento de dados

---

Sinta-se à vontade para contribuir com melhorias ou usar este projeto como base para seus próprios estudos em JavaScript e Node.js!
