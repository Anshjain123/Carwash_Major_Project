import React from 'react'
import "./ShowImage.css"

const ShowImage = ({ url }) => {
    return (
        <div className='showImage' >
            <img className='image_show' src={url}/>
        </div>
    )
}

export default ShowImage