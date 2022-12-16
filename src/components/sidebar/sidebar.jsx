import React from 'react';
import './sidebar.scss';
import ReposList from "./reposList";
import {useSelector} from "react-redux";

const Sidebar = () => {
    const userRepos = useSelector(state => state.setUser.repos);
    const foundRepos = useSelector(state => state.setFoundUser.repos);

    return (
        <div className='sidebar'>
            <div className="sidebar_content_header">
                <p>Top Repositories</p>
            </div>
            {
                (foundRepos && foundRepos?.length !== 0) ? (
                    foundRepos?.map(repo => (
                        <ReposList repo={repo}/>
                    ))
                ) : (
                    userRepos?.map(repo => (
                        <ReposList repo={repo}/>
                    ))
                )
            }
        </div>
    )
}
export default Sidebar;