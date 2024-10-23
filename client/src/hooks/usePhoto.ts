import { useState } from "react";
import { useCallback } from "react";
import axios from "axios";

export default function usePhoto(largeUrl: string) {

    // If the photo is missing, refetch it using the id
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [photoSrc, setPhotoSrc] = useState<string>(largeUrl || "");

    const getPhoto = useCallback(async (id) => {
        if(id) {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:5000/api/image", {
                    params: { 
                        id: id
                    },
                });
                console.log(response.data.src.original)
                setPhotoSrc(response.data.src.original);
            } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        }
    }, []);

    return { errorMessage, loading, photoSrc, setPhotoSrc, getPhoto }

}