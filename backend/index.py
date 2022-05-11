from typing import List, Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from starlette import status
from fastapi.middleware.cors import CORSMiddleware
import models
from database import SessionLocal

app = FastAPI()
app.add_middleware(CORSMiddleware,
                   allow_origins='http://localhost:3000',
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])


class User(BaseModel):
    id: Optional[int] = None
    name: str
    email: str
    password: str

    class Config:
        orm_mode = True


db = SessionLocal()


@app.get('/users', response_model=List[User], status_code=200)
def fetch_all_users():
    users = db.query(models.User).all()
    print(users)
    return users


@app.get('/users/{id}', response_model=User, status_code=status.HTTP_200_OK)
def fetch_user(user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    return user


@app.post('/users', response_model=User, status_code=status.HTTP_201_CREATED)
def add_user(user: User):
    print(user)
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user is not None:
        raise HTTPException(status_code=400, detail="Already registered")
    new_user = models.User(
        name=user.name,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()

    return new_user


@app.put('/users/{user_id}', response_model=User, status_code=status.HTTP_200_OK)
def update_user(user_id: int, update_user: User):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    user.name = update_user.name
    user.email = update_user.email
    user.password = update_user.password
    db.commit()
    return user


@app.delete('/users/{user_id}')
def delete_user(user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User is not present")

    db.delete(user)
    db.commit()

    return user
