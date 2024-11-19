# Filters Application

Application to present functionality of creating custom filters based on given requirements.

## Getting Started

### Prerequisites

* JDK 21
* Docker
* Docker-compose

Clone the project

#### With Git HTTPS
```
git clone https://github.com/litunt/filters-ha.git
```

#### With Git SSH
```
git clone git@github.com:litunt/filters-ha.git
```

## Running locally

Build the application

```
./gradlew build
```

Build docker image

```
docker build -t filters-app .
```

Run the application in docker container

```
docker-compose up -d
```

### Lombok

You need to enable Annotation processing
`Build, Execution, Deployment → Compiler → Annotation Processors`

For lombok you need to install lombok plugin.

### Running the tests

Run the tests

```
./gradlew clean test
```