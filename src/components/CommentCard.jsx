import React, { useEffect, useState } from "react";
import { getCommentsByarticleId } from "../utils/api";
import PostComment from "./PostComment";
import DeleteComment from "./DeleteComment";
import { CommentContext } from "../contexts/CommentList";

const CommentCard = (params) => {
    const {article_id} = params
    const[commentList, setCommentList] = useState([])
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
 
    useEffect(()=>{
        getCommentsByarticleId(article_id)
        .then((commentsFromAPI)=>{
            setCommentList(commentsFromAPI)
            //separating date and time from time stamp (created_at)
            commentsFromAPI.map((comment)=>{
                setDate((curr)=>{
                    return [...curr, comment.created_at.slice(0,10) ]})
                setTime((curr)=>{
                    return [...curr, comment.created_at.slice(11,16) ]})
            })
          })
    },[])

    return <CommentContext.Provider value={{commentList : commentList, setCommentList: setCommentList}}>
            <PostComment commentList = {commentList} setCommentList = {setCommentList} article_id = {article_id}/>
            <div className="commnet-list-container">
                {commentList.map((comment, index) => (
                    <div className="comment-box" key={index}>
                        <div className="comment-details">
                            <h5>{comment.author} | {date[index]} {time[index]} </h5>
                            <p> {comment.body}</p>
                            <h5>Votes: {comment.votes}</h5>
                            <DeleteComment commentList = {commentList} setCommentList = {setCommentList} author = {comment.author} comment_id = {comment.comment_id}/>
                        </div>
                    </div>
                ))}
            </div>

        </CommentContext.Provider>
}

export default CommentCard