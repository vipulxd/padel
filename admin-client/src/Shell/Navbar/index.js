import './index.css'
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router";


export function Navbar() {
    let navigate = useNavigate();
    const data = [
        {
            path: 'map',
            text: "Live"
        },
        {
            path: 'report',
            text: "Report",

        },
        {
            path: 'agents',
            text: "Agents"
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
                                {item.text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={'btn-naked lower-end'}>
                <button style={{color: 'white', margin: 0}} onClick={logout}>LOGOUT</button>
            </div>
        </div>
    )
}
