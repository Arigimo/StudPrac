# Файл main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

# ШАГ 1: Импортируем функцию из соседнего файла
from solve import solve_math_model

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Point(BaseModel):
    id: int
    x: float
    y: float


class CalcRequest(BaseModel):
    project_name: str
    cost: float
    capacity: int
    points: List[Point]


@app.post("/solve")
async def solve_task(data: CalcRequest):

    result = solve_math_model(data.points, data.cost, data.capacity)

    return result
