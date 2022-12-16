import React from 'react';
import './userDetailsRepos.scss';
import {RiGitRepositoryFill} from "@react-icons/all-files/ri/RiGitRepositoryFill";
import {RiStarSLine} from "@react-icons/all-files/ri/RiStarSLine";

const UserDetailsRepos = ({repo}) => {
    return (
        <div className='containerRepo'>
            <div className='repo'>
                <div className='repo_header'>
                    <RiGitRepositoryFill/> <h1 className='repo_header_name'><a href={repo?.html_url} target="_blank">{repo?.name}</a></h1>
                    <span className='repo_header_visibility'>{repo?.visibility}</span>
                </div>
                <div className='cards_container'>
                        <span className='cards_container_description'>{repo?.description ? repo?.description : 'no description' }</span>
                </div>
                <div className="cards_footer">
                    <span className="cards_footer_lang">
                        {repo?.language}
                    </span>
                    <span className="cards_footer_stars"><RiStarSLine/> {repo?.stargazers_count}</span>
                    <span className="cards_footer_created">Last updated at {repo?.updated_at}</span>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsRepos;