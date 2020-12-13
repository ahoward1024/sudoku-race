from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
import asyncio
import uvicorn


async def homepage(request):
    return JSONResponse({"foo": "baz"})


async def slow(request):
    await asyncio.sleep(10)
    return JSONResponse({"slow": "slow"})


app = Starlette(
    debug=True,
    routes=[
        Route("/", homepage),
        Route("/slow", slow),
    ],
)


def main():
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()
