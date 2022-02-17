# Notes
A NodeJS Notes REST API created under the folder by feature structure. This project has been created for academic purpose.

## Architecture
* Back-End: Node.js with Express
* Data Base: Mongo DB
* ODM: Mongoose
* Containerization: Docker
* CI/CD: Github Actions/Jest/Cypress

## Router and Routes

| Endpoint            | HTTP Verb | Middleware         | Description                          |
| --------------------| --------- | ------------------ | ------------------------------------ |
| /api/               | GET       |                    | Shows "Welcome to Notes"             |
| /api/notes          | GET       |                    | Gets all notes                       |
| /api/notes          | POST      |                    | Creates a new note                   |
| /api/notes/:id      | GET       |                    | Gets a single note                   |
| /api/notes/:id      | PUT       |                    | Updates a single note                |
| /api/notes/:id      | DELETE    |                    | Deletes a specific note              |

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 16.13 LTS, npm >= 8.1.x
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Configure the [env](https://github.com/anayib/notes-example-project/projects/1#card-77837419)
```shell
$ cp .env.sample .env
```

3. Update `.env` with the required info

4. Run `npm run dev` to start the development server.


## Contributing
[Contributing to the project](CONTRIBUTING.md)

## Usage

## Examples

## License

[MIT](LICENSE)
