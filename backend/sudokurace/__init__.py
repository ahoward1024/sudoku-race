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

from . import views  # noqa
