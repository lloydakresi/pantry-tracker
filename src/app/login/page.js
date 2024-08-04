'use client'
import { signInDefault, signInWithGoogle } from "../../firebase/firestore/users/login";
import { useState } from 'react'

export default function Page(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const user = await signInDefault(password, email);
            console.log("Successfully signed in!");
            setEmail("");
            setPassword("");
        }catch(error){
            const code = error.code;
            const message = error.message;
            console.log(`${error.code}: ${error.message}`);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <br />
            <button type="submit">Submit</button>
            <br />
            <button type="button" onClick={signInWithGoogle}>Sign in with Google</button>
    </form>
    )


}
