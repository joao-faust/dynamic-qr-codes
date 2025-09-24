# Dynamic QR Codes

🌐 [English](README.md) | [Portuguese](README.pt.md) | [Spanish](README.es.md)

This is a **web application** developed as a TCC project to generate and manage **dynamic QR Codes**.

The backend of this project was developed using **[Laravel](https://laravel.com/)** (PHP framework) and **[MySQL](https://www.mysql.com/)** (relational database), while the frontend was built with **[React](https://reactjs.org/)** (JavaScript library for building user interfaces). **[Inertia.js](https://inertiajs.com/)** was used to integrate Laravel with React. **[Docker](https://www.docker.com/)** was employed to create both **development and production environments**.

---

## Prerequisites

To run this project, you will need **Docker** and **Docker Compose** installed. You can install each technology directly on your machine, but using Docker is highly recommended.

Ensure you have **removed the `.example` suffix** from the environment files (.env.example, .db.env.example).

Before deploying the application, clone this repository by running:

```bash
git clone <repo_url>
```

---

## Run in Development Mode

Update the following environment variables in your `.env` file:

```env
APP_URL=http://YOUR_IPV4:8000
APP_ENV=local
APP_DEBUG=true
```

Run the project with:

```bash
docker compose  -f docker-compose.dev.yaml up -d --build
docker exec -ti qr-code-app bash
npm install
composer install
php artisan migrate
php artisan db:seed
php artisan key:generate
php artisan storage:link
npm run dev
```

> Note: In some cases, you may need to use **docker-compose** instead of **docker compose**.

You can now access the application in your browser at **YOUR\_IPV4:8000**.

Default login credentials:

    Email: super@admin.com
    Password: superadmin

---

## Run in Production Mode

Update the following environment variables in your `.env` file:

```env
APP_URL=http://YOUR_IPV4
APP_ENV=production
APP_DEBUG=false
```

Run the project with:

```bash
docker compose  -f docker-compose.prod.yaml up -d --build
docker exec -ti qr-code-app bash
php artisan migrate --force
php artisan db:seed --force
php artisan key:generate --force
php artisan storage:link --force
php artisan optimize
```

> Note: In some cases, you may need to use **docker-compose** instead of **docker compose**.

You can now access the application in your browser at **YOUR\_IPV4**.

Default login credentials:

    Email: super@admin.com
    Password: superadmin
