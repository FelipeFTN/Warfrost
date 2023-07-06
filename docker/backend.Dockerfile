# Rust official image
FROM rust:1.67

# Copy from machine to docker
WORKDIR /usr/src/warfrost
COPY ../backend/ ./

# Set Environment Variables
ENV PORT=8080

EXPOSE ${PORT}

# Build program for release
RUN cargo build --release

# Run the binary
CMD ["./target/release/warfrost"]

# Build and Run the Docker Image
#
# $ docker build -t felipeftn/warfrost-backend:1.0 .
# $ docker run -it --rm --name container-warfrost-backend warfrost-backend
#
