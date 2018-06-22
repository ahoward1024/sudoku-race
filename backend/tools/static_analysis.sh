#!/bin/sh
for pythonFile in `find backend -name "*.py"`; do
  echo "Checking $pythonFile"
  flake8 --show-source $pythonFile || exit 1
done
