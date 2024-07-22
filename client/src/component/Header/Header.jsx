import './Header.scss'
import { Avatar, Input } from "antd"
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import avatar from '../../assets/images/avatar.png'
import { logout } from '../../config/services/apiService';

const { Search } = Input

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Header = (props) => {
    const navigate = useNavigate();
    const { t } = useTranslation('profile');
    const { i18n } = useTranslation()

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
      }

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
                <div className="flex items-center justify-between mr-2">
                        <div className='flex items-center justify-center w-full'>
                            <button onClick={() => { changeLanguage('en') }}>
                                <img className='h-[20px] w-[40px] rounded-md' src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg" alt="" />
                            </button>
                            <p className='px-2'>|</p>
                            <button onClick={() => { changeLanguage('vi') }}>
                                <img className='h-[20px] w-[40px] rounded-md' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/225px-Flag_of_Vietnam.svg.png" alt="" />
                            </button>
                        </div>
                    </div>
                <div className='header-profile'>
                    <Avatar className='' src={avatar} size={64} icon={<UserOutlined />} />
                    <ul className="dropdown">
                        <li className="dropdown-item name">
                            <img className="dropdown-sellect" src={avatar} alt="Name" />
                        </li>
                        <li className="dropdown-item myProfile">
                            <Link className="dropdown-item" to="/profile">
                                <i className="fa-regular fa-user"></i>
                                <span>{t('profileTL')}</span>
                            </Link>
                        </li>
                        <li className="dropdown-item logout" onClick={handleLogout}>
                            <a className="dropdown-item" id="logout">
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <span>{t('logoutTL')}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
