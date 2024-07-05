import './Header.css'
import { Avatar, Input } from "antd"
import { UserOutlined } from "@ant-design/icons";
import avatar from '../../assets/images/avatar.png'
import { Link, Navigate, useNavigate } from 'react-router-dom';

const { Search } = Input


const onSearch = (value, _e, info) => console.log(info?.source, value);

const Header = (props) => {
    // const navigate = useNavigate()
    return (
        <div className="header-container">
            <div className="header-group1">
                <h1>{props.title}</h1>
            </div>
            <div className="header-group2">
                <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} className='header-search'/>
                <Link to="/profile">
                    <Avatar src={avatar} size={64} icon={<UserOutlined />}/>
                </Link>

            </div>
        </div>
    )
}

export default Header