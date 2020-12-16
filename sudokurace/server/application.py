from http import HTTPStatus
from starlette.applications import Starlette
from starlette.responses import JSONResponse, PlainTextResponse
from starlette.routing import Route
import pkg_resources


class Application:
    name = "default"
    conn = None

    def __init__(self, name, conn) -> None:
        super().__init__()
        self.name = name if not None else name
        self.version = pkg_resources.get_distribution("sudokurace").version
        self.conn = conn

    def __get_name(self):
        async def name_closure(_):
            return JSONResponse({"name": self.name})

        return name_closure

    def __get_version(self):
        async def closure(_):
            return PlainTextResponse(self.version)

        return closure

    def __get_healthz(self):
        async def closure(_):
            try:
                with self.conn.cursor() as cur:
                    cur.execute("SELECT 1;")
                return PlainTextResponse("ok")
            except:
                return PlainTextResponse(
                    "not ok", status_code=HTTPStatus.SERVICE_UNAVAILABLE
                )

        return closure

    def collect_routes(self):
        return [
            Route("/name", self.__get_name()),
            Route("/version", self.__get_version()),
            Route("/healthz", self.__get_healthz()),
        ]

    def server(self):
        return Starlette(debug=True, routes=self.collect_routes())
