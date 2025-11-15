import os
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel.ext.asyncio.session import AsyncSession
from app.db import async_session, init_db
from app import crud, schemas, auth
from app.models import User, Note

app = FastAPI(title="Notas API")

# -------------------------------
# LOGIN TEMPORARIAMENTE DESABILITADO
# -------------------------------
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

@app.on_event("startup")
async def on_startup():
    await init_db()

async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session

# ---------------------------------------------------------------
# AUTENTICAÇÃO DESABILITADA — SEM JWT, SEM TOKEN, USUÁRIO FIXO
# ---------------------------------------------------------------
"""
async def get_current_user(token: str = Depends(oauth2_scheme), session: AsyncSession = Depends(get_session)):
    payload = auth.decode_token(token)
    if not payload or "user_id" not in payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
    user = await crud.get_user_by_email(session, payload.get("email"))
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user
"""

# Usando usuário fake id=1
class FakeUser:
    id = 1

async def get_current_user():
    return FakeUser()


# ------------------------------------------
# ROTAS /register e /login COMENTADAS
# ------------------------------------------
"""
@app.post("/register", response_model=dict)
async def register(user_in: schemas.UserCreate, session: AsyncSession = Depends(get_session)):
    existing = await crud.get_user_by_email(session, user_in.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = await crud.create_user(session, user_in.username, user_in.email, user_in.password)
    return {"id": user.id, "username": user.username, "email": user.email}

@app.post("/login", response_model=schemas.Token)
async def login(form_data: schemas.UserCreate, session: AsyncSession = Depends(get_session)):
    user = await crud.authenticate_user(session, form_data.email, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    token = auth.create_access_token({"user_id": user.id, "email": user.email})
    return {"access_token": token, "token_type": "bearer"}
"""
# ------------------------------------------
# FIM DO BLOCO COMENTADO
# ------------------------------------------


# -------------------------
# CRUD DE NOTAS SEM LOGIN
# -------------------------

@app.post("/notas", response_model=schemas.NoteOut)
async def create_note(note_in: schemas.NoteCreate,
                      current_user=Depends(get_current_user),
                      session: AsyncSession = Depends(get_session)):

    note = await crud.create_note(session, current_user.id, note_in.title, note_in.content)
    return note


@app.get("/notas", response_model=list[schemas.NoteOut])
async def list_notes(q: str | None = None,
                     current_user=Depends(get_current_user),
                     session: AsyncSession = Depends(get_session)):

    if q:
        res = await crud.search_notes_by_title(session, current_user.id, q)
    else:
        res = await crud.get_notes_by_owner(session, current_user.id)
    return res


@app.get("/notas/{note_id}", response_model=schemas.NoteOut)
async def get_note(note_id: int,
                   current_user=Depends(get_current_user),
                   session: AsyncSession = Depends(get_session)):

    note = await crud.get_note_by_id(session, note_id)
    if not note or note.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Note not found")
    return note


@app.put("/notas/{note_id}", response_model=schemas.NoteOut)
async def update_note(note_id: int,
                      note_in: schemas.NoteUpdate,
                      current_user=Depends(get_current_user),
                      session: AsyncSession = Depends(get_session)):

    note = await crud.get_note_by_id(session, note_id)
    if not note or note.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Note not found")

    note = await crud.update_note(session, note, note_in.title, note_in.content)
    return note


@app.delete("/notas/{note_id}")
async def delete_note(note_id: int,
                      current_user=Depends(get_current_user),
                      session: AsyncSession = Depends(get_session)):

    note = await crud.get_note_by_id(session, note_id)
    if not note or note.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Note not found")

    await crud.delete_note(session, note)
    return {"detail": "deleted"}
