#!/usr/bin/env python3.6
from sanic import Sanic

app = Sanic()
app.config.from_pyfile('config.py')
try:
    app.config.from_pyfile('instance/config.py')
except IOError as e:
    ...

from . import views  # noqa
