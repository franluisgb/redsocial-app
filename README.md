# Proyecto Red Social Backend INLAZE

Aplicación de red social que permite a los usuarios registrarse, iniciar sesion, publicar mensajes, ver el muro, buscar mensajes y funcionalidades extra

# Pasos para ejecutar en ambiente dev
1. Renombrar el archivo .env.example por .env
2. Configurar las variables de entorno
```
PORT=3000
PATH_APP=http://localhost:3000/api
POSTGRES_URL=postgresql://postgres:123456@localhost:5432/redsocial
POSTGRES_USER=postgres
POSTGRES_DB=redsocial
POSTGRES_PORT=5432
POSTGRES_PASSWORD=123456
MAILER_EMAIL=usuario@correo.com
MAILER_SECRET_KEY=abcd efgh ijkl mnop
MAILER_SERVICE=gmail
JWT_SEED=semilla_jwt
```
3. Ejecutar contenedor para instalar base de datos Postgres
```
docker compose up -d
```
4. Instalar dependencias
```
npm install
```
5. Ejecutar migracion de entidades de base de datos
```
npx prisma migrate dev --name init
```