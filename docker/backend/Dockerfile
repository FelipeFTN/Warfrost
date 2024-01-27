# Rust official image
FROM rust:1 AS chef

RUN cargo install cargo-chef --locked
WORKDIR app

FROM chef as planner
COPY --from=warfrost . .

# Set Environment Variables
ENV PORT=8080
ENV HOST=0.0.0.0

# Build program for release
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder
COPY --from=planner /app/recipe.json recipe.json

RUN cargo chef cook --release --recipe-path recipe.json

COPY --from=warfrost . .
RUN cargo build --release --bin warfrost

FROM debian:bookworm-slim AS runtime
WORKDIR app
COPY --from=builder /app/target/release/warfrost /usr/local/bin
ENTRYPOINT ["/usr/local/bin/warfrost"]
