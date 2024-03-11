import axios from 'axios';

export const getAllArticles = () => {
    return axios.get('https://nc-news-6vx3.onrender.com/api/articles')
    .then((response)=>{
        return response.data
    })
}


