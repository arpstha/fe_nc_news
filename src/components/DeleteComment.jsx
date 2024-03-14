import React, {useContext, useState, useEffect} from "react";
import { UserContext } from "../contexts/User";
import { deleteCommentByComment_id } from "../utils/api";
import { CommentContext } from "../contexts/CommentList";



const DeleteComment = (params) => {
    const {commentList, setCommentList} = useContext(CommentContext)
  
    const { author, comment_id } = params
    const {user} = useContext(UserContext)

    const [sameAuthor, setSameAuthor] = useState(false)
    const [deleteError, setDeleteError] = useState(false)
    const [deletingOnProcess, setDeletingOnProcee] = useState(false)

   
    useEffect(()=>{
        if (author === user){
            setSameAuthor(true)
        }
    },[])
   
    const handleDelete = () =>{
        setDeletingOnProcee(true)
        setDeleteError(false)
        deleteCommentByComment_id(comment_id)
        .then(()=>{
        setDeletingOnProcee(false)
   
        const newList = []
        commentList.forEach((comment)=>{
            if(comment.comment_id !== comment_id){
                newList.push(comment)
            }
            
        })
        setCommentList(newList)
       })
       .catch(()=>{
        setDeletingOnProcee(false)
        setDeleteError(true)
       })
      
     
    }
    
    return <>
        {sameAuthor? <>{deletingOnProcess? <h5>Delete on process...</h5>:
                        <button className="delete-button" onClick={handleDelete}>Delete</button>}
                    </>
            : null }
            {deleteError?<h5 className="error">Couldn't delete comment, Try again.</h5> : null}
        </> 
}

export default DeleteComment;