import sys
from psycopg2 import connect
from sudokurace.server.application import Application
import uvicorn


try:
    print("Attempting to connect to database")
    conn = connect(
        "postgres://root:@cockroachdb-public:26257/?sslmode=disable", connect_timeout=5
    )
except:
    print("Could not connect to database, killing process")
    sys.exit(-1)

application = Application("sudokurace", conn)
app = application.server()


def main():
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()
