import axios from 'axios';

export const getAllArticles = () => {
    return axios.get('https://nc-news-6vx3.onrender.com/api/articles')
    .then((response)=>{
        return response.data
    })
}

export const getArticlesByID = (article_id) => {
    return axios.get(`https://nc-news-6vx3.onrender.com/api/articles/${article_id}`)
    .then((response)=>{
        return response.data
    })
}

export const getCommentsByarticleId = (article_id) => {
    return axios.get(`https://nc-news-6vx3.onrender.com/api/articles/${article_id}/comments`)
    .then((response)=>{
        return response.data
    })

}

export const patchArticleVote = (article_id, vote) => {
    return axios.patch(`https://nc-news-6vx3.onrender.com/api/articles/${article_id}`,{inc_votes:vote})
    .then((response)=>{
        return response.data
    })
}

