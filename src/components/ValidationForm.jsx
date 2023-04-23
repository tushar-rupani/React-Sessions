import { useState } from "react";
import "../index.css"
import { useNavigate } from "react-router-dom";
import { Achievements } from "./Achievements";
import { Users } from "./Users";
const requiredFields = [
    { name: "first", message: "First Name Should Not be empty" },
    { name: "last", message: "Last Name Should Not be empty" },
    { name: "gender", message: "Please Select Gender" },
    { name: "dob", message: "Please Enter Date of Birth" },
    { name: "address", message: "Please Enter address" },
    { name: "email", message: "Please Enter email" },
    { name: "number", message: "Please Enter Phone Number" },
    { name: "hobbies", message: "Please Enter Phone Number" },
    { name: "achievements" },
];

export const ValidationForm = () => {
    const [errors, setErrors] = useState({});
    const [achievements, setAchievements] = useState([]);
    const [achievementCount, setAchievementCount] = useState(1);
    const handleAdding = () => {
        setAchievements([...achievements, <Achievements key={achievementCount} id={achievementCount} />])
        setAchievementCount(achievementCount + 1);
    }

    const validateField = (value) => {
        return value.length > 0;
    };

    let errorMessages = {};
    const requiredValidation = (formData) => {

        for (let i = 0; i < requiredFields.length; i++) {
            const field = requiredFields[i];
            if (!validateField(formData[field.name])) {
                errorMessages[field.name] = [field.message];
            }
        }
        let dobOfUser = parseInt(formData.dob.split("-")[0]);
        if (dobOfUser < 1980) {
            errorMessages["dob"] = ["Your birthdate should not be lower than year 1980"]
        }

        if (formData["number"] && (formData["number"].length < 10 || formData["number"].length > 10)) {
            errorMessages["number"] = ["Phone number must be 10 digits only"];
        }
        let getDataOfHobbies = formData.hobbies.selectedOptions;
        var values = Array.from(getDataOfHobbies).map(({ value }) => value);
        if (!values.length) {
            errorMessages["hobbies"] = ["You must select atleast one hobby"]
        }
        console.log("values", values);
        if (formData.achievements.length == 0) {
            errorMessages["achievements"] = ["Atleast select one achievement bro."]
        }
        console.log(formData);
        setErrors(errorMessages);

        if(Object.keys(errorMessages).length === 0){
            console.log("there are no errors");
            console.log(formData.circularReference);
            formData = {...formData, hobbies: values}
            
            localStorage.setItem('formData', JSON.stringify(formData))
            
        }
        
        errorMessages = {}
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            first: e.target.first.value,
            last: e.target.last.value,
            gender: e.target.gender.value,
            dob: e.target.dob.value,
            address: e.target.address.value,
            email: e.target.email.value,
            number: e.target.number.value,
            hobbies: e.target.hobbies,
            achievements: []
        };
        const ALL_ACHIEVEMENTS = Array.from(e.target.querySelectorAll('.achievements'));
        console.log(ALL_ACHIEVEMENTS);
        ALL_ACHIEVEMENTS.forEach((achievement, idx) => {
            const title = achievement.querySelector(`.title${idx}`).value;
            const year = achievement.querySelector(`.year${idx}`).value;
            if (title?.length && year?.length) {
                formData.achievements.push({ title, year })
            }else{
                errorMessages["achievements"] = ["If you are adding achievements enter content as well or just remove."]
            }
        })
         requiredValidation(formData);
        console.log("my errors", errors);
        
    };

    const handleRemoveAchievement = (id) => {
        console.log(achievements, id);
        const newAchievements = achievements.filter((achievement) => (achievement.key) != id)
        setAchievements(newAchievements);
        setAchievementCount(achievementCount - 1);
    }
    return (
        <div className="flex-2">
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="flex">
                        <input type="text" name="first" className="m" placeholder="Enter First Name" /><br />
                        {errors["first"] && <div className="error m-top">{errors["first"][0]}</div>}
                        <input type="text" name="last" className="m" placeholder="Enter Last Name" /><br />
                        {errors["last"] && <div className="error">{errors["last"][0]}</div>}
                    </div>
                    <div className="flex">
                        <select name="gender" className="m setting-width">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select><br />
                        {errors["gender"] && <div className="error m-top">{errors["gender"][0]}</div>}
                        <input type="date" name="dob" className="m changes__date" /><br />
                        {errors["dob"] && <div className="error m-top">{errors["dob"][0]}</div>}
                    </div>
                    <div className="flex">
                        <input type="email" name="email" className="m" placeholder="Enter Email" /><br />
                        {errors["email"] && <div className="error m-top">{errors["email"][0]}</div>}
                        <input type="number" name="number" className="m" placeholder="Enter Phone Number" /><br />
                        {errors["number"] && <div className="error m-top">{errors["number"][0]}</div>}
                    </div>
                    <div className="flex">
                        <textarea name="address" id="" cols="30" rows="4" className="m">
                        </textarea><br />
                        {errors["address"] && <div className="error m-top">{errors["address"][0]}</div>}
                        <select name="hobbies" id="hobbies" multiple className="m">
                            <option value="reading">Reading</option>
                            <option value="cricket">Cricket</option>
                        </select><br />
                        {errors["hobbies"] && <div className="error m-top">{errors["hobbies"][0]}</div>}
                    </div>

                    <Achievements /> <br />
                    {achievements.map((item, index) => (
                        <div key={index}>
                            {item}
                            <button type="button" style={{ margin:"0 25px", padding: "7px", backgroundColor: "#d9162a", color: "white" }} onClick={() => handleRemoveAchievement(item.key)}>REMOVE</button>
                            <br /><br />
                        </div>
                    ))}
                    {errors["achievements"] && <div className="error m-top">{errors["achievements"][0]}</div>}
                    <button type="button" onClick={handleAdding} style={{ margin:"0 25px", padding: "7px", backgroundColor: "#14ba6a", color: "white" }}>ADD + </button> <br />
                    <button type="submit" className="m">Submit</button>
                </div>
                
            </form>
           
        </div>
    );
};
