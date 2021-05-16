import React, {useContext, useState} from "react";
import {Link} from 'react-router-dom'
import Logo from '../../assets/img/logo.png';
import { topicContext } from "../../contexts/TopicContext";
import "./Header.css";

const Header = () => {
    const { search, searchData } = useContext(topicContext)
    const [searchValue, setSearchValue] = useState('')

    const handleValue = (e) => {
        setSearchValue(e.target.value);
        search(e.target.value)
    }
    return (
        <header>
            <div className="container">
                <div className="navbar">
                    <div className="navbar__logo">
                        <img src={Logo} alt="" />
                    </div>
                    <ul className="navbar__right">
                        <li><Link to="/"> Главная </Link></li>
                        <li>Документация</li>
                        <li><Link to="/add"> Добавить </Link></li>
                        <li className='search-item'>
                            <input onChange={handleValue} placeholder="Поиск" />
                            <div className={ searchValue ? 'search-result' : 'close' }>
                                {searchData.map(item => (
                                    <Link to={`/details/${item.id}`}>
                                        <div>{item.title}</div>
                                        
                                    </Link>
                                ))}
                            </div>
                        </li>
                        <li>GitHub</li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;