from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from .models import User, Note
from .auth import get_password_hash, verify_password

# Users
async def get_user_by_email(session: AsyncSession, email: str):
    q = select(User).where(User.email == email)
    res = await session.execute(q)
    return res.scalar_one_or_none()

async def create_user(session: AsyncSession, username: str, email: str, password: str):
    user = User(username=username, email=email, password_hash=get_password_hash(password))
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user

async def authenticate_user(session: AsyncSession, email: str, password: str):
    user = await get_user_by_email(session, email)
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user

# Notes
async def create_note(session: AsyncSession, owner_id: int, title: str, content: str):
    note = Note(owner_id=owner_id, title=title, content=content)
    session.add(note)
    await session.commit()
    await session.refresh(note)
    return note

async def get_note_by_id(session: AsyncSession, note_id: int):
    q = select(Note).where(Note.id == note_id)
    res = await session.execute(q)
    return res.scalar_one_or_none()

async def get_notes_by_owner(session: AsyncSession, owner_id: int):
    q = select(Note).where(Note.owner_id == owner_id).order_by(Note.created_at.desc())
    res = await session.execute(q)
    return res.scalars().all()

async def search_notes_by_title(session: AsyncSession, owner_id: int, title: str):
    q = select(Note).where(Note.owner_id == owner_id, Note.title.ilike(f"%{title}%"))
    res = await session.execute(q)
    return res.scalars().all()

async def update_note(session: AsyncSession, note: Note, title: str | None, content: str | None):
    if title is not None:
        note.title = title
    if content is not None:
        note.content = content
    session.add(note)
    await session.commit()
    await session.refresh(note)
    return note

async def delete_note(session: AsyncSession, note: Note):
    await session.delete(note)
    await session.commit()
    return True
