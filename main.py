from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from database import initialize_db, save_project

from solve import model_solver

app = FastAPI()

initialize_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

#Для точек
class Point(BaseModel):
    id: int
    x: float
    y: float

#Для итога от математика
class CalcRequest(BaseModel):
    project_name: str
    cost: float
    capacity: int
    points: List[Point]


@app.post("/solve")
async def solve_task(data: CalcRequest):
    points_for_math = [(p.x, p.y) for p in data.points]
    result = model_solver(points_for_math, data.cost, data.capacity)
    save_project(data.project_name, data.model_dump(), result)
    return result
