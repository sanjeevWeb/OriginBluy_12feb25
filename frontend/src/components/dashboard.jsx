import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedia } from "../slices/mediaSlice";
import MediaLayout from "../components/MediaLayout";
import UploadForm from "../components/UploadPage";

const Dashboard = () => {
    const dispatch = useDispatch();
    const media = useSelector((state) => state.media.media);

    useEffect(() => {
        dispatch(fetchMedia());
    }, [dispatch]);

    return (
        <div className="container mx-auto p-4">
            <UploadForm />
            <MediaLayout media={media} />
        </div>
    );
};

export default Dashboard;
