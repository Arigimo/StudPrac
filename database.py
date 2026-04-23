import sqlite3
import json

def initialize_db():
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
