import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type Props = {
    id: number | string
}

const AddSession = ( { id } : Props ) => {
    return (
        <div className="mt-5">
            <h2 className="d-flex align-items-center justify-content-between">
                <span>Add a session</span>
                <Link to={`/workshops/${id}`}>
                    <Button variant="primary">List of sessions</Button>
                </Link>
            </h2>
            <hr />
        </div>
    );
}
 
export default AddSession;