#!/usr/bin/env python3.6

from sudokurace import app
from sanic.response import json


@app.route('/game.create')
async def root(req):
    return json({
        'id': 0,
        'board': ('    735     6   9486 4     34   71             52   '
                '87     4 3297   8     413    ')
    })
