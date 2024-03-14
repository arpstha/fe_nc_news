import React, { useEffect, useState } from "react";
import { getArticlesByID, patchArticleVote } from "../utils/api";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";


const ArticleCard = (params) => {
    const { article_id } = useParams();
    
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [patchError, setPatchError] = useState(false)
   
    
   
    useEffect(()=>{
        setIsLoading(true);
        getArticlesByID(article_id)
        .then((articlefromAPI)=>{
            setArticle(articlefromAPI);
            //separating date and time from time stamp (created_at)
            setDate(articlefromAPI.created_at.slice(0,10))
            setTime(articlefromAPI.created_at.slice(11,16))
            setIsLoading(false);
        })
    }, []);

    const increaseArticleVote = () => {
        setPatchError(false)
        setArticle((currArticle)=> {
            return {...currArticle, votes: currArticle.votes + 1}
        })
        patchArticleVote(article_id, 1)
        .catch((err)=>{
            setPatchError(true)
            setArticle((currArticle)=> {
                return {...currArticle, votes: currArticle.votes - 1}
            })
            
        })
    }
    
    const decreaseArticleVote = () => {
        setPatchError(false)
        setArticle((currArticle)=> {
            return {...currArticle, votes: currArticle.votes - 1}
        })
        patchArticleVote(article_id, -1)
        .catch((err)=>{
            setPatchError(true)
            setArticle((currArticle)=> {
                return {...currArticle, votes: currArticle.votes + 1}
            })
        })
    }

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
                <br/>
                <h5>{article.comment_count} comments</h5>
            </div>
            <div className="grid-column-2">
                <img src={article.article_img_url}  style={{width:'300px', height:'250px'}}/>
                <br/>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <button onClick={increaseArticleVote}>👍</button>
                <h5 style={{ margin: '0 10px' }}>Article Votes: {article.votes}</h5>
                <button onClick={decreaseArticleVote}>👎</button>
                </div>
                {patchError?<p>Something Went Wrong!</p>: null}
            </div>
            </div> 
            
            <CommentCard article_id={article_id} />
        </div>
        )
    }
    </>
}

export default ArticleCard