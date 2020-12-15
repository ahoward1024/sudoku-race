# This file is exempt from coverage since it's just application logic setup
from sudokurace.server.application import Application
import uvicorn


application = Application("sudokurace")
app = application.server()


def main():
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()
