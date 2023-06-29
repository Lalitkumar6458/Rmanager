import { useRouter } from 'next/router'

import { useState } from 'react';
import Link from 'next/link';
const Signup = () => {
    const router = useRouter()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/hello', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        console.log("data",data)
        if (response.ok) {
            console.log('Data saved to database');
            localStorage.setItem("User",JSON.stringify(data.data))
            router.push("\login")

        } else {
            console.error('Error saving data to database');
        }
    };


  return (
    <div className='mainClass'>
<div className='formBox'>
    <h2>SignUp</h2>
              <form onSubmit={handleSubmit}>
                  <input type='text' name='name' placeholder='enter name' value={name} onChange={(event) => setName(event.target.value)} />
                  <input type='email' name='email' placeholder='enter email' value={email} onChange={(event) => setEmail(event.target.value)} />
                  <input type='password' name='password' placeholder='enter password' value={password} onChange={(event) => setPassword(event.target.value)} />
                  <button type='submit'>Signup</button>
              </form>
              <div className='SignupBtn '>
                  If Have Already Account ? <Link href="/login">Login</Link>
              </div>
</div>
        
    </div>
  )
}

export default Signup