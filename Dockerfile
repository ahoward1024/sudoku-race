FROM python:3.9.1-slim as builder

# Make sure this matches whatever is in .tool-versions
RUN pip install poetry==1.1.4

# Install dependencies only to cache this Docker image layer
WORKDIR /app
COPY ./pyproject.toml ./poetry.lock ./
RUN poetry install --no-root # Skip installing yourself. We only care about dependencies first

# Install the application itself
COPY . .
RUN poetry install # Install itself into virtualenv for hot reloading use case

FROM builder as installer
# Install full application to system directories for production container
RUN pip install .

FROM python:3.9.1-slim-buster
LABEL org.opencontainers.image.source https://github.com/abatilo/sudoku-race

# Copy only production packages from the installer step and skip dev packages
# to reduce final binary size
COPY --from=installer /usr/local/bin/entrypoint /usr/local/bin
COPY --from=installer /usr/local/lib /usr/local/lib
ENTRYPOINT ["entrypoint"]
