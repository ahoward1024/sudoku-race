#!/usr/bin/env python3.6

from sudokurace import app
from sanic.response import text


@app.route('/')
async def root(req):
    return text('Welcome to SudokuRace')
