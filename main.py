from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

#Разрешения на все
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

#Точки локаций
class point (BaseModel):
   id: int
   x: int
   y: int

#итоговый рез - т
class calc_request (BaseModel):
    proj_name: str
    cost: float
    K: int
    C: int

@app.get("/")
def read_root():
    return {"status": "server is online"}

@app.get("/solve")
async def solve_task(data: calc_request):
    print(f"Запрос получен! Проект: {data.project_name}")

    mock_result = {
        "total_cost": 15000,
        "opened_magistrals": [0, 2],  # Математик скажет, какие ID стали главными
        "connections": [
            {"from_id": 1, "to_id": 0},
            {"from_id": 4, "to_id": 0},
            {"from_id": 3, "to_id": 2}
        ]
    }

    return mock_result
