import { useState } from "react"
import axios from "axios"

const PostCreate = () => {
    const [title, setTitle] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://posts.com/posts/create', {title})
        setTitle('')        
    }

    return (
        <>
            <h1>Create Post!!!</h1>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" className="form-control" name="title" value={title} onChange={e => setTitle(e.target.value)}/>
                <input type="submit" className="btn btn-primary mt-2" value="Submit"/>
            </form>
        </>
    )
}

export default PostCreate