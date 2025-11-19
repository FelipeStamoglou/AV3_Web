from sqlmodel import SQLModel, create_engine
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:123@db-postgres:5432/notasdb")

engine = create_async_engine(DATABASE_URL, echo=False, future=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def init_db():
    try:
        async with engine.begin() as conn:
            await conn.run_sync(SQLModel.metadata.create_all)
    except IntegrityError:
        # Se der erro porque outro backend criou a tabela milissegundos antes, 
        # nós ignoramos e seguimos a vida.
        print("Aviso: Tabelas já existem ou foram criadas por outra réplica. Continuando...")
    except Exception as e:
        # Se for outro erro qualquer, mostra no log mas não quebra (opcional)
        print(f"Aviso durante startup do banco: {e}")
