from starlette.applications import Starlette
from starlette.responses import JSONResponse, PlainTextResponse
from starlette.routing import Route


class Application:
    name = "default"

    def __init__(self, name) -> None:
        super().__init__()
        self.name = name if not None else name

    def __get_name(self):
        async def name_closure(_):
            return JSONResponse({"name": self.name})

        return name_closure

    def collect_routes(self):
        return [Route("/name", self.__get_name())]

    def server(self):
        return Starlette(debug=True, routes=self.collect_routes())
