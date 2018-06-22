#!/usr/bin/env python3.6

from sudokurace import app
from sanic.response import json


@app.route('/game.create')
async def root(req):
    return json({
        'id': 0,
        'board': ' 5248937673925684146837129538712465959176342824689'
    })
