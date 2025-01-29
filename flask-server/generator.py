import sqlite3
import faker

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('./data/students.db')
c = conn.cursor()

# Create table
c.execute('''CREATE TABLE students
             (id INTEGER PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                age INTEGER NOT NULL,
                gender TEXT NOT NULL,
                type TEXT NOT NULL,
                phone_number TEXT NOT NULL,
                tkd_rank TEXT,
                kb_rank TEXT,
                bjj_rank TEXT,
            picture TEXT NOT NULL)''')

# possible attributes for students
genders = ["male", "female", "other"]

taekwon_do_ranks = [None, "white belt", "yellow stripe", "yellow belt", "green stripe", "green belt", 
                    "blue stripe", "blue belt", "red stripe", "red belt", "black stripe", "black belt"]

kickboxing_ranks = [None, "beginner", "intermediate", "advanced"]

bjj_youth_ranks = [None, "white belt", "gray white stripe", "gray belt", "gray black stripe", "yellow white stripe", 
                   "yellow belt", "yellow black stripe", "orange white stripe", "orange belt", "orange black stripe",
                     "green white stripe", "green belt", "green black stripe", ]

bjj_adult_ranks = [None, "white belt", "blue belt", "purple belt", "brown belt", "black belt"]

pictures = ['/id-pics/male-test-image.jpg', '/id-pics/female-test-image.jpg']

# generate 15 random students
for _ in range(15):
    fake = faker.Faker()
    gender = fake.random_element(genders)

    first_name = ""
    if gender == "male":
        first_name = fake.first_name_male()
    elif gender =="female":
        first_name = fake.first_name_female()
    else:
        first_name = fake.first_name()

    last_name = fake.last_name()
    age = fake.random_int(min=5, max=65)
    age_type = "child" if age < 18 else "adult"
    phone_number = fake.phone_number()
    tkd_rank = fake.random_element(taekwon_do_ranks)
    kb_rank = fake.random_element(kickboxing_ranks)
    bjj_rank = fake.random_element(bjj_youth_ranks) if age < 16 else fake.random_element(bjj_adult_ranks)
    picture = pictures[0] if gender == "male" else pictures[1]
    c.execute("""INSERT INTO students (first_name, last_name, age, gender, type, phone_number, tkd_rank, kb_rank, bjj_rank, picture) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""", (first_name, last_name, age, gender, age_type, phone_number, tkd_rank, kb_rank, bjj_rank, picture))


# Add test students for special cases, NOTE: these students are fake and do not exist, and if they do it is purely coincidental
test_student1 = ["John", "Doe", 16, "male", "child", "555-555-5555", "green belt", "advanced", "blue belt", "/id-pics/test-male-image.jpg"]
test_student2 = ["Jane", "Doe", 10, "female", "child", "555-555-5555", "green belt", "intermediate", "gray black stripe", "/id-pics/test-female-image.jpg"]

c.execute("""INSERT INTO students (first_name, last_name, age, gender, type, phone_number, tkd_rank, kb_rank, bjj_rank, picture) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""", (test_student1[0], test_student1[1], test_student1[2], test_student1[3], test_student1[4], 
                                                         test_student1[5], test_student1[6], test_student1[7], test_student1[8], test_student1[9]))

c.execute("""INSERT INTO students (first_name, last_name, age, gender, type, phone_number, tkd_rank, kb_rank, bjj_rank, picture) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""", (test_student2[0], test_student2[1], test_student2[2], test_student2[3], test_student2[4], 
                                                         test_student2[5], test_student2[6], test_student2[7], test_student2[8], test_student2[9]))

conn.commit()
conn.close()


print("Database and table created successfully.")