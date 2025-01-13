from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from backend.models import Base
import os

DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql://postgres_user:postgres_pw@db:5432/ochem-rxn_db"
)

engine = create_async_engine(
    DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://"),
    echo=True,
    future=True,
)
SessionLocal = sessionmaker(expire_on_commit=False, bind=engine, class_=AsyncSession)


async def get_db():
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
