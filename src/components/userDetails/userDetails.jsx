import React, {useEffect, useState} from 'react';
import './userDetails.scss';
import Loader from "../loader/loader";
import {useDispatch, useSelector} from "react-redux";
import UserDetailsRepos from "./userDetailsRepos";
import {BsFillPeopleFill} from "@react-icons/all-files/bs/BsFillPeopleFill";
import {BsDot} from "@react-icons/all-files/bs/BsDot";
import {MdLocationPin} from "react-icons/md";
import {HiOutlineBuildingOffice2} from "react-icons/hi2";
import {setCurrentPageAction} from "../reducers/reducers";
import {getTopReposFoundUser, setFoundUserRequest, sortRequestApi} from "../API/api";
import {createPages} from "../utils.js/pagesCreator";


const UserDetails = () => {
    const [sort,setSort]=useState('');
    const setFoundUser = useSelector(state => state.setFoundUser);
    const isFetchingFound = useSelector(state => state.setFoundUser.isFetching);
    const setFoundUserRepos = useSelector(state => state.setFoundUser.repos);
    const currentPage = useSelector(state => state.setFoundUser.currentPage);
    const totalCount = useSelector(state => state.setFoundUser.totalCount);
    const perPage = useSelector(state => state.setFoundUser.perPage);
    const login = useSelector(state => state.setFoundUser.items.login);
    const dispatch = useDispatch();
    const pagesCount = Math.ceil(totalCount/perPage);
    const pages = [];

    createPages(pages, pagesCount, currentPage);

    useEffect(()=>{
        dispatch(setFoundUserRequest(login,currentPage,perPage));
    },[currentPage])

    const sortRequest = () => {
        dispatch(sortRequestApi(login,currentPage,perPage,sort));
    }
    return (
        <div className='userDetails'>
            <div className="userDetails_container">
                <div className="userAvatar">
                    <img className={'userAvatarImg'} src={setFoundUser?.items?.avatar_url} alt="avatar"/>
                    <h1 className={'userAvatar_name'}> {setFoundUser?.items?.name ? setFoundUser?.items?.name : 'No name'}</h1>
                    <p className={'userAvatar_login'}>{setFoundUser?.items?.login}</p>
                    <p className={'userAvatar_bio'}>{setFoundUser?.items?.bio}</p>

                    <div className="userAvatar_followers">
                        <span><BsFillPeopleFill/> <span className={'bold_count'}>{setFoundUser?.items?.followers}</span>  followers </span>
                        <span><BsDot/> <span className={'bold_count'}> {setFoundUser?.items?.following}</span> followings</span>
                    </div>

                    <div className={'userAvatar_location'}>
                        <p>
                            <HiOutlineBuildingOffice2/> {setFoundUser?.items?.company ? setFoundUser?.items?.company : ('no company')}
                        </p>
                        <p>
                            <MdLocationPin/> {setFoundUser?.items?.location ? setFoundUser?.items?.location : ('no location')}
                        </p>
                    </div>

                </div>


                <div className="userRepos">
                    <div className="userRepos_sort_block">
                        <button className="userRepos_sort_block_btn" onClick={()=> {
                            setSort('updated');
                            if (sort === 'updated'){
                                sortRequest();
                            }
                            sortRequest();

                        }}>Updated</button>
                        <button className="userRepos_sort_block_btn" onClick={()=>{
                            setSort('created');
                            if (sort === 'created'){
                                sortRequest();
                            }
                            sortRequest();
                        } }>Created</button>
                        <button className="userRepos_sort_block_btn" onClick={()=>{
                            setSort('full_name');
                            if (sort === 'full_name'){
                                sortRequest();
                            }
                            sortRequest();
                        }  }>Full name</button>
                        <button className="userRepos_sort_block_btn" onClick={()=> {
                            setSort('pushed');
                            if (sort === 'pushed'){
                                sortRequest();
                            }
                        } }>Pushed</button>
                    </div>
                    <div className="userDetailsCards">
                        {
                            isFetchingFound ? (
                                <Loader/>
                            ) : (
                                Object.values(setFoundUserRepos)?.map(repo => <UserDetailsRepos repo={repo}/>)
                            )
                        }
                    </div>
                    <div className="pages">
                        {pages.map((page, index) =>
                            <span className={currentPage === page ? 'currentPage page' : 'page'}
                                  onClick={()=> dispatch(setCurrentPageAction(page))} key={index}>
                                {page}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;