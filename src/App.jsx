import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const[data, setData] = useState([]);
  const[loading, setLoading] = useState(true);

  const[currentPage, setCurrentPage] = useState(1);
  const[postPerPage, setPostPerPage] = useState(7);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  

  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(data.length/postPerPage);

  const paginate = (page) => setCurrentPage(page);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch("https://raw.githubusercontent.com/Sankari2705/JsonFile/refs/heads/main/data.json");
        const result = await response.json();
        setData(result);
        setLoading(false);
      }
      catch(error){
        console.log(error);
      }
    }
    fetchData();
  }, []);

  if(loading){
    return <p>Loading...</p>;
    }

  return (
    <>
      <h2>Simple Pagination</h2>
        <ul className="list">
          {currentPosts.map((post) => (<li key={post.id}>{post.id} - {post.title}</li>))}
        </ul>

        <div className="pagination">
          <button onClick={() => paginate(1)}>Start</button>
          <button disabled = {currentPage === 1} onClick={() => paginate(currentPage - 1)}>Pervious</button>
          {new Array(totalPages).fill(0).map((_, index) => {
            return <button className={currentPage === index+1 ? "active" : ""} onClick= {() => paginate(index + 1)} key={index + 1}>{index + 1}</button>
          })}
          <button disabled = {currentPage === totalPages} onClick={() => paginate(currentPage + 1 )}>Next</button>
          <button onClick={() => paginate(totalPages)}>End</button>
        </div>
  
    </>
  )
  
}

export default App;
