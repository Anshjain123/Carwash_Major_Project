import React from 'react'
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';


const CustomWebcam = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const navigate = useNavigate();


    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);


    const Retake = () => {
        setImgSrc(null);
    }

    const Submit =() => {
        navigate("/register"); 
        toast.success("Photo uploaded sucessfully!"); 
    }
    return (
        <div className="container">
            <Toaster/>
            {imgSrc ? (
                <img src={imgSrc} alt="webcam" />
            ) : (
                // <Webcam height={600} width={600} ref={webcamRef} />
                <input type="file" name="image" accept="image/*" capture="user"></input>
            )}
            <div className="btn-container" style = {{display:'flex'}}>
                <button onClick={capture}>Capture photo</button>
                <button onClick={() => Retake()}>Retake photo</button>

                {imgSrc && <button onClick={() => Submit()}>Submit photo</button>}
            </div>
        </div>
    )
}

export default CustomWebcam