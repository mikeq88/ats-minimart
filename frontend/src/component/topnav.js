import { NavLink } from 'react-router-dom';

const TopNav = () => {
    return (
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark logo">
            <div className="container-fluid">
                <a className="navbar-brand mt-3 mb-3 ms-3 h1" href="/">
                    Minimart eStore
                </a>
            </div>

            <div className="navbar-nav me-5">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                        Admin
                    </NavLink>
                </li>
            </div>
        </nav>
    )
}

export default TopNav;