import React, { useContext, useEffect, useState } from "react";
import { postCommentByArticle_id } from "../utils/api";
import { UserContext} from "../contexts/User";

const PostComment = (params) => {
    const { commentList, setCommentList, article_id } = params
    const {user, setUser} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
   
    const[newCommnet, setNewCommnet] = useState('')
    const[postError, setPostError] = useState(false)
    const[emptyComment, setEmptyComment] = useState(false)
 
    const handlePost = (event) => {
        console.log(newCommnet,"comments before post")
        event.preventDefault()
     
        if(newCommnet.length !==0){
            postCommentByArticle_id(article_id, user, newCommnet)
            .then((response)=>{
                setCommentList((curr)=>{
                    return [response, ...curr]
                
                })
                setNewCommnet('')
            })
            .catch((error)=>{
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
            setNewCommnet(event.target.value)} }></textarea>
        <br></br>
        <button type='submit'>Post</button>
        <br/>
        {emptyComment? <h5 className="error">Your comment is empty!</h5>: null }
        {postError? <h5 className="error">Opp!!! Something went wrong during posting your comment!</h5>: null }
    </form>
    </div>

  
}

export default PostComment