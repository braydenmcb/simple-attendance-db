import React, { useState } from 'react';
import axios from "axios";
import App from '../App.jsx';

function AddStudent({fetchAPI}) {
    console.log("in AddStudent");
    const [error, setError] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [number, setNumber] = useState("");
    const [tkdRank, setTkdRank] = useState("");
    const [kbRank, setKbRank] = useState("");
    const [bjjRank, setBjjRank] = useState("");

    const tkdRanks = [null, "white belt", "yellow stripe", "yellow belt", "green stripe", "green belt", 
        "blue stripe", "blue belt", "red stripe", "red belt", "black stripe", "black belt"];
    
    const kbRanks = [null, "beginner", "intermediate", "advanced"];
    
    const youthBjjRanks = [null, "white belt", "gray white stripe", "gray belt", "gray black stripe", "yellow white stripe", 
                            "yellow belt", "yellow black stripe", "orange white stripe", "orange belt", "orange black stripe",
                            "green white stripe", "green belt", "green black stripe", ];
    const adultBjjRanks = [null, "white belt", "blue belt", "purple belt", "brown belt", "black belt"];

    
    const isChild = age < 16 ? true : false;
    const availableRanks = isChild ? youthBjjRanks : adultBjjRanks;


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newStudent = {
            first_name: firstName,
            last_name: lastName,
            age: age,
            gender: gender,
            type: isChild ? "child" : "adult",
            number: number,
            tkd_rank: tkdRank,
            kb_rank: kbRank,
            bjj_rank: bjjRank,
            picture: null,
        };

        try {
            const response = await axios.post("http://127.0.0.1:8080/api/students", newStudent);
            console.log("Added Student:", response.data); // Debug log
            fetchAPI();
        } catch (error) {
            console.error("Error adding student:", error);
            setError(error);
        }
    };

    return (
        <div className="add-student">
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                <label>
                    Age:
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </label>
                <label>
                    Gender:
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other/Prefer not to say</option>
                    </select>
                </label>
                <label>
                    Phone Number:
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </label>
                <label>
                    Taekwon-Do Rank:
                    <select
                        value={tkdRank}
                        onChange={(e) => setTkdRank(e.target.value)}
                    >
                       <option value="null">Select Rank/Null</option>
                        {tkdRanks.map((rankOption, index) => (
                            <option key={index} value={rankOption}>
                                {rankOption}
                            </option>
                        ))}
                    </select> 
                </label>
                <label>
                    Kickboxing Rank:
                    <select
                        value={kbRank}
                        onChange={(e) => setKbRank(e.target.value)}
                    >
                        <option value="null">Select Kickboxing Rank</option>
                        {kbRanks.map((rankOption, index) => (
                            <option key={index} value={rankOption}>
                                {rankOption}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    BJJ Rank:
                    <select
                        value={bjjRank}
                        onChange={(e) => setBjjRank(e.target.value)}
                    >
                     <option value="">Select BJJ Rank</option>
                        {availableRanks.map((rankOption, index) => (
                            <option key={index} value={rankOption}>
                                {rankOption}
                            </option>
                        ))}
                    </select>  
                </label>
                <br />
                <button type="submit">Add Student</button>
            </form>
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </div>

      );
}

export default AddStudent;