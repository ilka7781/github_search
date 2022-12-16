import React, {useEffect, useState} from 'react';
import './main.scss';
import {useDispatch, useSelector} from "react-redux";
import Repos from "../repositories/repos";
import Loader from "../loader/loader";
import {getUserRequest,sortRequestApiUser} from "../API/api";
import {BsFillPeopleFill} from "@react-icons/all-files/bs/BsFillPeopleFill";
import {BsDot} from "@react-icons/all-files/bs/BsDot";
import {HiOutlineBuildingOffice2} from "react-icons/hi2";
import {MdLocationPin} from "react-icons/md";
import {setCurrentPageAction} from "../reducers/reducers";
import {createPages} from "../utils.js/pagesCreator";



const Main = () => {
    const currentPage = useSelector(state => state.setUser.currentPage);
    const totalCount = useSelector(state => state.setUser.totalCount);
    const perPage = useSelector(state => state.setUser.perPage);
    const pagesCount = Math.ceil(totalCount/perPage);
    const setUserRepos= useSelector(state => state.setUser.repos);

    const [sort,setSort]=useState('');

    const dispatch = useDispatch();
    const pages = [];

    createPages(pages, pagesCount, currentPage);

    useEffect(()=>{
        dispatch(getUserRequest(currentPage,perPage));
    },[currentPage])

    const sortRequest = () => {
        dispatch(sortRequestApiUser(currentPage,perPage,sort));
    }



    const isFetching = useSelector(state => state.setUser.isFetching)
    const users = useSelector(state => state.setUser);



    return (
            <div className='mainUserDetails'>
                <div className="mainUserDetails_container">
                    <div className="mainUserAvatar">
                        <img className={'mainUserAvatar'} src={users?.items?.avatar_url} alt="avatar"/>
                        <h1 className={'mainUserAvatar_name'}> {users?.items?.name ? users?.items?.name : 'No name'}</h1>
                        <p className={'mainUserAvatar_login'}>{users?.items?.login}</p>
                        <p className={'mainUserAvatar_bio'}>{users?.items?.bio}</p>

                        <div className="mainUserAvatar_followers">
                            <span><BsFillPeopleFill/> <span className={'bold_count'}>{users?.items?.followers}</span>  followers </span>
                            <span><BsDot/> <span className={'bold_count'}> {users?.items?.following}</span> followings</span>
                        </div>

                        <div className={'userAvatar_location'}>
                            <p>
                                <HiOutlineBuildingOffice2/> {users?.items?.company ? users?.items?.company : ('no company')}
                            </p>
                            <p>
                                <MdLocationPin/> {users?.items?.location ? users?.items?.location : ('no location')}
                            </p>
                        </div>

                    </div>


                    <div className="mainUserRepos">
                        <div className="mainUserRepos_sort_block">
                            <button className="mainUserRepos_sort_block_btn" onClick={()=> {
                                setSort('updated');
                                if (sort === 'updated'){
                                    sortRequest();
                                }
                                sortRequest();

                            }}>Updated</button>
                            <button className="mainUserRepos_sort_block_btn" onClick={()=>{
                                setSort('created');
                                if (sort === 'created'){
                                    sortRequest();
                                }
                                sortRequest();
                            } }>Created</button>
                            <button className="mainUserRepos_sort_block_btn" onClick={()=>{
                                setSort('full_name');
                                if (sort === 'full_name'){
                                    sortRequest();
                                }
                                sortRequest();
                            }  }>Full name</button>
                            <button className="mainUserRepos_sort_block_btn" onClick={()=> {
                                setSort('pushed');
                                if (sort === 'pushed'){
                                    sortRequest();
                                }
                            } }>Pushed</button>
                        </div>
                        <div className="mainUserReposCards">
                            {
                                isFetching ? (
                                    <Loader/>
                                ) : (
                                    Object.values(setUserRepos)?.map((userss,index) => <Repos key={index} userss={userss}/>)
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

export default Main;