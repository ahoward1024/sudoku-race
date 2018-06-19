from python:3.6-stretch
MAINTAINER Aaron AaronBatilo@gmail.com

WORKDIR /app

# Copy Pipfiles first, then install, to create a Docker layer cache for faster
# image builds
COPY Pipfile /app/Pipfile
COPY Pipfile.lock /app/Pipfile.lock
RUN pip install pipenv
RUN pipenv install --system --deploy

COPY . /app

CMD ["python", "runserver.py"]
