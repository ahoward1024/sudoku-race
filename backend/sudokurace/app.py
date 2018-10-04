#!/usr/bin/env python3.6
from sanic import Sanic
from sanic.response import file
from sanic_cors import CORS

app = Sanic(__name__)
CORS(app, automatic_options=True)
app.config.from_pyfile('config.py')
try:
    app.config.from_pyfile('instance/config.py')
except IOError as e:  # pragma: no cover
    pass


@app.route('/')
@app.route('/index.html')
async def root(req):  # pragma: no cover
    return await file('./index.html', headers={'Cache-Control': 'no-cache'})


@app.route('/service-worker.js')
async def service_worker(req):  # pragma: no cover
    return await file('./service-worker.js',
                      headers={'Cache-Control': 'no-store'})


@app.route('/static/css/main.<unique_hash>.css')
async def css(req, unique_hash):  # pragma: no cover
    return await file(f'./static/css/main.{unique_hash}.css',
                      headers={'Cache-Control': 'max-age=31556926'})


@app.route('/static/css/main.<unique_hash>.css<maps>')
async def css_map(req, unique_hash, maps):  # pragma: no cover
    return await file(f'./static/css/main.{unique_hash}.css{maps}',
                      headers={'Cache-Control': 'max-age=31556926'})


@app.route('/static/js/main.<unique_hash>.js')
async def js(req, unique_hash):  # pragma: no cover
    return await file(f'./static/js/main.{unique_hash}.js',
                      headers={'Cache-Control': 'max-age=31556926'})


@app.route('/static/js/main.<unique_hash>.js<maps>')
async def js_map(req, unique_hash, maps):  # pragma: no cover
    return await file(f'./static/js/main.{unique_hash}.js{maps}',
                      headers={'Cache-Control': 'max-age=31556926'})

from . import views  # noqa
