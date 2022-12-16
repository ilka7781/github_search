import React from 'react';
import './sidebar.scss';
import ReposList from "./reposList";
import {useSelector} from "react-redux";
import Loader from "../loader/loader";

const Sidebar = () => {
    const userRepos= useSelector(state => state.setUser.repos);
    const isFetching = useSelector(state => state.setUser.isFetching);

    return (
        <div className='sidebar'>
            <div className="sidebar_content_header">
                <p>Top Repositories</p>
            </div>
            {
                isFetching ? (
                    <Loader/>
                ) :  (
                    userRepos?.map(repo => (
                        <ReposList repo={repo}/>
                    ))
                )
            }
        </div>
    );
};

export default Sidebar;