import React from "react";
import {useNavigate} from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();
  const handleChange =() =>{
    navigate('sign-in')
  }
  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-600 min-h-screen flex flex-col justify-center items-center">
    <div className="max-w-3xl text-center px-6">
      <h1 className="text-5xl font-bold text-white mb-8">Welcome to Our App!</h1>
      <p className="text-lg text-white leading-relaxed">
        Experience the power of our MERN stack authentication app—a seamless solution for user registration, login, and access management. With advanced features and robust security measures, we provide a platform where users can securely create accounts, log in with confidence, and access their resources with ease. From password management to role-based access control, we ensure data security and privacy at every step. Our intuitive user interface and responsive design enhance the user experience, making navigation effortless and interactions seamless. Engineered for scalability and performance, our app architecture can handle high loads and dynamically adapt to meet the demands of your growing user base. Welcome aboard, and let's embark on a journey of security, simplicity, and success together!
      </p>
      <button className="mt-12 bg-white text-indigo-600 font-bold py-2 px-6 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out" onClick={handleChange}>Get Started</button>
    </div>
  </div>
  );
}
