#!/usr/bin/env python3.6

from .. import app


@app.route('/')
def root():
    return 'Welcome to SudokuRace'
