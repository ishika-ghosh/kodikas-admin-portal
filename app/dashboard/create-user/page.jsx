"use client"
import { useState } from "react"
import UserForm from "@components/UserForm"
import axios from "axios"

function CreateUser() {
    const [loading,setLoading]=useState(false)
    const [userData,setUserData]=useState({
        username:"",
        password:"",
        isSuperAdmin:true

    })
    const [checked,setChecked]=useState(false)
const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit=async()=>{
    try {
        setUserData({...userData,isSuperAdmin:checked})
        console.log(userData);
        setLoading(true)
        const {data}=await axios.post('/api/users/createuser',userData);
        console.log(data);
        alert('user created successfully')
        setLoading(false)
    } catch (error) {
        console.log(error);
    }
  }
  const handleCheckBox=()=>{
    setChecked(!checked)
  }
  return (
    <UserForm formData={userData} handleChange={handleChange} handleSubmit={handleSubmit} createUser={true} loading={loading} handleCheckBox={handleCheckBox}/>
  )
}

export default CreateUser