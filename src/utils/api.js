import axios from 'axios';

const ncNewsApi = axios.create({baseURL: 'https://nc-news-6vx3.onrender.com/api'})

export const getAllArticles = (topic) => {
    return ncNewsApi.get('/articles',{
        params : {topic: topic}
    })
    .then((response)=>{
        return response.data
    })
}

export const getArticlesByID = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}`)
    .then((response)=>{
        return response.data
    })
}

export const getCommentsByarticleId = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}/comments`)
    .then((response)=>{
        return response.data
    })

}

export const patchArticleVote = (article_id, vote) => {
    return ncNewsApi.patch(`/articles/${article_id}`,{inc_votes:vote})
    .then((response)=>{
        return response.data
    })
}

export const postCommentByArticle_id = (article_id, username, body) =>{
    return ncNewsApi.post(`/articles/${article_id}/comments`,{username: username, body: body})
    .then((response)=>{
        return response.data
    })
}

export const deleteCommentByComment_id = (comment_id) => {
    return ncNewsApi.delete(`/comments/${comment_id}`)
    .then((response)=>{
        return response.data
    })
}

export const getTopics = () => {
    return ncNewsApi.get(`/topics`)
    .then((response)=>{
        return response.data
    })
}
