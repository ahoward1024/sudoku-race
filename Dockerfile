FROM node:8-jessie as frontend
LABEL maintainer AaronBatilo@gmail.com

# Build frontend
WORKDIR /frontend
COPY ./frontend/package.json ./frontend/package-lock.json /frontend/
RUN npm install
COPY ./frontend .
RUN npm run-script build

# Copy built frontend bundle to backend
WORKDIR /app
RUN mkdir -p /app/static
RUN cp -r /frontend/build/* /app/static/
RUN mv /app/static/static/* /app/static/ && rm -rf /app/static/static

# Multi-stage build, so that our final container doesn't include node_modules
# or the installed Node.js binaries
FROM python:3.6-stretch
LABEL maintainer AaronBatilo@gmail.com

# We need gcc to build ujson
RUN apt-get update && apt-get install -y build-essential=12.1ubuntu2 --no-install-recommends \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=frontend /app /app

# Copy Pipfiles first, then install, to create a Docker layer cache for faster
# image builds
COPY ./backend/Pipfile .
COPY ./backend/Pipfile.lock .
RUN pip install pipenv==2018.7.1
RUN pipenv install --system --deploy

COPY ./backend .

EXPOSE 8000
ENTRYPOINT ["python", "runserver.py"]
