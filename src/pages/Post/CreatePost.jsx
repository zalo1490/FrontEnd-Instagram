import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../UserContext"
import addImage from '/add-image.png'
import { FormattedMessage } from "react-intl"
import DeletePost from './DeletePost'
import './CreatePost.css'

const CreatePost = () => {
  const [description, setDescription] = useState('')
  const [preview, setPreview] = useState();
  const [photo, setPhoto] = useState();
  const [user] = useUser()
  const navigate = useNavigate()
  const [postIdtoDelete, setPostIdtoDelete] = useState(null);
  

  const handleChange = e => {
    const file = e.target.files[0]
    setPhoto(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('description', description)
    fd.append('photo', photo)
    const res = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 
        'Authorization' : `${user}`
      }, 
      body: fd
    })
    if (!user || !user.token) {
      console.error("El usuario o el token es undefined.")
    }
   
    if (res.ok) {
      const data = await res.json();
      console.log(data.data.posts.id)
      navigate('/post/' + data.data.posts.id)
    }
  }

  const handleDeleteSuccess = () => {
    setPostIdtoDelete(null);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="CreatePost">
        <label>
          <img src={preview || addImage} alt="Preview" />
          <input
            type="file"
            onChange={handleChange}
            accept="image/*"
          />
          <input
            name="description"
            type="text"
            placeholder="Descripción..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
        <button><FormattedMessage id="Publicar" /></button>
      </form>
      {postIdtoDelete && (
        <DeletePost postId={postIdtoDelete} onSuccess={handleDeleteSuccess} />
      )}
    </div>
  );
}

export default CreatePost

/*
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../UserContext"
import addImage from '/add-image.png'
import { FormattedMessage } from "react-intl"
import '../Posts/CreatePost.css'

const CreatePost = () => {
  const [description, setDescription] = useState('')
  const [preview, setPreview] = useState();
  const [photo, setPhoto] = useState();
  const [user] = useUser()
  const navigate = useNavigate()


  const handleChange = e => {
    const file = e.target.files[0]
    setPhoto(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('description', description)
    fd.append('photo', photo)
    const res = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 
        'Authorization' : `${user}`
      }, 
      body: fd
    })
    if (!user || !user.token) {
      console.error("El usuario o el token es undefined.")
    }
   
    if (res.ok) {
      const data = await res.json();
      console.log(data.data.posts.id)
      navigate('/post/' + data.data.posts.id)
    }
  }

 return (
      <form onSubmit={handleSubmit} className="CreatePost">
        <label>
          <img src={preview || addImage} />
          <input
            type="file"
            onChange={handleChange}
            accept="image/*"
          />
          <input
          name="description"
          type="text"
          placeholder="Descripción..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        </label>
        <button><FormattedMessage id="Publicar" /></button>
      </form>
    )
  }
  
  export default CreatePost
  */