import './index.css'
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router";


export function Navbar() {
    let navigate = useNavigate();
    const data = [
        {
            path: 'map',
            text: "Live",
            iconsUrl: 'live.png'
        },
        {
            path: 'report',
            text: "Report",
            iconsUrl: 'map.png'
        },
        {
            path: 'agents',
            text: "Agents",
            iconsUrl: 'insurance.png'
        }

    ]

    function logout() {
        localStorage.removeItem('token')
        navigate('/preview');
    }

    return (
        <div className="nav-wrapper">
            <nav>
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                key={index}
                                to={item.path}
                                className={({isActive}) => isActive ? 'activeStyle' : 'inactiveStyle'}>
                                <div className={'lower-end'}>
                                    <img src={`/icons/${item.iconsUrl}`}/>
                                </div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={'lower-end'}>
                <img src={'/icons/logout.png'} onClick={logout}></img>
            </div>
        </div>
    )
}
