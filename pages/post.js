import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
const post = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [postData, setPostData] = useState([])
    const [updateFlag, setUpdateFlag] = useState(false)
    const [postId, setPostId] = useState('')
    const [search, setSearch] = useState('')
    async function getPostdata() {
        const userId = JSON.parse(localStorage.getItem("User"))._id

        const response = await fetch('/api/post/?userId=' + userId);
        const data = await response.json();
        console.log(data)
        setPostData(data.post)
        console.log("data", data)
    }
    useEffect(() => {
        getPostdata()
    }, [])
    const searchPost = async (e) => {

        setSearch(e.target.value)
        console.log("search post call", search)
        const userId = JSON.parse(localStorage.getItem('User'))._id;

        try {
            const response = await fetch(`/api/post/?userId=${userId}&search=${search}`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts.');
            }
            const data = await response.json();
            console.log(data);
            setPostData(data.post);
        } catch (error) {
            console.error(error);
            // Handle the error appropriately (e.g., show an error message to the user)
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = JSON.parse(localStorage.getItem("User"))._id
        console.log("userId", userId)

        const response = await fetch('/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, desc, userId }),
        });
        const data = await response.json();
        console.log("data", data)
        if (response.ok) {
            console.log('Data saved to database');
            getPostdata()
            setDesc("")
            setTitle("")
            // localStorage.setItem("User", JSON.stringify(data.data))
            // router.push("\login")

        } else {
            console.error('Error saving data to database');
        }
    };
    const deletePost = async (id) => {
        const userId = JSON.parse(localStorage.getItem("User"))._id
        console.log("userId", userId)

        const response = await fetch('/api/post', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, userId }),
        });
        const data = await response.json();
        console.log("data", data)
        if (response.ok) {
            console.log('Data saved to database');
            getPostdata()
            // localStorage.setItem("User", JSON.stringify(data.data))
            // router.push("\login")

        } else {
            console.error('Error saving data to database');
        }
    }
    const updatePost = async (event) => {
        event.preventDefault();

        const userId = JSON.parse(localStorage.getItem("User"))._id
        console.log("userId", userId)

        const response = await fetch('/api/post', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: postId, userId, title, desc }),
        });
        const data = await response.json();
        console.log("data", data)
        if (response.ok) {
            console.log('Data saved to database');
            getPostdata()
            setUpdateFlag(false)
            setDesc("")
            setTitle("")

            // localStorage.setItem("User", JSON.stringify(data.data))
            // router.push("\login")

        } else {
            console.error('Error saving data to database');
        }
    }
    const SendDataForm = (data) => {
        console.log("data", data)
        setUpdateFlag(true)
        setTitle(data.title)
        setDesc(data.desc)
        setPostId(data._id)
    }
    return (

        <Layout>


            <div className={styles.container}>


                <main className="main">
                    {/* <Carousel2/> */}
                    <div className='mainPost'>
                        <div className='formBox'>
                            <form onSubmit={updateFlag ? updatePost : handleSubmit}>
                                <input type='text' name='title' placeholder='enter name' value={title} onChange={(event) => setTitle(event.target.value)} />
                                <textarea type='text' name='desc' placeholder='enter email' value={desc} onChange={(event) => setDesc(event.target.value)} />
                                {
                                    updateFlag ? <button type='submit'>Update</button> : <button type='submit'>Save</button>
                                }
                            </form>
                        </div>
                    </div>
                    <div className='SearchInput'>
                        <input type='search' onKeyUp={searchPost} placeholder='search' value={search} onChange={searchPost} />
                    </div>
                    <div className='Post'>

                        {
                            postData?.map((item, index) => {
                                return <div className='postRow' key={index}>
                                    <div className='srno'>{index + 1}</div>
                                    <div className='title'>{item.title}</div>
                                    <p>{item.desc}</p>
                                    <div className='buttonBox'>
                                        <button onClick={() => SendDataForm(item)}>Edit</button>
                                        <button onClick={() => deletePost(item._id)}>Delete</button>
                                    </div>
                                </div>
                            })
                        }


                    </div>
                </main>


            </div>
        </Layout>

    )
}

export default post