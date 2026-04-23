import pyomo.environ as pyo
import math

locations = {
    0:(0, 0),
    1:(2,3),
    2:(3,4),
    3:(5,6),
}

location_list = list(locations.keys())
