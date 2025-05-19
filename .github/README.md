<img src="./assets/logo.png" id="start" align="right" alt="Project logo" width="50" >

# SkyDocs

> SkyDocs
 - Universal file storage and management service with authentication and token protection.


[![Node.js](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)
[![Multer](https://img.shields.io/badge/Multer-FFCA28?style=for-the-badge&logo=multer&logoColor=black)](https://github.com/expressjs/multer)
[![Husky](https://img.shields.io/badge/Husky-5D3A00?style=for-the-badge&logo=git&logoColor=white)](https://typicode.github.io/husky/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/)

---

[Description](#description) •
[Project setup](#project-setup) •
[Features](#features) •
[How To Use](#how-to-use) •
[Project Status](#project-status) •
[Room for Improvement](#room-for-improvement) •
[License](#license) •
[Contact](#contact)

## Description

SkyDocs is a backend service for file storage, upload, and management with user registration, authentication, token refresh, and revocation. 

The project implements best security practices (refresh/access tokens, blacklist, fingerprint), a strict modular structure, and covers all CRUD operations for files.

> ### Technologies: 
> - **Node.js** and **Express** for server and routing
> - **TypeScript** for type safety and modern JS features
> - **MySQL** with **TypeORM** for relational database management
> - **Redis** for token blacklist storage
> - **JWT** for authentication tokens
> - **Multer** for handling file uploads
> - **bcrypt** for password hashing
> - **Husky**, **ESLint**, **Prettier**, **Commitlint** for code quality and git hooks

## Project setup

- Clone this repo to your desktop and run `npm install` to install all the dependencies.
- Create your .env file with required variables:

```
# Application environment
NODE_ENV=                  # Application environment (e.g., development, production)
LOG_LEVEL=                 # Logging level (e.g., log, warn, error)
PORT=                      # Server port (e.g., 4000)
API_VERSION=               # API version (e.g., 1)

# Database configuration
DB_HOST=                   # Database host (e.g., localhost)
DB_PORT=                   # Database port (e.g., 3306)
DB_USER=                   # Database username
DB_PASSWORD=               # Database password
DB_NAME=                   # Database name

# JWT secrets
ACCESS_TOKEN_SECRET=       # Secret for access tokens
REFRESH_TOKEN_SECRET=      # Secret for refresh tokens

# Redis configuration
REDIS_URL=                 # Redis connection URL (e.g., redis://localhost:6379)

```

- Once the dependencies are installed, you can run `npm run dev` to start the application.
- Enjoy.

### Project structure

```shell
.
├── .github                      # GitHub-specific files and assets
│   ├── assets                   # Images and icons for documentation
│   └── README.md                # Project documentation
├── .gitignore                   # List of files/folders ignored by git
├── .husky                       # Git hooks for linting and commit checks
│   ├── _/                       # Husky internal scripts
│   ├── commit-msg               # Commit message linting
│   ├── pre-commit               # Pre-commit hooks (lint, format)
│   └── pre-push                 # Pre-push hooks
├── LICENSE.md                   # Project license
├── node_modules                 # Installed dependencies
├── package.json                 # Project metadata, scripts, dependencies
├── package-lock.json            # Exact dependency versions
├── .prettierrc.json             # Prettier code style configuration
├── src                          # Application source code
│   ├── auth                     # Authentication and user modules
│   │   ├── constants            # Auth-related constants (errors, tokens)
│   │   ├── controllers          # Auth API controllers (signup, signin, etc.)
│   │   ├── middlewares          # Auth-specific middleware
│   │   ├── models               # Auth entities (user, refresh-token)
│   │   ├── repositories         # Data access for auth entities
│   │   ├── routes               # Auth API routes
│   │   ├── services             # Business logic for authentication
│   │   ├── types                # Auth type definitions
│   │   └── utils                # Auth utilities (crypto, tokens)
│   ├── constants                # Shared constants (errors, logger, tokens)
│   ├── db                       # Database connection and config
│   ├── file                     # File management modules
│   │   ├── constants            # File-related constants
│   │   ├── controllers          # File API controllers (upload, download, etc.)
│   │   ├── models               # File entity
│   │   ├── repositories         # File data access
│   │   ├── routes               # File API routes
│   │   ├── services             # File business logic
│   │   ├── types                # File type definitions
│   │   └── utils                # File utilities
│   ├── index.ts                 # Application entry point
│   ├── middleware               # General-purpose middleware (auth, upload)
│   ├── types                    # Shared type definitions
│   └── utils                    # Shared utilities (auth, crypto, env, logger, redis, blacklist)
├── tsconfig.json                # TypeScript configuration
└── uploads                      # Uploaded files storage

```

## Features

- User registration and login with secure password hashing
- Access and refresh token management with JWT, including fingerprint and blacklist support
- File upload, download, update, and deletion endpoints
- Retrieve file information and list files by user
- Middleware for authentication and user ID setting
- Strict error handling and validation
- Code quality enforced by ESLint, Prettier, Husky, and Commitlint

<!-- ## How To Use

Run [Live Demo](https://quick-code-beta.vercel.app/)

![tutorial][tutorial] -->

## Project Status

### _The project has been successfully completed._

## Room for Improvement

To do:

- [ ] Add Swagger documentation for endpoints
- [ ]  Add API rate limiting and brute-force protection
- [ ] ...

Improvement:

- [ ] Develop frontend client application
- [ ] Implement file filtering and search functionality
- [ ] Write unit and integration tests
- [ ] ...

## License

This project is open source and available under the [BSD 3-Clause](../LICENSE.md).

## Contact

Created by [@RimidalU](https://www.linkedin.com/in/uladzimir-stankevich/) - feel free to contact me!

<p align="right"><a href="#start"><img width="45rem" src="./assets/pageUp.svg"></a></p>

<!-- MARKDOWN LINKS & IMAGES -->

[tutorial]: ./assets/demo.webp
