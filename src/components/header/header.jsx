import React, {useCallback} from 'react';
import './header.scss';
import {Link, useNavigate} from "react-router-dom";
import {AiFillGithub} from "@react-icons/all-files/ai/AiFillGithub";

import {searchUserRequest, setFoundUserRequest} from "../API/api";
import {useDispatch, useSelector} from "react-redux";





const Header = () => {
    const users = useSelector(state => state.searchUser.users.items);
    const setUser = useSelector(state => state.setUser.items);
    const dispatch = useDispatch();
    const currentPage =useSelector(state => state.setFoundUser.currentPage);
    const perPage =useSelector(state => state.setFoundUser.perPage);
    const [focused, setFocused] = React.useState(false);
    const onFocus = () => setFocused(true);
    const onBlur =() => setFocused(false);

    const debounce = (func) =>{
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer= setTimeout(()=> {
                timer = null;
                func.apply(context, args);
            }, 300);
        }
    }
    const debounceBlur = (func) =>{
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer= setTimeout(()=> {
                timer = null;
                func.apply(context, args);
            }, 400);
        }
    }
    const setFoundUser = (userLogin) =>{
        dispatch(setFoundUserRequest(userLogin,currentPage,perPage))
    }

    const handleChange =(event)=>{
        const searchQuery = event.target.value;
        if(searchQuery.length > 3){
            dispatch(searchUserRequest(searchQuery));

        }
    }
    const optimizedVersion = useCallback(debounce(handleChange),[]);
    const optimizedBlur = useCallback(debounceBlur(onBlur),[])

    const navigate = useNavigate();





    return (
        <nav className='header'>
            <div className='header_container'>
                <div>
                    <Link to='/'> <AiFillGithub/> </Link>
                </div>
                <div className='input_block'>
                    <div>
                        <input onBlur={optimizedBlur} onFocus={onFocus} className='header_container_input' onChange={optimizedVersion}
                               type="text" placeholder='Search user'/>
                        {
                            (users && users?.length !== 0) ? (
                                <div className={`dropdown ${focused? `active` : `inactive`}`}>
                                    <ul >
                                        {users?.map(u => (
                                                <li onClick={() => {
                                                    setFoundUser(u.login);
                                                    navigate('/userDetails')

                                                } } key={u.id} className='logins'>
                                                    <Link to='/userDetails' >{u.login}</Link>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ) : (
                                console.log('no users')
                            )
                        }
                    </div>
                </div>
                <div>
                    <img className='avatar' src={setUser?.avatar_url} alt=""/>
                </div>
            </div>

        </nav>
    );
};

export default Header;