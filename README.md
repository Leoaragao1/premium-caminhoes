# Site de Veículos Premium

Este projeto foi construído com React + Vite e Firebase. Para hospedar este projeto em seu próprio servidor, siga as instruções abaixo:

## Pré-requisitos
- Node.js instalado
- Uma conta no Firebase com Firestore e Storage ativos.

## Configuração de Ambiente
Crie um arquivo `.env` na raiz do projeto com as chaves do seu projeto Firebase (veja o `.env.example` para referência):

```env
VITE_FIREBASE_API_KEY=sua_chave
VITE_FIREBASE_AUTH_DOMAIN=seu_dominio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_id_do_projeto
VITE_FIREBASE_STORAGE_BUCKET=seu_bucket.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_id_de_mensagens
VITE_FIREBASE_APP_ID=seu_id_da_app
VITE_FIREBASE_FIRESTORE_DATABASE_ID=(default)
```

## Como rodar localmente
1. Instale as dependências: `npm install`
2. Inicie o servidor de desenvolvimento: `npm run dev`

## Como hospedar no seu servidor
1. Gere os arquivos de produção: `npm run build`
2. O comando acima criará uma pasta `dist/`.
3. Tudo o que você precisa fazer é subir o conteúdo da pasta `dist/` para o seu servidor web (Apache, Nginx, Vercel, Netlify, Firebase Hosting, etc.).

## Segurança
Certifique-se de configurar as **Firestore Rules** e **Storage Rules** no console do Firebase para que apenas você possa editar os veículos enquanto o público só possa ler. Use o arquivo `firestore.rules` incluído neste projeto como base.
