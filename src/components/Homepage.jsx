import React, { useEffect, useState } from "react";
import {getAllArticles} from "../utils/api"
import { Link } from "react-router-dom";

const Homepage = () =>{
    const [articleList, setArticleList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setIsLoading(true);
        getAllArticles()
        .then((allArticles)=>{
            setArticleList(allArticles);
            setIsLoading(false);
        })
    }, []);
    return isLoading ? (
        <div className="loading">
            <h2>Loading!!!</h2>
        </div>
    ) : (
        <div className="article-list-container">
            <h2>Recent articles:</h2>
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
                        
                        
                    </div>
                    <img src={article.article_img_url} alt="Article" />
                </div>
            ))}
        </div>
    );
}

export default Homepage;
