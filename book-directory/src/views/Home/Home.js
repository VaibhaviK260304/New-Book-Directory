import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 
import { Link } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';
import ImgAdd from "./add.png"

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // console.log('User logged out');
    // toast.success('Logged out successfully')
    // navigate('/login');
    localStorage.clear()
        toast.success("Loged out successfully!!")
        setTimeout(()=>{
          window.location.href = '/login'
        }, 3000)
  };

  const books = [
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkvBaw44LIJSUk9oK24Fg3aJ3emMflb0OOog&s',
      name: 'The Alchemist',
      author: 'Paulo Coelho',
      url: 'https://ia801006.us.archive.org/13/items/OceanofPDF.comTheAlchemist/_OceanofPDF.com_The_Alchemist.pdf'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNf8sSripvpcfQbPFyGigWWp7BNMD-lkEoJg&s',
      name: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      url: 'https://www.planetebook.com/free-ebooks/the-great-gatsby.pdf'
    },
    {
      image: 'https://www.eourmart.com/cdn/shop/products/51FXP6S8wWS.jpg?v=1639834548',
      name: '1984',
      author: 'George Orwell',
      url: 'https://www.planetebook.com/free-ebooks/1984.pdf'
    },
    {
        image: 'https://whitmorerarebooks.cdn.bibliopolis.com/pictures/5862.jpg?auto=webp&v=1701721923',
        name: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        url: 'https://giove.isti.cnr.it/demo/eread/libri/angry/mockingbird.pdf'
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-zPMcMhycr-Mo8EcmEWl3rQcRYP2PvPd5mw&s',
        name: 'Pride and Prejudice',
        author: 'Jane Austen',
        url: 'https://www.gutenberg.org/files/1342/1342-h/1342-h.htm'
    },
  ];

  return (
    <div>
      <header className="header">
        <h1>Book Directory</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <h1 className='list'>LIST OF ALL BOOKS</h1>
      <div className="home">
        {books.map((book, index) => (
          <div className="card" key={index}>
            <img src={book.image} alt={book.name} className='book-img' />
            <h2>{book.name}</h2>
            <p>{book.author}</p>
            <a href={book.url} target="_blank" className='more-info'>More Info</a>
          </div>
        ))}
      </div>
      <Link to='/add-book'>
      <img src={ImgAdd} alt="Add Book" className="add-book"/>
      </Link>
      <Toaster/>
    </div>
  );
}

export default Home;
