FROM openjdk:8-jdk
MAINTAINER Aaron Batilo aaronbatilo@gmail.com

WORKDIR /source
COPY . /source

RUN ./gradlew test shadowJar

FROM openjdk:8-jdk-alpine
WORKDIR /app
COPY --from=0 /source/service/sr.jar /source/service/dev.yaml ./

CMD java -jar sr.jar server dev.yaml
EXPOSE 8080
