# Awesome Marvel Comics

## Requirements
[nodejs](https://nodejs.org/en/download/) 16.14.2 LTS

## Back-end
### Routes
|Method|endpoint|exemple|


|Method|Endpoint|Exemple|
--- | --- | ---|
|GET|/v1/characters|https http://localhost:3001/v1/characters|
|GET|/v1/characters/:characterId|https http://localhost:3001/v1/characters/1011136|
|POST|/admin/login|https POST http://localhost:3001/admin/login user=admin password=123456|
|GET|/admin/history|https http://localhost:3001/admin/history Authorization:'Bearer sfUs9ESTDD8HudoQ2yUGmg=='|

* All exemples use the [HTTPie](https://httpie.io/) but you can use [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/) and others!!!

### Runnning in dev
```shell
cd backend
cp .env.exemple .env # And change to add YOUR_MARVEL_COMICS_PUBLIC_KEY and YOUR_MARVEL_COMICS_PRIVATE_KEY
npm install
npm run dev # Starts the development server.
# See exemples
```

## Front-end

```shell
cd frontend
npm install
npm run dev # Starts the development server.
npm run build # Builds the app for production.
npm run start # Runs the built app in production mode.
# Open http://localhost:3000
```
