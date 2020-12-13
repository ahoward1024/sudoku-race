from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
import uvicorn


async def homepage(request):
    return JSONResponse({"hello": "world"})


def main():
    app = Starlette(
        debug=True,
        routes=[
            Route("/", homepage),
        ],
    )
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()
