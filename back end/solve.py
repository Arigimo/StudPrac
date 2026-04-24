import math
import pyomo.environ as pyo



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

def model_solver(points_list, C, K):
    n = len(points_list)
    cij = cij_matrix(points_list)
    model = pyo.ConcreteModel()
    model.z = pyo.Var(range(n), domain = pyo.Binary)
    model.e = pyo.Var(range(n), range(n), domain = pyo.Binary)
    model.obj = pyo.Objective(expr = C * sum(model.z[j] for j in range(n)) + sum(cij[i][j] * model.e[i,j] for i in range(n) for j in range(n)), sense = pyo.minimize)
    model.constraint1 = pyo.ConstraintList()
    for i in range(n):
        model.constraint1.add(sum(model.e[i,j] for j in range(n)) == 1)
    model.constraint2 = pyo.ConstraintList()
    for j in range(n):
        model.constraint2.add(sum(model.e[i, j] for i in range(n)) <= K * model.z[j])
    solver = pyo.SolverFactory('glpk')
    result = solver.solve(model, tee = False)

    opened_magistrals = []
    for j in range(n):
        if pyo.value(model.z[j]) > 0.9:
            opened_magistrals.append(j)

    connections = []
    for i in range(n):
        for j in range(n):
            if pyo.value(model.e[i, j]) > 0.9:
                connections.append([i, j])

    total_cost = pyo.value(model.obj)

    return {
        "opened_magistrals": opened_magistrals,
        "connections": connections,
        "total_cost": total_cost
    }

