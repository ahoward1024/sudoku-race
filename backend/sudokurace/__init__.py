#!/usr/bin/env python3.6
from sanic import Sanic
from sanic_cors import CORS

app = Sanic(__name__)
CORS(app)
app.config.from_pyfile('config.py')
try:
    app.config.from_pyfile('instance/config.py')
except IOError as e:  # pragma: no cover
    ...

app.static('/', './static/index.html')
app.static('/static', './static')
app.static('/service-worker.js', 'static/service-worker.js')

from . import views  # noqa
