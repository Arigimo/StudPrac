import math
import pyomo.environ as pyo
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Tuple

def cij_matrix(points_list):
    n = len(points_list)
    cij = [[0.0] * n for _ in range(n)]

    for i in range(n):
        x1, y1 = points_list[i]
        for j in range(n):
            if i == j:
                cij[i][j] = 0.0
            else:
                x2, y2 = points_list[j]
                dist = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
                cij[i][j] = dist
    return cij

def model(points_list, C, K):
    """
        Решает задачу размещения магистральных узлов.

        Вход:
            points_list: список координат [[x1,y1], [x2,y2], ...]
            C: стоимость одного core-узла
            K: максимальное количество подключений к одному core-узлу

        Выход:
            словарь с ключами: core_nodes, connections, total_cost
        """
    n = len(points_list)
    cij = cij_matrix(points_list)
    model = pyo.ConcreteModel()
    model.z = pyo.Var(range(n), domain = pyo.Binary)
    model.e = pyo.Var(range(n), range(n), domain = pyo.Binary)
