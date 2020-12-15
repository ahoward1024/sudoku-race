from starlette.applications import Starlette
from starlette.responses import JSONResponse, PlainTextResponse
from starlette.routing import Route
import pkg_resources


class Application:
    name = "default"

    def __init__(self, name) -> None:
        super().__init__()
        self.name = name if not None else name
        self.version = pkg_resources.get_distribution("sudokurace").version

    def __get_name(self):
        async def name_closure(_):
            return JSONResponse({"name": self.name})

        return name_closure

    def __get_version(self):
        async def closure(_):
            return PlainTextResponse(self.version)

        return closure

    def collect_routes(self):
        return [
            Route("/name", self.__get_name()),
            Route("/version", self.__get_version()),
        ]

    def server(self):
        return Starlette(debug=True, routes=self.collect_routes())
