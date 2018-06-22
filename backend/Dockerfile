from python:3.6-stretch
MAINTAINER Aaron AaronBatilo@gmail.com

# We need gcc to build ujson
RUN apt-get update && apt-get upgrade -y && apt-get install -y build-essential

WORKDIR /app

# Copy Pipfiles first, then install, to create a Docker layer cache for faster
# image builds
COPY Pipfile .
COPY Pipfile.lock .
RUN pip install pipenv
RUN pipenv install --system --deploy

COPY . .

EXPOSE 8000
CMD ["python", "runserver.py"]
