import React from 'react';
import './repos.scss';
import {RiGitRepositoryFill} from "@react-icons/all-files/ri/RiGitRepositoryFill";
import {RiStarSLine} from "@react-icons/all-files/ri/RiStarSLine";

const Repos = ({userss}) =>{

    return (
        <div className='userContainerRepo'>
            <div className='userRepo'>
                <div className='userRepo_header'>
                    <RiGitRepositoryFill/> <h1 className='userRepo_header_name'><a href={userss?.html_url} target="_blank">{userss?.name}</a></h1>
                    <span className='userRepo_header_visibility'>{userss?.visibility}</span>
                </div>
                <div className='userCards_container'>
                    <span className='userCards_container_description'>{userss?.description ? userss?.description : 'no description' }</span>
                </div>
                <div className="userCards_footer">
                    <span className="userCards_footer_lang">
                        {userss?.language}
                    </span>
                    <span className="userCards_footer_stars"><RiStarSLine/> {userss?.stargazers_count}</span>
                    <span className="userCards_footer_created">Last updated at {userss?.updated_at}</span>
                </div>
            </div>
        </div>
    );
};

export default Repos;