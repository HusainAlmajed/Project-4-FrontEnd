import { Link } from "react-router"

const Home = () => {
    return (
        <main>
            <section>

                <div>

                    <h1>Your important records</h1>

                    <p>keep warranties, rental agreements, documents and property evidence organized and east to find when you need them</p>

                    <div>
                        <Link to="/sign-up/customer">Get started</Link>

                        <Link to="/sign-in">Sign in</Link>
                    </div>
                </div>

                <div>
                    <p>Warranties</p>
                </div>

                <div>
                    <p>Agreements</p>
                </div>

                <div>
                    <p>Documents</p>
                </div>

                <div>
                    <p>Property <br /> Evidence</p>
                </div>

                <div>
                    <p>WHAT YOU CAN MANAGE</p>

                    <h1>One place for every important record</h1>

                    <p>Built around the things people actually need to keep track of</p>

                </div>

                <div>
                    <h3>Warranties</h3>
                    <p>Keep product warranty and related documents together</p>
                </div>

                <div>
                    <h3>Agreements</h3>
                    <p>Store rental agreements and keep everything clear and accessible</p>
                </div>

                <div>
                    <h3>Documents</h3>
                    <p>Upload and organize important documents in one secure place</p>
                </div>

                <div>
                    <h3>Property Evidence</h3>
                    <p>Save move-in and move-out photos and property evidence</p>
                </div>

            </section>

            <section>
                <div>
                    <p>MADE FOR EVERYONE</p>
                    <h2>Thiqah works for both sides</h2>

                    <p>Choose how you'll use Thiqah and we'll take you to the right account</p>
                </div>

                <div>
                    <h3>Customer / Tenant</h3>
                    <h4>Keep your records close</h4>
                    <p>Manage your warranties, agreements, documents and property evidence connected to you</p>
                </div>

                <div>
                    <h3>Owner / Business</h3>
                    <h4>Manage records with clarity</h4>

                    <p>Manage customers, rental agreements, properties and the records connected to them</p>
                </div>

            </section>

        </main>
    )
}

export default Home