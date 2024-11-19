FROM eclipse-temurin:21

WORKDIR /filters-app

COPY build/libs/filters-app-0.0.1.jar filters-app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "filters-app.jar"]
