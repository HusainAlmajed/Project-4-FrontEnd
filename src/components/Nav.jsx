import {Link} from 'react-router'

const Nav = () => {

    return (
        <nav>
            <Link to="/">Home</Link> { '| ' }
            <Link to="/dashboard">Dashboard</Link>{ '| ' }
            <Link to="/sign-up/customer">Customer Sgin Up</Link>{ '| ' }
            <Link to="/sign-up/owner">Owner Sgin Up</Link>
        </nav>
    )

}

export default Nav