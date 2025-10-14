# Códigos QR Dinámicos

🌐 [Inglés](README.md) | [Portugués](README.pt.md) | [Español](README.es.md)

Esta es una **aplicación web** desarrollada como proyecto de TCC para generar y gestionar **códigos QR dinámicos**.

El backend de este proyecto fue desarrollado usando **[Laravel](https://laravel.com/)** (framework PHP) y **[MySQL](https://www.mysql.com/)** (base de datos relacional), mientras que el frontend fue construido con **[React](https://reactjs.org/)** (biblioteca de JavaScript para construir interfaces). **[Inertia.js](https://inertiajs.com/)** se utilizó para integrar Laravel con React. **[Docker](https://www.docker.com/)** se empleó para crear entornos de **desarrollo y producción**.

---

## Requisitos Previos

Para ejecutar este proyecto, necesitará tener **Docker** y **Docker Compose** instalados. Es posible instalar cada tecnología directamente en su máquina, pero se recomienda encarecidamente usar Docker.

Si estás usando Windows, se recomienda activar la integración entre Docker y WSL. De lo contrario, podrías experimentar problemas de rendimiento al ejecutar los contenedores.

No olvides marcar la opción de **red privada** al instalar Docker en Windows.

Antes de desplegar la aplicación, clone este repositorio ejecutando:

```bash
git clone <repo_url>
```

O descarga el archivo ZIP.

Asegúrese de **eliminar el sufijo `.example`** de los archivos de entorno (.env.example, .db.env.example). Además, actualiza el valor de server.hmr.host en el archivo de configuración de Vite (vite.config.ts) para que coincida con la dirección IPv4 de tu máquina host.

---

## Ejecutando en Modo de Desarrollo

Actualice las siguientes variables de entorno en su archivo `.env`:

```env
APP_URL=http://YOUR_IPV4:8000
APP_ENV=local
APP_DEBUG=true
DB_HOST=qr-code-db-dev
```

Ejecute el proyecto con:

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

> Observación: En algunos casos, puede ser necesario usar **docker-compose** en lugar de **docker compose**.

Ahora puede acceder a la aplicación en su navegador en **SU\_IPV4:8000**.

Credenciales de inicio de sesión predeterminadas:

    Correo electrónico: super@admin.com
    Contraseña: superadmin

---

## Ejecutando en Modo de Producción

Actualice las siguientes variables de entorno en su archivo `.env`:

```env
APP_URL=http://YOUR_IPV4
APP_ENV=production
APP_DEBUG=false
DB_HOST=qr-code-db
```

Ejecute el proyecto con:

```bash
docker compose  -f docker-compose.prod.yaml up -d --build
docker exec -ti qr-code-app bash
php artisan migrate --force
php artisan db:seed --force
php artisan key:generate --force
php artisan storage:link --force
php artisan optimize
```

> Observación: En algunos casos, puede ser necesario usar **docker-compose** en lugar de **docker compose**.

Ahora puede acceder a la aplicación en su navegador en **SU\_IPV4**.

Credenciales de inicio de sesión predeterminadas:

    Correo electrónico: super@admin.com
    Contraseña: superadmin

---

## Solución de Problemas

Si algo sale mal durante la implementación, puede reiniciar los contenedores y volúmenes con:

```bash
# En modo desarrollo
docker compose -f docker-compose.dev.yaml down -v
# En modo producción
docker compose -f docker-compose.prod.yaml down -v
```

> Observación: En algunos casos, puede ser necesario usar **docker-compose** en lugar de **docker compose**.
