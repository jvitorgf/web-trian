import React from 'react'
import './newsbar.css'


function NewsBar() {
    return (
        <div className="newsbar">
            <strong className="title">Want news from Trian plus 10% off your first order?</strong>
            <input className="emailbar" type="text" placeholder="Enter your email" size="40"></input>
            <button type="submit"><i className="fas fa-envelope"></i></button>
        </div>
    )
}

export default NewsBar;