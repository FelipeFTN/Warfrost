# Rust official image
FROM rust:1.67

# Copy from machine to docker
WORKDIR /usr/src/warfrost
COPY . .

# Set Environment Variables
ENV PORT=8080

# Build program for release
RUN cargo build --release

# Run the binary
CMD ["./target/release/warfrost"]

# Build and Run the Docker Image
#
# $ docker build -t warfrost-backend .
# OR:
# $ docker buildx build -t warfrost-backend .
# THEN:
# $ docker run -it -d -p 8080:8080 --name container-warfrost-backend warfrost-backend
#
