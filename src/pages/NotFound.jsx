import { Link } from "react-router"
import "../styles/notFound.css"

const NotFound = () => {
    return (
        <main className="not-found-page">
            <section className="not-found-content">

                <p className="not-found-label">THIS PAGE DOES NOT EXIST</p>

                <h1>404<span>.</span></h1>

                <h2>Page not found</h2>

                <p className="not-found-description">The page you are looking for may have been moved, deleted, or the address may be incorrect.</p>

                <Link to="/" className="not-found-btn">Back to home →</Link>

            </section>
        </main>
    )
}

export default NotFound