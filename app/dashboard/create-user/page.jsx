"use client";
import { useEffect, useState } from "react";
import UserForm from "@components/UserForm";
import axios from "axios";
import { useRouter } from "next/navigation";

function CreateUser() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    isSuperAdmin: false,
  });
  const [checked, setChecked] = useState(false);

  // useEffect(() => {
  //   const getAdmin = async () => {
  //     try {
  //       const { data } = await axios.get("/api/admin");
  //       if (data?.adminDetails) {
  //         return;
  //       } else {
  //         router.push("/dashboard");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       router.push("/dashboard");
  //     }
  //   };
  //   getAdmin();
  // }, []);
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      setUserData({ ...userData, isSuperAdmin: checked });
      // console.log(userData);
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/createuser`,
        userData
      );
      // console.log(data);
      alert("user created successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckBox = () => {
    setChecked(!checked);
  };
  return (
    <UserForm
      formData={userData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      createUser={true}
      loading={loading}
      handleCheckBox={handleCheckBox}
    />
  );
}

export default CreateUser;
