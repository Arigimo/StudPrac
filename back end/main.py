from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from database import initialize_db, save_project
from solve import model_solver

app = FastAPI()

initialize_db()

#логика принятых данных от фронта
#dict - словарь
class ReactFlowPoint(BaseModel):
    id: str
    position: Dict[str, float]
    data: Dict[str, Any]

#принятие данных от фронта
class FrontendRequest(BaseModel):
    nodes: List[ReactFlowPoint]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
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


from fastapi import Request


@app.post("/solve")
async def solve_task(request: Request):
    raw_data = await request.json()
    nodes_list = raw_data.get("nodes", [])

    if not nodes_list:
        return {"error": "Данные пусты"}

    # Извлекаем C и K
    K = nodes_list[-1]
    C = nodes_list[-2]

    # Извлекаем точки
    actual_nodes = nodes_list[:-2]

    # Подготовка координат
    points_for_math = [(node[1], node[2]) for node in actual_nodes]

    # Запуск математики

    result = model_solver(points_for_math, float(C), int(K))

    # Сохранение в базу (твоя работа)
    save_project("Проект с карты", raw_data, result)

    return result
