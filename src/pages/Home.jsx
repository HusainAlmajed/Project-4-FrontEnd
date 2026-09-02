import { Link } from "react-router"
import "../styles/home.css"

const Home = () => {
    return (
        <main className="home-page">

            {/* ================= HERO ================= */}

            <section className="home-hero">

                <div className="hero-content">

                    <p className="hero-label">
                        SIMPLE. ORGANIZED. SECURE.
                    </p>

                    <h1>
                        Your important
                        <span> records.</span>
                    </h1>

                    <p className="hero-description">
                        Keep warranties, rental agreements, documents and
                        property evidence organized and easy to find when
                        you need them.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            className="home-primary-btn"
                            to="/sign-up/customer"
                        >
                            Get started
                        </Link>

                        <Link
                            className="home-secondary-btn"
                            to="/sign-in"
                        >
                            Sign in
                        </Link>

                    </div>

                </div>


                <div className="hero-records">

                    <div className="record-card record-warranty">
                        <span>01</span>
                        <p>Warranties</p>
                    </div>

                    <div className="record-card record-agreement">
                        <span>02</span>
                        <p>Agreements</p>
                    </div>

                    <div className="record-card record-document">
                        <span>03</span>
                        <p>Documents</p>
                    </div>

                    <div className="record-card record-property">
                        <span>04</span>
                        <p>Property<br />Evidence</p>
                    </div>

                </div>

            </section>


            {/* ================= WHAT YOU CAN MANAGE ================= */}

            <section className="manage-section">

                <div className="section-heading">

                    <p className="section-label">
                        WHAT YOU CAN MANAGE
                    </p>

                    <h1>
                        One place for every
                        <span> important record</span>
                    </h1>

                    <p>
                        Built around the things people actually need
                        to keep track of.
                    </p>

                </div>


                <div className="manage-grid">

                    <div className="manage-card">

                        <div className="card-number">
                            01
                        </div>

                        <h3>Warranties</h3>

                        <p>
                            Keep product warranty and related
                            documents together.
                        </p>

                    </div>


                    <div className="manage-card">

                        <div className="card-number">
                            02
                        </div>

                        <h3>Agreements</h3>

                        <p>
                            Store rental agreements and keep
                            everything clear and accessible.
                        </p>

                    </div>


                    <div className="manage-card">

                        <div className="card-number">
                            03
                        </div>

                        <h3>Documents</h3>

                        <p>
                            Upload and organize important
                            documents in one secure place.
                        </p>

                    </div>


                    <div className="manage-card">

                        <div className="card-number">
                            04
                        </div>

                        <h3>Property Evidence</h3>

                        <p>
                            Save move-in and move-out photos
                            and property evidence.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= EVERYONE ================= */}

            <section className="everyone-section">

                <div className="section-heading everyone-heading">

                    <p className="section-label">
                        MADE FOR EVERYONE
                    </p>

                    <h2>
                        Thiqah works for
                        <span> both sides</span>
                    </h2>

                    <p>
                        Choose how you'll use Thiqah and we'll take
                        you to the right account.
                    </p>

                </div>


                <div className="role-grid">

                    <div className="role-card">

                        <p className="role-number">
                            01
                        </p>

                        <h3>
                            Customer / Tenant
                        </h3>

                        <h4>
                            Keep your records close
                        </h4>

                        <p>
                            Manage your warranties, agreements,
                            documents and property evidence
                            connected to you.
                        </p>

                        <Link
                            to="/sign-up/customer"
                            className="role-link"
                        >
                            Create customer account →
                        </Link>

                    </div>


                    <div className="role-card">

                        <p className="role-number">
                            02
                        </p>

                        <h3>
                            Owner / Business
                        </h3>

                        <h4>
                            Manage records with clarity
                        </h4>

                        <p>
                            Manage customers, rental agreements,
                            properties and the records connected
                            to them.
                        </p>

                        <Link
                            to="/sign-up/owner"
                            className="role-link"
                        >
                            Create owner account →
                        </Link>

                    </div>

                </div>

            </section>

        </main>
    )
}

export default Home