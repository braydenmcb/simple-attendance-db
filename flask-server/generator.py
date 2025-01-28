import sqlite3
import faker

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('students.db')
c = conn.cursor()

# Create table
c.execute('''CREATE TABLE students
             (id INTEGER PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                age INTEGER NOT NULL,
            picture TEXT NOT NULL)''')

# Commit the changes and close the connection

for _ in range(15):
    fake = faker.Faker()
    first_name = fake.first_name()
    last_name = fake.last_name()
    age = fake.random_int(min=5, max=65)
    picture = fake.image_url()
    c.execute("INSERT INTO students (first_name, last_name, age, picture) VALUES (?, ?, ?, ?)", (first_name, last_name, age, picture))

conn.commit()
conn.close()


print("Database and table created successfully.")