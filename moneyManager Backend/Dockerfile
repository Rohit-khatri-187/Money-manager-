# ---- Stage 1: Build with Maven ----
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copy Maven wrapper & project files
COPY . .

# Build the app (skip tests if desired)
RUN ./mvnw clean package -DskipTests

# ---- Stage 2: Run app ----
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy only the built JAR from stage 1
COPY --from=build /app/target/moneyManager-0.0.1-SNAPSHOT.jar app.jar

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
