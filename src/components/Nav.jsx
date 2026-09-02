import { Link, useNavigate } from 'react-router'
import { useState } from 'react'

import "../styles/nav.css"


const Nav = (props) => {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
        navigate('/')
    }
    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <>
            {/* Burger Button */}
            <button
                className="burger-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={closeMenu}
                ></div>
            )}

            {/* Sidebar */}
            <nav className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>

                <div className="sidebar-header">
                    <h2>Warranty</h2>

                    <button
                        className="sidebar-close"
                        onClick={closeMenu}
                    >
                        ×
                    </button>
                </div>

                {props.user ? (
                    <>

                        <div className="sidebar-user">
                            {props.user.profileImage ? (
                                <img
                                    src={props.user.profileImage}
                                    alt="Profile"
                                />
                            ) : (
                                <div className="sidebar-user-placeholder">
                                    {props.user.username?.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <div>
                                <strong>{props.user.username}</strong>
                                <span>{props.user.role}</span>
                            </div>
                        </div>

                        <div className="sidebar-links">

                            <Link
                                to="/"
                                className="sidebar-link"
                                onClick={closeMenu}
                            >
                                <span>⌂</span>
                                Home
                            </Link>

                            <Link
                                to="/dashboard"
                                className="sidebar-link"
                                onClick={closeMenu}
                            >
                                <span>▦</span>
                                Dashboard
                            </Link>

                            <Link
                                to="/agreements"
                                className="sidebar-link"
                                onClick={closeMenu}
                            >
                                <span>＋</span>
                                Add Agreement
                            </Link>

                            <Link
                                to="/user-profile"
                                className="sidebar-link"
                                onClick={closeMenu}
                            >
                                <span>♙</span>
                                Profile
                            </Link>

                            {props.user.role === "owner" ? (
                                <Link
                                    to="/agreements-list"
                                    className="sidebar-link"
                                    onClick={closeMenu}
                                >
                                    <span>▤</span>
                                    Agreement List
                                </Link>
                            ) : (
                                <Link
                                    to="/agreements-customer"
                                    className="sidebar-link"
                                    onClick={closeMenu}
                                >
                                    <span>▤</span>
                                    My Agreements
                                </Link>
                            )}

                        </div>

                        <div className="sidebar-bottom">

                            <button
                                className="sidebar-signout"
                                onClick={handleSignOut}
                            >
                                <span>↪</span>
                                Sign Out
                            </button>

                        </div>

                    </>
                ) : (

                    <div className="sidebar-links">

                        <Link
                            to="/"
                            className="sidebar-link"
                            onClick={closeMenu}
                        >
                            <span>⌂</span>
                            Home
                        </Link>

                        <Link
                            to="/sign-up/customer"
                            className="sidebar-link"
                            onClick={closeMenu}
                        >
                            <span>＋</span>
                            Customer Sign Up
                        </Link>

                        <Link
                            to="/sign-up/owner"
                            className="sidebar-link"
                            onClick={closeMenu}
                        >
                            <span>＋</span>
                            Owner Sign Up
                        </Link>

                        <Link
                            to="/sign-in"
                            className="sidebar-link"
                            onClick={closeMenu}
                        >
                            <span>→</span>
                            Sign In
                        </Link>

                    </div>
                )}

            </nav>
        </>
    )

}

export default Nav