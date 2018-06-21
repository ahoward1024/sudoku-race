from python:3.6-alpine
MAINTAINER Aaron AaronBatilo@gmail.com

WORKDIR /app

# Copy Pipfiles first, then install, to create a Docker layer cache for faster
# image builds
COPY Pipfile .
COPY Pipfile.lock .
RUN pip install pipenv
RUN pipenv install --system --deploy

COPY . .

CMD ["python", "runserver.py"]
