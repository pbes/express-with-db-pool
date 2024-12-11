# express-with-db-pool

Példa alkalmazás a https://pbes.github.io/posts/nodejs-connection-pool bejegyzéshez.

## Előfeltételek
* node.js 20+
* Docker 20+

## Telepítés, beállítások

```bash
npm ci
cp .env.example .env
```

> Az `.env.example` fájlban található beállítások megegyeznek a `docker/docker-compose.yml` fájlban található beállításokkal.

## Futtatás

### PostgreSQL adatbázis
```bash
cd docker
docker compose -f docker-compose.yml up
```

### Alkalmazás

**DEV mód**
```bash
npm run dev
```

**PROD mód**
```bash
npm run build
npm start
```
