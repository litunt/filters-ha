# Back-end. Filters App (Askend test assignment)

## Requirements

* JDK 21
* Docker v20

## Structure of the source code

### Source code layers

TBA

## Application configurations

Configuration file [application.yaml](src/main/resources/application.yaml),
with **environmental** variables

* `APP_PORT` - Java application port
* `APP_DB` - database schema name
* `APP_DB_USER` - database user username
* `APP_DB_PASSWORD` - database user password

## Database

Given project uses relational in-memory database H2. Database schema, including necessary tables and constraints is
being generated automatically on application startup. Java library Hibernate helps with correct detection of
object-entity relations.

## Database migration
As a database migration tool is used Flyway. Migrations are located under `src/resources/db/migration` package
and file naming is structured as `V1__name`, where `V1` indicates the new version of the database that changes bring.

## Installation guide

Application build result is `Docker image`.

## Building
Although there is also an option to create a `Dockerfile` to build an application image for further usage, `Gradle`
build tool actually provides a ready functionality to build `Docker` image of the application using `Gradle task`
named `bootBuildImage`. This task also allows to upload the image to `DockerHub registry` using ` docker { publishRegistry {...} }`
block by providing `DockerHub` credentials, but in this particular project this is not used.
Application is running as `Docker` container along with corresponding _Gradle_ parameters as _properties_.

### Docker container parameters

* `imageNameProp` - name of application container

### Building application Docker container with commands
Image building

```sh
./gradlew bootBuildImage -x test -PimageName=filters-app-backend
```

## Running application locally

Run the command:
```sh
./gradlew bootRun
```

Running application tests:

```sh
./gradlew FiltersApp:test
```

## Running tests
There are both unit and integration tests written. To write test scenarios, `Jupiter` library is used,
as well as `WebMVC` to emulate REST requests and `Mockito` to imitate beans.

## Using application locally
To use application by URL on local machine, the application is accessible by `http://localhost:8081/api` URL.
Application can be used locally either by running application itself or using `Docker` container.

## Application healthcheck
In order to make sure what is the status of the application, is it up and running etc., the Spring Boot framework's
library Actuator is being used. It makes possible to navigate by `app-url/actuator/health` (e.g. regarding
this specific project and running locally `http://localhost:8081/api/actuator/health`) and get the information.
This provides the data about application's current status, is application up or down, what is the version of the application etc.

## Swagger UI
It is also possible to observe API endpoints with Swagger tool. The Swagger page can be accessed locally
using URL `http://localhost:8081/api/swagger-ui/index.html`.
