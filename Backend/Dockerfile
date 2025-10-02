# Etap 1: budowanie aplikacji
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY . .
RUN mvn clean package -DskipTests

# Etap 2: uruchamianie
FROM openjdk:21-jdk-slim
WORKDIR /app

COPY --from=build /app/target/pokedex-backend-0.0.1-SNAPSHOT.jar app.jar

CMD ["sh", "-c", "java -jar app.jar --server.port=$PORT"]
