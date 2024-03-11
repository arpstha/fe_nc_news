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
    return isLoading?(
        <div className="loading">
            <h2>Loading!!!</h2>
        
        </div>

    ) : 
    (
        <div className="articleList">
            <h2>Recent articles</h2>
            
                {articleList.map((article,index) => (
                    <div className="article" key={index}>
                     <Link to={`/article/${article.article_id}`} key={index}>
                        <h3 key={index}>{article.title}</h3>
                       </Link>
                       <img src={article.article_img_url} style={{width:'100px', height:'100px'}}/>
                        <li>Author: {article.author}</li>
                        <li>Topic: {article.topic}</li>
                        <li>Votes: {article.votes}</li>
                        <li>Comments Count: {article.comment_count}</li>
                        </div>
                     ))}
                    

        </div>
    )
}

export default Homepage;
