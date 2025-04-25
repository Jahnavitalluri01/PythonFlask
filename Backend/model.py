from app import db
class Friend(db.Model):
    id=db.column(db.Integer,primary_key=True)
    name=db.column(db.String(50),nullable=False)
    role=db.column(db.String(50),nullable=False)
    description=db.column(db.Text,nullable=False)
    gender=db.column(db.String(10),nullable=False)
    img_url=db.column(db.String(200),nullable=True)

def convert_to_json(self):
    return{
    "id":self.id,
    "name":self.name,
    "role":self.role,
    "description":self.description,
    "gender":self.gender,
    "img_url":self.img_url
    }
