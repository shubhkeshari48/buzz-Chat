import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';

const useSignup = () => {
  const [loading,setLoading]=useState(false);
  const {authUser,setAuthUser}=useAuthContext();
  const signup=async({fullName,username,password,confirmPassword,gender})=>{
    const success=handleInputErrors({fullName,username,password,confirmPassword,gender});
    if(!success) return;
    setLoading(true);
    try {
        const res=await fetch('/api/auth/signup',{
            method:'POST',
            headers:{"content-Type":"application/json"},
            body:JSON.stringify({fullName,username,password,confirmPassword,gender})
        })
        const data=await res.json();
        if(data.error){
            throw new Error(data.error)
        }
        // localstorage
        localStorage.setItem('chat-user',JSON.stringify(data))
        setAuthUser(data);
        console.log(data);
    } catch (error) {
        toast.error(error.message);
        setLoading(false);
    }
  }
  return {loading,signup}
}
 
export default useSignup

const handleInputErrors=({fullName,username,password,confirmPassword,gender})=>{
    if(!fullName||!username ||!password ||!confirmPassword ||!gender){
        toast.error('Please fill all the fields')
        return false;
    }
    if(password!==confirmPassword){
        toast.error('Password do not match');
        return false;
    }
    if(password.length<6){
        toast.error('Password must be atleast 6 characters')
        return false;
    }
    return true;

}