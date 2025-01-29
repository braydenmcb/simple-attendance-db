from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3


app = Flask(__name__)
cors = CORS(app, origins="*") #TODO: update origins in production


def get_students():
    conn = sqlite3.connect('./data/students.db')
    c = conn.cursor()
    c.execute("SELECT * FROM students")
    students = c.fetchall()
    conn.close()
    student_list = [
        {"id": row[0], "first_name": row[1], "last_name": row[2], "age": row[3], 
         "gender": row[4], "type": row[5], "phone_number": row[6],
         "tkd_rank": row[7], "kb_rank": row[8], "bjj_rank": row[9], "picture": row[10]}
        for row in students
    ]
    return student_list

@app.route('/api/students/<int:student_id>', methods=['DELETE'])
def remove_student(student_id):
    print(f"Removing student with id: {student_id}")
    conn = sqlite3.connect('./data/students.db')
    c = conn.cursor()
    c.execute("DELETE FROM students WHERE id=?", (student_id,))
    conn.commit()
    conn.close()

    if c.rowcount == 0:
        return jsonify({"error": "Student not found"}), 404
    return jsonify({"message": "Student removed"}), 200


# students API Route
@app.route('/api/students', methods=['GET'])
def students():
    try:
        data = get_students()
        # print("fetched data:", data)
        return jsonify(data)
    except Exception as e:
        print("An error occurred:", e)
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=8080) #TODO: remove debug=True in production