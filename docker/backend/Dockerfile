# Rust official image
FROM rust:1.67-slim

# Copy from machine to docker
WORKDIR /usr/src/warfrost
COPY --from=warfrost . .

# Set Environment Variables
ENV PORT=8080
ENV HOST=0.0.0.0

# Build program for release
RUN cargo build --release

# Run the binary
CMD ["./target/release/warfrost"]
