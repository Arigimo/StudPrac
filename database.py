import  psycopg2
import json

DB_data = {
    "dbname": "network_db",
    "user": "betray",
    "password": "",
    "host": "localhost"
}

def initialize_db():
    try:
        conn = psycopg2.connect(**DB_data) #соединение с базой данных
        cursor = conn.cursor() #запись данных
        cursor.execute(
            '''
                CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                name TEXT,
                input_data JSONB,   -- Сохраняем присланные точки
                result_data JSONB,  -- Сохраняем расчеты математика
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ); 
            '''
        )
        #Запись и остановвка инструментов
        conn.commit()
        conn.close()
        cursor.close()

        print("База данных готова к использованию")
    except Exception:
        print("Не удалось подключиться к БД")

def save_project(name, input_dict, result_dict):
    try:
        conn = psycopg2.connect(**DB_data)
        cursor = conn.cursor()
        cursor.execute(
            '''INSERT INTO projects(name, input_data, result_data) VALUES (%s, %s, %s)''',
            (name, json.dumps(input_dict), json.dumps(result_dict))
        )

        conn.commit()
        conn.close()
        cursor.close()
        print("Проект '{name}' сохранен в PostgreSQL.")
    except Exception:
        print("Не удалось сохранить в базу")

