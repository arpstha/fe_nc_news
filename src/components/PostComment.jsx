import React, { useContext, useEffect, useState } from "react";
import { postCommentByArticle_id } from "../utils/api";
import { UserContext} from "../contexts/User";
import { CommentContext } from "../contexts/CommentList";

const PostComment = (params) => {
    const {commentList, setCommentList} = useContext(CommentContext)
    const { article_id } = params
    const {user} = useContext(UserContext)
   
    const[newCommnet, setNewCommnet] = useState('')
    const[postError, setPostError] = useState(false)
    const[emptyComment, setEmptyComment] = useState(false)
    const[postSuccessful, setPostSuccessful] = useState(false)
    const[postLoading, setPostLoading] = useState(false)
 
    const handlePost = (event) => {
        event.preventDefault()
        setPostError(false)
        
        if(newCommnet.length !==0){
            setPostLoading(true)
            postCommentByArticle_id(article_id, user, newCommnet)
            .then((response)=>{
                setCommentList((curr)=>{
                    return [response, ...curr]
                
                })
                setNewCommnet('')
                setPostLoading(false)
                setPostSuccessful(true)
            })
            .catch((error)=>{
                setPostLoading(false)
                setPostError(true)
            })

        }
        else{
            setEmptyComment(true)
        }
        

        
    }
   

    return <div className="post-comment">
        <form onSubmit={handlePost} >
        <label htmlFor="comment-body">Enter your comment here: </label>
        <br/>
        <textarea style={{ width: '350px', height: '50px' }}  id="newCommnet" multiline="true" value={newCommnet} 
        onChange={(event)=>{
            setEmptyComment(false)
            setPostSuccessful(false)
            setNewCommnet(event.target.value)} }></textarea>
        <br></br>
        <button type='submit'>Post</button>
        <br/>
        {postLoading? <h5 >Posting... comment please wait.</h5>: null }
        {emptyComment? <h5 className="error">Comment field is empty!</h5>: null }
        {postError? <h5 className="error">Opp!!! Something went wrong during posting your comment!</h5>: null }
        {postSuccessful? <h5 >Your comment has been posted successfully.</h5>: null }
    </form>
    </div>

  
}

export default PostComment