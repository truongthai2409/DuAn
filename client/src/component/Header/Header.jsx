import './Header.scss'
import { Avatar, Input } from "antd"
import { UserOutlined } from "@ant-design/icons";
import avatar from '../../assets/images/avatar.png'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../config/services/apiService';

const { Search } = Input

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Header = (props) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to logout", error);
        }
    };

    return (
        <div className="header-container">
            <div className="header-group1">
                <h1>{props.title}</h1>
            </div>
            <div className="header-group2">
                <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} className='header-search' />
                <div className='header-profile'>
                    <Avatar className='' src={avatar} size={64} icon={<UserOutlined />} />
                    <ul className="dropdown">
                        <li className="dropdown-item name">
                            <img className="dropdown-sellect" src={avatar} alt="Name" />
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
