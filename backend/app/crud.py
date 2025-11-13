from sqlalchemy.orm import Session
from models import Todo
from schemas import TodoCreate

def create_todo(db: Session, todo_in: TodoCreate):
    t = Todo(title=todo_in.title, description=todo_in.description, done=todo_in.done)
    db.add(t)
    db.commit()
    db.refresh(t)
    return t

def get_todos(db: Session):
    return db.query(Todo).all()

def get_todo(db: Session, todo_id: int):
    return db.query(Todo).filter(Todo.id == todo_id).first()

def update_todo(db: Session, todo_id: int, todo_in: TodoCreate):
    t = db.query(Todo).filter(Todo.id == todo_id).first()
    if not t:
        return None
    t.title = todo_in.title
    t.description = todo_in.description
    t.done = todo_in.done
    db.commit()
    db.refresh(t)
    return t

def delete_todo(db: Session, todo_id: int):
    t = db.query(Todo).filter(Todo.id == todo_id).first()
    if not t:
        return False
    db.delete(t)
    db.commit()
    return True
