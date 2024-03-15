import React from "react";
import {Link} from "react-router-dom";

const ErrorPage = () => {
 
    return <div className="article-list-container">
            <h2>Opps!!! you found an Empty page!</h2>
                <div className="article-box" >    
                        <h3>Please select Home or Topic from menu to go back.</h3>
                        <Link to='/'>Take me back</Link>
                </div>
        </div>
 
}

export default ErrorPage;