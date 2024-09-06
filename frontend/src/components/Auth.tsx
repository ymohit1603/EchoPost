import { signupInput } from "@mohit1033/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";



export const Auth = ({ type }: { type: "signup" | "signin"})=>{
    const [postInputs,setPostInput]=useState<signupInput>({
        name:"",
        username:"",
        password:""
    })
    const navigate = useNavigate();

    async function SendRequest() {
        try {            
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            return navigate("/blogs");
        } catch (e) {
            alert("Error while sign up");
        }

    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
                 <div className="text-3xl font-extrabold">
                        Create an account
                 </div>
                    <div className="text-slate-500">
                        {
                            type==="signup"?"Don't have an account": "Already have an account?"
                        }
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {
                                type==="signin"?"Sign up":"Sign in"
                            }
                        </Link>
                 </div>
            </div>
                <div className="pt-4">  
                {type === "signup" && (
                    <LabbeledInput  label="Name" placeholder="Mohit yadav"  onChange={(e) => {
                            setPostInput({
                                ...postInputs,
                                name: e.target.value
                            });
                        }}
                    />
                )}
                   
                <LabbeledInput label="Username" placeholder="mohityadav@gmail.com"  onChange={(e)=>{
                    setPostInput({
                        ...postInputs,
                        username:e.target.value
                    })
                }}></LabbeledInput>
                <LabbeledInput label="Password" type={"password"} placeholder="Mohit yadav"  onChange={(e)=>{
                    setPostInput({
                        ...postInputs,
                        password:e.target.value
                        
                        })
                    }}></LabbeledInput>

                </div>
                <button onClick={SendRequest}  type="button" className=" w-full mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Sign up":"Sign in"}</button>
            </div>
        </div>
    </div>
}

interface LabelledInputType{
    label:string;
    placeholder:string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?:"password";
}



function LabbeledInput({label,placeholder,onChange,type}:LabelledInputType){

    return <div>
    <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
    <input   type={type||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} onChange={onChange} required />
</div>
}