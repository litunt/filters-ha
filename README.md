# Filters App (Askend test assignment)

## Project description

### Business idea
TBA

### Result
The result of the assignment is working full-stack application with backend that is responsible for
heavy logic and calculations, and frontend part that provides UI solution to send requests and see
the result returned by backend application.

TBA

### Technology stack

- **Front-end:** Angular 18, TypeScript, RxJS
- **Back-end:** Java 21, Spring Boot, JPA, Flyway
- **Database:** PostgreSQL

## Architecture

### Back-end
To look through the structure of backend application, please look at following specifications.
Docs: [FiltersApp/README.md](FiltersApp/README.md)

### Front-end
To look through the structure of frontend application, please look at following specifications.
Docs: [frontend/README.md](frontend/README.md)

## Running application locally with [docker-compose.yaml](docker/docker-compose.yaml) file

### Requirements

- Docker v20
- Docker Compose v2

Run command

```sh
docker-compose up -d
```
The command starts all the listed services and the result is running `Docker` containers of
frontend and backend applications, as well as Flyway (runs only once to perform migration tasks).
H2 database is being setup on application startup.