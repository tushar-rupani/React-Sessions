import React, { useState } from 'react'

export const ValidationForm = () => {
    let [errors, setErrors] = useState({});
    let errorMessages = [];
    const validateField = (field) => {
        if(field.value.length){
            return true
        }
        return false;
    }
    const requiredValidation = (first, last, gender, dob) => {

        let requiredFields = [first, last, gender, dob];
        var errorMap = {
            "first": "First Name Should Not be empty",
            "last": "Last Name Should Not be empty",
            "gender": "Please Select Gender",
            "dob": "Please Enter Date of Birth",
          };
        const errorMessages = requiredFields.reduce((acc, field) => {
            if(!validateField(field)){
                let fieldName = field.name;
                // console.log(acc[field] = errorMap[fieldName]);
                acc[field] = [errorMap[fieldName]]
            }
            return acc[field]
        }, {})
        console.log("error msg", errorMessages);
        // if(!validateField(first)){
        //     errorMessages.push({firstName: ["First Name Should Not be empty"]})
        // }else{
        //     errorMessages.push({})
        // }
        // if(!validateField(last)){
        //     errorMessages.push({lastName: ["Last Name Should Not be empty"]})
        // }else{
        //     errorMessages.push({})
        // }
        // if(!validateField(gender)){
        //     errorMessages.push({gender: ["Please Select Gender"]})
        // }else{
        //     errorMessages.push({})
        // }
        // if(!validateField(dob)){
        //     errorMessages.push({dob: ["Please Enter Date of Birth"]})
        // }else{
        //     errorMessages.push({})
        // }
        // console.log(errorMessages);
        setErrors(errorMessages)

        console.log(errors);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let first = e.target.first;
        let last = e.target.last;
        let gender = e.target.gender;
        let dob = e.target.dob;
        requiredValidation(first, last, gender, dob)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="first" data-field = "First Name" placeholder="Enter First Name" />
                {errors[0]?.firstName && errors[0].firstName}<br />
                <input type="text" name="last" data-field = "Last Name" placeholder="Enter Last Name" />
                {errors[1]?.lastName && errors[1].lastName}<br />
                <input type="number" name="number" placeholder="Enter Number" /><br />
                <input type="email" name="email" placeholder="Enter Email" /><br />
                <input type="radio" name="gender" data-field= "gender" value="Male" /> Male
                <input type="radio" name="gender" data-field= "gender" value="Female" /> Female &nbsp;
                {errors[2]?.gender && errors[2].gender}<br />
                <textarea name="address" id="" cols="30" rows="6">
                </textarea><br />
                <input type="text" name=" hobbies" placeholder="Enter Hobbies" /><br />
                <input type="date" name="dob" /><br />
                {errors[3]?.dob && errors[3].dob}<br />
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}
