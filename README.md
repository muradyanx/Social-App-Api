
<h2>Social Website Backend (NestJS)</h2>

##  Description

Social Website API

NestJS-based RESTful API for user management, authentication, advanced user search, and friend request features.

---
##  Features

-  User registration and login (JWT-based)
-  Advanced user search (by name, last name & age with pagination)
- Friend requests (send, view, accept, decline)
- Email verification via SendGrid
- Secure authentication with Passport & JWT

--
## 🛠️ Tech Stack

- **Backend**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: Custom PG client (via `pg`)
- **Email**: SendGrid API
- **Validation**: class-validator,
- **Environment Management**: dotenv
- **Migrations**: node-pg-migrate

---

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


