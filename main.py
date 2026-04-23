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

    result = model_solver(data.points, data.cost, data.capacity)

    return result
