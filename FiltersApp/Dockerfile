FROM gradle:8.11-jdk21 AS build

WORKDIR /app

COPY gradle gradle
COPY gradlew .
COPY build.gradle .
COPY settings.gradle .
COPY src src

RUN ./gradlew build -x test --no-daemon

FROM eclipse-temurin:21

WORKDIR /filters-app

COPY --from=build /app/build/libs/FiltersApp-0.0.1.jar filters-app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "filters-app.jar"]
