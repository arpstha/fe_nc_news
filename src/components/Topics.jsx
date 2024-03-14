import React, { useEffect, useState } from "react";
import { getTopics } from "../utils/api";
import { Link } from "react-router-dom";

const Topics = () => {
    const [isLoading, setLoading] = useState(false)
    const [topics, setTopics] = useState([])

    useEffect(()=>{
        setLoading(true)
        getTopics()
        .then((data)=>{
            setTopics(data)
            setLoading(false)
        })
        .catch(()=>{
            setLoading(false)
        })

    },[])
   
    return <>{isLoading? <h2>Loading</h2> :
        <div className="topic-list-container">
            <h2>Please select a topic:</h2>
            {topics.map((topic, index) => (
                <div className="topic-box" key={index}>
                    <Link to={`/articles?topic=${topic.slug}`}>
                        <h3>{topic.slug}</h3>
                    </Link>
                    <br></br>
                        <p>About: {topic.description}</p>    
   
                </div>
            ))}

        </div>}

        </>
}

export default Topics;