import { useRouter } from 'next/router'
import { useState } from 'react';
const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log("data", data)
        if (response.ok) {
            console.log('Data saved to database');
            localStorage.setItem("User", JSON.stringify(data.data))
            router.push("/")

        } else {
            alert(data.error)
            console.log('Error saving data to database');
        }
    };


    return (
        <div className='mainClass'>
            <div className='formBox'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type='email' name='email' placeholder='enter email' value={email} onChange={(event) => setEmail(event.target.value)} />
                    <input type='password' name='password' placeholder='enter password' value={password} onChange={(event) => setPassword(event.target.value)} />
                    <button type='submit'>Login</button>
                </form>

            </div>
        </div>
    )
}

export default Login