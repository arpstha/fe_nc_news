import React, { useEffect, useState } from "react";
import {getAllArticles} from "../utils/api"
import { Link } from "react-router-dom";

const Homepage = () =>{

    const [articleList, setArticleList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortBy, setSortBy] = useState('date');
    const [desc, setDesc] = useState(true)
    

const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    setSortBy(selectedValue);
}
const toggleOrder = () => {
    setDesc(!desc)
}

    useEffect(()=>{
        setIsLoading(true);
        getAllArticles()
        .then((allArticles)=>{
            allArticles.forEach((article) => {
                //re-formating data and time 
                return article.created_at = (`${article.created_at.slice(0,10)} ${article.created_at.slice(11,16)}`) 
            })
            setArticleList(allArticles);
            setIsLoading(false);
        })
    }, []);
   
    useEffect(()=>{
        let sortedList = [...articleList]; 
        if (sortBy === "created_at") {
          desc? sortedList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) 
          : sortedList.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        }
        if (sortBy === "comment_count") {
          desc? sortedList.sort((a, b) => b.comment_count - a.comment_count) 
          : sortedList.sort((a, b) => a.comment_count - b.comment_count);
        }
        if (sortBy === "votes") {
          desc? sortedList.sort((a, b) => b.votes - a.votes) 
          : sortedList.sort((a, b) => a.votes - b.votes);
        }
        setArticleList(sortedList);
    },[sortBy,desc])

    return isLoading ? (
        <div className="loading">
            <h2>Loading!!!</h2>
        </div>
    ) : (
        <div className="article-list-container">
            <h2>All articles:</h2>

            <label htmlFor="sort-dropdown">Sort article by:</label> 
            <select name="sort-article" id="sort-article" onChange={handleSortChange}> 
                <option value="created_at">Date</option>
                <option value="comment_count">Comment Count</option> 
                <option value="votes">Votes</option> 
            </select>
            <label htmlFor="sort-lable">Article order:</label>
            <button onClick={toggleOrder}>
                {desc? 'Decending' : 'Acending'}
                </button> 

            {articleList.map((article, index) => (
                <div className="article-box" key={index}>
                    <Link to={`/article/${article.article_id}`}>
                        <h3>{article.title}</h3>
                    </Link>
                    <div className="article-details">
                        <p>Author: {article.author}</p>
                        <p>Topic: {article.topic}</p>
                        <p>Votes: {article.votes}</p>
                        <p>Comments Count: {article.comment_count}</p>
                        <p>Created at: {article.created_at}</p>           
                    </div>
                    <img src={article.article_img_url} alt="Article" />
                </div>
            ))}
        </div>
    );
}

export default Homepage;
