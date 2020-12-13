FROM python:3.9.1-slim-buster as builder

WORKDIR /app
COPY ./pyproject.toml ./poetry.lock ./
RUN pip install poetry==1.1.4 && \
      poetry install --no-dev

COPY . .
RUN pip install .

FROM python:3.9.1-slim-buster
LABEL org.opencontainers.image.source https://github.com/abatilo/sudoku-race

COPY --from=builder /usr/local/bin/entrypoint /usr/local/bin
COPY --from=builder /usr/local/lib /usr/local/lib
ENTRYPOINT ["entrypoint"]
