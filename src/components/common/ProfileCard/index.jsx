import React, { useState, useMemo } from 'react';
import PostsCard from '../PostsCard';
import { getSingleStatus, getSingleUser } from '../../../api/FirestoreAPIs';
import { useLocation } from "react-router-dom";
import "./index.scss";

export default function ProfileCard({ currentUser, onEdit }) {
    let location = useLocation();
    const [allStatuses, setAllStatus] = useState([]);
    const [currentProfile, setCurrentProfile] = useState({});

    useMemo(() => {
        if (location?.state?.id) {
            getSingleStatus(setAllStatus, location?.state?.id);
        }

        if (location?.state?.email) {
            getSingleUser(setCurrentProfile, location?.state?.email);
        }
    }, []);

    return (
        <>
            <div className='profile-card'>
                <div>
                    <button onClick={onEdit} className='edit-btn'>Edit</button>
                </div>
                <div className='profile-info'>
                    <div>
                        <h3 className='userName'>
                            {Object.values(currentProfile).length === 0 
                                ? currentUser.name
                                : currentProfile?.name}
                        </h3>
                        <p className='heading-pc'>
                            {Object.values(currentProfile).length === 0
                                ? currentUser.headline
                                : currentProfile?.headline}
                        </p>
                        <p className='location'>
                            {Object.values(currentProfile).length === 0
                                ? currentUser.location
                                : currentProfile?.location}
                        </p>
                    </div>

                    <div className='right-info'>
                        <p className='college'>
                            {Object.values(currentProfile).length === 0
                                ? currentUser.college
                                : currentProfile?.college}</p>
                        <p className='company'>
                            {Object.values(currentProfile).length === 0
                                ? currentUser.company
                                : currentProfile?.company}</p>
                    </div>
                </div>
            </div>;
            <div className='post-status-main'>
                {allStatuses
                    .filter((item) => {
                        return item.userEmail === localStorage.getItem("userEmail")
                    })
                    .map((posts) => {
                        return (
                            <div key={posts.id}>
                                <PostsCard posts={posts} />
                            </div>
                        );
                    })};
            </div>
        </>
    );
};
