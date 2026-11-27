# app/main.py
from fastapi import FastAPI
from routers.docs import router as docs_router

app = FastAPI()
app.include_router(docs_router)