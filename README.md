# Sequelize-cli

Criação de API com Express e Sequelize-cli (atividade do curso Geração Tech)

## Passo a passo da criação do projeto

### Iniciar um projeto node
```
npm init -y
```

### Instalar as dependências
```
npm i express sequelize sequelize-cli nodemon mysql2 bcrypt jsonwebtoken cors dotenv swagger-jsdoc swagger-ui-express nodemailer
```

### Iniciar o Sequelize-cli
```
npx sequelize-cli init
```

### Ajustar a conexão com o banco de dados e configurar as variáveis de ambiente
Criar index.js na raiz do projeto
Criar config.js na pasta config e ajustar as variáveis de ambiente de acordo com o .env
Criar script para iniciar o nodemon

### Criar o banco
```
npx sequelize-cli db:create
```

### Executar a criação das migrations
- Exemplo:
```
npx sequelize-cli model:generate --name Usuario --attributes email:string,senha:string,role:string,emailVerificado:boolean,codigoVerificacao:string,codigoExpiracao:date

npx sequelize-cli model:generate --name Endereco --attributes rua:string,numero:string,cidade:string,estado:string,cep:string,complemento:string

npx sequelize-cli model:generate --name Aluno --attributes nome:string,dataNascimento:date,usuarioId:integer,enderecoId:integer

npx sequelize-cli model:generate --name Professor --attributes nome:string,disciplina:string,usuarioId:integer,enderecoId:integer

npx sequelize-cli model:generate --name Turma --attributes nome:string,ano:integer,professorId:integer

npx sequelize-cli model:generate --name AlunoTurma --attributes alunoId:integer,turmaId:integer

npx sequelize-cli model:generate --name Avaliacao --attributes alunoId:integer,turmaId:integer,professorId:integer,nota:decimal,dataAvaliacao:date,observacao:string
```

### Enviar as migrations para o banco
```
npx sequelize-cli db:migrate
```

### Integrar com AI
```
npm i @google/generative-ai
```

Gera uma key na Gemini e coloca no .env
