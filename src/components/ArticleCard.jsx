import React, { useEffect, useState } from "react";
import { getArticlesByID } from "../utils/api";
import { useParams } from "react-router-dom";

const ArticleCard = (params) => {
    const { article_id } = useParams();
    
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
   
    useEffect(()=>{
        setIsLoading(true);
       getArticlesByID(article_id)
        .then((articlefromAPI)=>{
            setArticle(articlefromAPI);
            setDate(articlefromAPI.created_at.slice(0,10))
            setTime(articlefromAPI.created_at.slice(11,16))
            setIsLoading(false);
        })
    }, []);


    return <>{isLoading ? (
        <div className="loading">
            <h2>Loading!!!</h2>
        </div>
    ) : (
        <div className="single-article-box">
            <h2>{article.title}</h2>
            <div className="grid-box">
            <div className="grid-column-1">
                <h4>{article.topic}</h4>
                <h5 >By {article.author} | {date} {time}</h5>

                <p  >{article.body}</p>
                <h5>{article.comment_count} comments</h5>
            </div>
            <div className="grid-column-2">
                <img src={article.article_img_url}  style={{width:'300px', height:'250px'}}/>
                <br></br>
                <h5>Votes: {article.votes}</h5>
            </div>
            </div>
        </div>
        )
    }
    </>
}

export default ArticleCard