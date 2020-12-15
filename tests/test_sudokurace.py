from starlette.testclient import TestClient
from sudokurace.server.application import Application
from sudokurace import __version__


def test_version():
    assert __version__ == "0.1.0"


def test_name():
    application = Application("tests")
    app = application.server()
    client = TestClient(app)
    response = client.get("/name")
    assert response.status_code == 200
    assert response.json() == {"name": "tests"}
