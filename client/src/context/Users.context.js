import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';

const UserContext = createContext({
    user: [],
    setUser: () => Promise,
    input: [],
    setInput: () => Promise,
    handleSignup: () => null,
    handleLogin: () => null,
    handleMail: () => null,
    loaded: "",
    setLoaded: () => Promise,
    signinUser: "",
    setSigninUser: () => Promise,
    userShortenUrl: [],
    setUserShortenUrl: () => Promise,
    result: "",
    setResult: () => Promise
})

export const useUser = () => useContext(UserContext);

export default function UsersContextProvider({ children }) {

    const [user, setUser] = useState([]);
    const [input, setInput] = useState(null);
    const [loaded, setLoaded] = useState("");
    const [signinUser, setSigninUser] = useState("");
    const [userShortenUrl, setUserShortenUrl] = useState([]);
    const [result, setResult] = useState("");

    useEffect(() => {
        const URL = 'https://url-shortner-t0ox.onrender.com/users';
        axios.get(URL)
            .then(res => {
                // console.log(res.data.result);
                setUser(res.data.result);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const navigat = useNavigate();
    const handleSignup = (event) => {
        event.preventDefault();
        const SIGNUP_URL = 'https://url-shortner-t0ox.onrender.com/signup/createUser';
        axios.post(SIGNUP_URL, input)
            .then(res => {
                navigat('/AccountCreated')
            })
            .catch(err => {
                alert("Something Went Wrong")
                console.log("Account Created Failed", err);
            })
    };

    const handleLogin = (event) => {
        event.preventDefault();
        const LOGIN_URL = 'https://url-shortner-t0ox.onrender.com/login';
        axios.post(LOGIN_URL, input, {})
            .then(res => {
                sessionStorage.setItem("Authorization", res.data.token);
                var decoded = jwtDecode(res.data.token);
                sessionStorage.setItem("Token", JSON.stringify(decoded))

                if (res.data.message === "Login Successful!!") {
                    navigat('/dashboard');
                }
                else {
                    alert(res.data.message);
                }
            })
            .catch(err => {
                alert("Invalid E-mail or Password");
                console.log(err);
            })
    }


    const handleMail = (event) => {
        event.preventDefault();
        // toast("Email Sending.....",{autoClose: 2000,pauseOnHover: false});
        setLoaded("true");
        const FORGOT_URL = 'https://url-shortner-t0ox.onrender.com/forgot';
        axios.put(FORGOT_URL, input)
            .then(response => {
                if (response.data.success) {
                    setLoaded("false");
                    toast("Email Sent Successfully");
                    // alert(`${response.data.message} => Go to Mail`)
                }
            })
            .catch(err => {
                setLoaded("false");
                toast("Enter Valid Email");
            })
    }

    useEffect(() => {
        const URL = `https://url-shortner-t0ox.onrender.com/userActivities/${signinUser}`;
        axios.get(URL)
            .then(res => {
                let userShortenUrlCopy = [...userShortenUrl]
                userShortenUrlCopy.push(...res.data.result)
                setUserShortenUrl(userShortenUrlCopy);
            })
            .catch(err => {
                console.log(err);
            })
    }, [signinUser])



    const value = {
        user,
        setUser,
        input,
        setInput,
        handleSignup,
        handleLogin,
        handleMail,
        loaded,
        signinUser,
        setSigninUser,
        userShortenUrl,
        setUserShortenUrl,
        result,
        setResult
    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}
