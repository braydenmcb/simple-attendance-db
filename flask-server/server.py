from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3


app = Flask(__name__)
cors = CORS(app, origins="*") #TODO: update origins in production

def get_students():
    conn = sqlite3.connect('students.db')
    c = conn.cursor()
    c.execute("SELECT * FROM students")
    students = c.fetchall()
    conn.close()
    student_list = [
        {"id": row[0], "first_name": row[1], "last_name": row[2], "age": row[3], "picture": row[4]}
        for row in students
    ]
    return student_list


# students API Route
@app.route('/api/students', methods=['GET'])
def students():
    try:
        data = get_students()
        print("fetched data:", data)
        return jsonify(data)
    except Exception as e:
        print("An error occurred:", e)
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=8080) #TODO: remove debug=True in production