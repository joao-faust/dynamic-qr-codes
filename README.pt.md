# QR Codes Dinâmicos

🌐 [Inglês](README.md) | [Português](README.pt.md) | [Espanhol](README.es.md)

Esta é uma **aplicação web** desenvolvida como projeto de TCC para gerar e gerenciar **QR Codes dinâmicos**.

O backend deste projeto foi desenvolvido usando **[Laravel](https://laravel.com/)** (framework PHP) e **[MySQL](https://www.mysql.com/)** (banco de dados relacional), enquanto o frontend foi construído com **[React](https://reactjs.org/)** (biblioteca JavaScript para construção de interfaces). **[Inertia.js](https://inertiajs.com/)** foi utilizado para integrar Laravel com React. **[Docker](https://www.docker.com/)** foi empregado para criar ambientes de **desenvolvimento e produção**.

---

## Pré-requisitos

Para executar este projeto, você precisará ter o **Docker** e o **Docker Compose** instalados. É possível instalar cada tecnologia diretamente em sua máquina, mas o uso do Docker é altamente recomendado.

Certifique-se de **remover o sufixo `.example`** dos arquivos de ambiente (.env.example, .db.env.example).

Antes de implantar a aplicação, clone este repositório executando:

```bash
git clone <repo_url>
```

---

## Executando em Modo de Desenvolvimento

Atualize as seguintes variáveis de ambiente em seu arquivo `.env`:

```env
APP_URL=http://YOUR_IPV4:8000
APP_ENV=local
APP_DEBUG=true
DB_HOST=qr-code-db-dev
```

Execute o projeto com:

```bash
docker compose  -f docker-compose.dev.yaml up -d --build
docker exec -ti qr-code-app-dev bash
npm install
composer install
php artisan migrate
php artisan db:seed
php artisan key:generate
php artisan storage:link
npm run dev
```

> Observação: Em alguns casos, pode ser necessário usar **docker-compose** em vez de **docker compose**.

Agora você pode acessar a aplicação no seu navegador em **SEU\_IPV4:8000**.

Credenciais de login padrão:

    Email: super@admin.com
    Senha: superadmin

---

## Executando em Modo de Produção

Atualize as seguintes variáveis de ambiente em seu arquivo `.env`:

```env
APP_URL=http://YOUR_IPV4
APP_ENV=production
APP_DEBUG=false
DB_HOST=qr-code-db
```

Execute o projeto com:

```bash
docker compose  -f docker-compose.prod.yaml up -d --build
docker exec -ti qr-code-app bash
php artisan migrate --force
php artisan db:seed --force
php artisan key:generate --force
php artisan storage:link --force
php artisan optimize
```

> Observação: Em alguns casos, pode ser necessário usar **docker-compose** em vez de **docker compose**.

Agora você pode acessar a aplicação no seu navegador em **SEU\_IPV4**.

Credenciais de login padrão:

    Email: super@admin.com
    Senha: superadmin

---

## Solução de Problemas

Se algo der errado durante a implantação, você pode reiniciar os containers e volumes com:

```bash
# No modo de desenvolvimento
docker compose -f docker-compose.dev.yaml down -v
# No modo de produção
docker compose -f docker-compose.prod.yaml down -v
```

> Observação: Em alguns casos, pode ser necessário usar **docker-compose** em vez de **docker compose**.
