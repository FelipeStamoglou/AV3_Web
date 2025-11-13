from pydantic import BaseModel
from typing import Optional

class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None
    done: Optional[bool] = False

class TodoOut(TodoCreate):
    id: int

    class Config:
        orm_mode = True
