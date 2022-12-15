// sfc
const Home = () => {
    return (
        <div className="card bg-light p-5">
            <h1>Workshops App</h1>
            <hr />

            <p>
                The Workshops application serves details of (fictitious) technical workshops happening in various cities. Every workshop has a broad topic (eg. JavaScript), and a workshop has many sessions (each session covers a sub-topic, eg. Closures in JavaScript).
            </p>

            <p>
                You can view a list of workshops, details of every workshop, sessions in a workshop, and also add a new session for a workshop.
            </p>
        </div>
    );
}
 
export default Home;