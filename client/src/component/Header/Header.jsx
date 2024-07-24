import './Header.scss'
import { Avatar, Input } from "antd"
import { UserOutlined } from "@ant-design/icons";
import avatar from '../../assets/images/avatar.png'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../config/services/apiService';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const { Search } = Input

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Header = (props) => {
    const [initImage, setInitImage] = useState(null)
    const { logoutAuth } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            logoutAuth()
        } catch (error) {
            console.error("Failed to logout", error);
        }
    };

    axios.defaults.withCredentials = true;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/profile');
                setInitImage("http://localhost:5000/" + response.data.data[0].avatar)
                console.log("http://localhost:5000/" + response.data.data[0].avatar)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="header-container">
            <div className="header-group1">
                <h1>{props.title}</h1>
            </div>
            <div className="header-group2">
                <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} className='header-search' />
                <div className='header-profile'>
                    <Avatar className='' src={initImage ? initImage : avatar} size={64} icon={<UserOutlined />} />
                    <ul className="dropdown">
                        <li className="dropdown-item name">
                            <img className="dropdown-sellect" src={initImage ? initImage : avatar} alt="Name" />
                        </li>
                        <li className="dropdown-item myProfile">
                            <Link className="dropdown-item" to="/profile">
                                <i className="fa-regular fa-user"></i>
                                <span>MyProfile</span>
                            </Link>
                        </li>
                        <li className="dropdown-item logout" onClick={handleLogout}>
                            <a className="dropdown-item" id="logout">
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
