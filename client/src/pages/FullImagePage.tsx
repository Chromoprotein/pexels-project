import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import usePhoto from "../hooks/usePhoto.ts";

export default function FullImagePage() {
    const location = useLocation();
    const { largeUrl, alt, query, page } = location.state || {}; // Image data from state

    const { id } = useParams(); // Image id from URL

    const navigate = useNavigate();

    const { errorMessage, loading, photoSrc, setPhotoSrc, getPhoto } = usePhoto(largeUrl || "");

    useEffect(() => {
        if(!largeUrl) { // If we did not get the image src state from the URL, refetch it
            getPhoto(id);
        } else { // If we got the image src state from the URL, save it
            setPhotoSrc(largeUrl);
        }
    }, [id, getPhoto, largeUrl, setPhotoSrc])

    if(loading) return "Loading...";

    if(errorMessage) return <p>{errorMessage}</p>;

    // Handle "Go Back" button
    const handleGoBack = () => {
        if(query) {
            navigate(`/results?q=${encodeURIComponent(query)}&p=${page}`);
        } else {
            navigate("/");
        }
    };

    // Function to trigger download
    const handleDownload = async () => {
        try {
        const response = await fetch(photoSrc); // Fetch image data from the URL
        const blob = await response.blob(); // Convert into a binary large object (blob)
        const url = window.URL.createObjectURL(blob); // Create temprary local url that can be downloaded

        // Create an anchor element that is not shown on page
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'downloaded-image.jpg'; // Default download name
        document.body.appendChild(a);
        a.click(); // Simulate clicking the anchor element

        // Clean up after download
        window.URL.revokeObjectURL(url); 
        document.body.removeChild(a);
        } catch (error) {
        console.error('Error downloading the image:', error);
        }
    };

    return (
        <div className="container dark">
            <img 
                src={photoSrc} 
                className="imageFull" 
                alt={alt} 
            />
            <div className="flexbox centered bottomBar">
                <button onClick={handleDownload} className="button">
                    Download
                </button>
                <button className="button" onClick={handleGoBack}>Return</button>
            </div>
        </div>
    );
}