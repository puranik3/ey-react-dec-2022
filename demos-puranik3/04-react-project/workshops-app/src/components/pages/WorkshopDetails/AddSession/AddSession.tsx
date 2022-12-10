import { useRef, useState, FormEvent } from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
// import { ErrorMessage } from '@hookform/error-message';
import { postSession } from '../../../../services/sessions';
import ISession from '../../../../models/ISession';

type Props = {
    id: number | string;
};

const AddSession = ({ id }: Props) => {
    const { register, handleSubmit, formState : { errors } } = useForm({
        mode: 'all'
    })

    // const addSession = async ( values : Omit<ISession, 'id' | 'workshopId' | 'upvoteCount'> ) => {
    const addSession = async ( values : any ) => {
        const session = {
            workshopId: +id,
            upvoteCount: 0,
            ...values,
            sequenceId: +values.sequenceId,
            duration: +values.duration
        };

        try {
            const addedSession = await postSession(session);
            alert(
                `A new session with title ${addedSession.name} and id=${addedSession.id} has been created`
            );
        } catch (error) {
            alert((error as Error).message);
        }
    };

    const csvValidator = ( value : string ) => {
        return /^[A-Za-z ]+(,[A-Za-z ]+)*$/.test( value );
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
            <form onSubmit={handleSubmit(addSession)} noValidate>
                <div className="mb-3">
                    <label htmlFor="sequenceId" className="form-label">
                        Sequence ID
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="sequenceId"
                        {...register( 'sequenceId', { required: true, pattern: /^\d+$/, minLength: 4 } )}
                    />
                    {
                        /* errors.sequenceId is null if no error, else it is an object */
                        errors.sequenceId && (
                            <small className="text-danger">
                                {
                                    errors.sequenceId.type === 'required' && (
                                        'Sequence ID is required'
                                    )
                                }
                                {
                                    errors.sequenceId.type === 'pattern' && (
                                        'Sequence ID must be a number'
                                    )
                                }
                            </small>
                        )
                    }
                    {/* <ErrorMessage
                        errors={errors}
                        name="sequenceId"
                        render={({ message } : { message : string }) => <p>{message}</p>}
                    /> */}
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name of the session
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        {...register( 'name', { required: true } )}
                    />
                    <small className="text-danger">{}</small>
                </div>

                <div className="mb-3">
                    <label htmlFor="speaker" className="form-label">
                        Speaker
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="speaker"
                        {
                            ...register( 'speaker', { 
                                required: true,
                                validate : csvValidator
                            })
                        }
                    />
                    {
                        errors.speaker && (
                            <small className="text-danger">
                                {
                                    errors.speaker.type === 'required' && (
                                        'Speakers is required'
                                    )
                                }
                                {
                                    errors.speaker.type === 'validate' && (
                                        'Speakers can be only comma-separated values'
                                    )
                                }
                            </small>
                        )
                    }
                </div>

                <div className="mb-3">
                    <label htmlFor="level" className="form-label">
                        Level
                    </label>
                    <select
                        className="form-control"
                        id="level"
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
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="abstract" className="form-label">
                        Describe the session
                    </label>
                    <textarea
                        className="form-control"
                        id="abstract"
                    ></textarea>
                </div>

                <button className="btn btn-primary">Add session</button>
            </form>
        </div>
    );
};

export default AddSession;
