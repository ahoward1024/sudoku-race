from starlette.testclient import TestClient
from sudokurace.server.application import Application


def test_name():
    application = Application("tests")
    app = application.server()
    client = TestClient(app)
    response = client.get("/name")
    assert response.status_code == 200
    assert response.json() == {"name": "tests"}


def test_embed_server_version():
    application = Application("tests")
    app = application.server()
    client = TestClient(app)
    response = client.get("/version")
    assert response.status_code == 200
