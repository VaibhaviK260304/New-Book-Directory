import axios from "axios";
import "./AddBook.css";
import { useState, useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

function AddBook() {

  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      if (currentUser) {
        setUser(currentUser);
      } else {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
      window.location.href = '/login';
    }
  }, []);

  const addBook = async () => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}book`, {
      user: user._id,
      name: name,
      author: author,
      description: description,
      img: img
    });
    toast.success(response.data.message);
    setName('');
    setAuthor('');
    setDescription('');
    setImg('');

    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/login');
  };

  return (
    <div>
      <header className="header">
        <button onClick={handleLogout}>Logout</button>
      </header>
      <h1 className="signup-login-heading">Add Book for {user.name}</h1>

      <form className="signup-login-form">
        <input type="text"
               placeholder="Title"
               className="user-input"
               value={name}
               onChange={(e) => setName(e.target.value)}
        />
        <input type="text"
               placeholder="author"
               className="user-input"
               value={author}
               onChange={(e) => setAuthor(e.target.value)}
        />
        <input type="text"
               placeholder="description"
               className="user-input"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
        />
        <input type="text"
               placeholder="Image URL"
               className="user-input"
               value={img}
               onChange={(e) => setImg(e.target.value)}
        />
        <button type="button" className="btn-auth" onClick={addBook}>
          Add Book
        </button>
      </form>

      <Toaster />
    </div>
  );
}

export default AddBook;
