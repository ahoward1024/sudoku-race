from python:3.6-stretch
MAINTAINER Aaron AaronBatilo@gmail.com

# We need gcc to build ujson
RUN apt-get update && apt-get upgrade -y && apt-get install -y build-essential

# Install Node.js/NPM
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g npm

# Build frontend
WORKDIR /frontend
COPY ./frontend/package.json ./frontend/package-lock.json /frontend/
RUN npm install
COPY ./frontend .
RUN npm run-script build

# Copy built frontend bundle to backend
WORKDIR /app
COPY /frontend/build /app/static/
RUN mv /app/static/static/* /app/static/ && rm -rf /app/static/static
RUN mv /app/static/service-worker.js /app/

# Copy Pipfiles first, then install, to create a Docker layer cache for faster
# image builds
COPY ./backend/Pipfile .
COPY ./backend/Pipfile.lock .
RUN pip install pipenv
RUN pipenv install --system --deploy

COPY ./backend .

EXPOSE 8000
CMD ["python", "runserver.py"]
