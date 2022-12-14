import { useRef, useState, FormEvent } from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { postSession } from '../../../../services/sessions';
import ISession from '../../../../models/ISession';

type Props = {
    id: number | string;
};

const AddSession = ({ id }: Props) => {
    const sequenceIdRef = useRef<HTMLInputElement>( null );
    const nameRef = useRef<HTMLInputElement>( null );
    const speakerRef = useRef<HTMLInputElement>( null );
    const levelRef = useRef<HTMLSelectElement>( null );
    const durationRef = useRef<HTMLInputElement>( null );
    const abstractRef = useRef<HTMLTextAreaElement>( null );

    const [sequenceIdErr, setSequenceIdErr] = useState("");
    const [nameErr, setNameErr] = useState("");

    const validateSequenceId = () => {
        let errorMessage = "";
        const value = sequenceIdRef.current?.value || '';

        if (value === "") {
            errorMessage += "Sequence ID is required";
        }

        if (value !== "" && !/^\d+$/.test(value)) {
            errorMessage += " Sequence ID must be a valid number";
        }

        setSequenceIdErr(errorMessage);

        return errorMessage === "";
    };

    const validateName = () => {
        let errorMessage = "";
        const value = nameRef.current?.value || '';

        if (value === "") {
            errorMessage += "Name is required";
        }

        setNameErr(errorMessage);

        return errorMessage === "";
    };

    const addSession = async ( event : FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        let isValid = true;

        isValid = validateSequenceId() && isValid;
        isValid = validateName() && isValid;

        if (isValid) {
            // sequenceIdRef.current is the reference to the underlying DOM node
            // NOTE: better to also call trim() on the value
            const session = {
                workshopId: +id,
                sequenceId: +(sequenceIdRef.current as HTMLInputElement).value,
                name: nameRef.current?.value,
                speaker: speakerRef.current?.value,
                duration: +(durationRef.current as HTMLInputElement).value,
                level: levelRef.current?.value,
                abstract: abstractRef.current?.value,
                upvoteCount: 0,
            } as Omit<ISession, 'id'>;

            try {
                const addedSession = await postSession(session);
                alert(
                    `A new session with title ${addedSession.name} and id=${addedSession.id} has been created`
                );
            } catch (error) {
                alert((error as Error).message);
            }
        }
    };

    /**
     * EXERCISE
     * @todo Convert the UI elements using React Bootstrap
     */
    return (
        <div className="container my-4">
            <div className="mt-5">
                <h2 className="d-flex align-items-center justify-content-between">
                    <span>Add a session</span>
                    <Link to={`/workshops/${id}`}>
                        <Button variant="primary">List of sessions</Button>
                    </Link>
                </h2>
                <hr />
            </div>
            <hr />
            <form onSubmit={addSession}>
                <div className="mb-3">
                    <label htmlFor="sequenceId" className="form-label">
                        Sequence ID
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="sequenceId"
                        ref={sequenceIdRef}
                        defaultValue="1"
                    />
                    <small className="text-danger">{sequenceIdErr}</small>
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name of the session
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        ref={nameRef}
                    />
                    <small className="text-danger">{nameErr}</small>
                </div>

                <div className="mb-3">
                    <label htmlFor="speaker" className="form-label">
                        Speaker
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="speaker"
                        ref={speakerRef}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="level" className="form-label">
                        Level
                    </label>
                    <select
                        className="form-control"
                        id="level"
                        ref={levelRef}
                        defaultValue="1"
                    >
                        <option value="">-- Select the level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">
                        Duration (in hours)
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="duration"
                        ref={durationRef}
                        defaultValue="1"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="abstract" className="form-label">
                        Describe the session
                    </label>
                    <textarea
                        className="form-control"
                        id="abstract"
                        ref={abstractRef}
                    ></textarea>
                </div>

                <button className="btn btn-primary">Add session</button>
            </form>
        </div>
    );
};

export default AddSession;
