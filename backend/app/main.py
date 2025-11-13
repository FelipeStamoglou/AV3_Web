from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Todo
from schemas import TodoCreate, TodoOut
import crud

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@db:5432/todo_db")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# create tables on startup (simple approach)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="ToDo Distributed API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/todos/", response_model=TodoOut)
def create_todo(todo_in: TodoCreate):
    db = SessionLocal()
    try:
        todo = crud.create_todo(db, todo_in)
        return todo
    finally:
        db.close()

@app.get("/todos/", response_model=List[TodoOut])
def list_todos():
    db = SessionLocal()
    try:
        return crud.get_todos(db)
    finally:
        db.close()

@app.get("/todos/{todo_id}", response_model=TodoOut)
def get_todo(todo_id: int):
    db = SessionLocal()
    try:
        todo = crud.get_todo(db, todo_id)
        if not todo:
            raise HTTPException(status_code=404, detail="Todo not found")
        return todo
    finally:
        db.close()

@app.put("/todos/{todo_id}", response_model=TodoOut)
def update_todo(todo_id: int, todo_in: TodoCreate):
    db = SessionLocal()
    try:
        todo = crud.update_todo(db, todo_id, todo_in)
        if not todo:
            raise HTTPException(status_code=404, detail="Todo not found")
        return todo
    finally:
        db.close()

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    db = SessionLocal()
    try:
        ok = crud.delete_todo(db, todo_id)
        if not ok:
            raise HTTPException(status_code=404, detail="Todo not found")
        return {"deleted": True}
    finally:
        db.close()
