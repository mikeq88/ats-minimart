FROM maven:3.9.4-amazoncorretto-17 AS build
RUN mkdir -p /temp
WORKDIR /temp
COPY pom.xml /temp
COPY src /temp/src
RUN mvn -DskipTests -f pom.xml clean package

FROM amazoncorretto:17-alpine
COPY --from=build /temp/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
