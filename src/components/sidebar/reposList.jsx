import React from 'react';
import './sidebar.scss';
import {RiGitRepositoryFill} from "@react-icons/all-files/ri/RiGitRepositoryFill";
const ReposList = ({repo}) => {
    return (
            <div className="sidebar_content">
                <div className='sidebar_content_repos'>
                    <p><a href={repo?.html_url}><RiGitRepositoryFill/>{repo?.name}</a></p>
                </div>
            </div>
    );
};

export default ReposList;