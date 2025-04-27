from app import app,db;
from flask import request,jsonify;
from model import Friend

@app.route("/api/friends",methods=["GET"])
def get_friends():
    Friends=Friend.query.all()
    result=[]
    for i in Friends:
        result.append(i.convert_to_json())
    return jsonify(result), 200

@app.route("/api/friends",methods=["POST"])
def create_friend():
    try:
        data=request.json
        mandatory_fields=["name","role","description","gender","img_url"]
        missing_data=[]
        for i in mandatory_fields:
            if i not in data:
                missing_data.append(i)
        if(len(missing_data)>0):
             return jsonify({"error":"One or more Required data is missing","missing_fields":missing_data}), 500
        
        name=data.get("name")
        role=data.get("role")
        description=data.get("description")
        gender=data.get("gender")
        img_url=data.get("img_url")
        new_friend=Friend(name=name,role=role,description=description,gender=gender,img_url=img_url)
        db.session.add(new_friend)
        db.session.commit()
        return jsonify({"msg":"Friend created successfully"}), 200
    
    except Exception as e:
        print("Exception occured ="+e)
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
       




    