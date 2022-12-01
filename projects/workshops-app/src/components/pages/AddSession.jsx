import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';

import { postSession } from '../../services/sessions';

const AddSession = () => {
    const { id } = useParams();
    const history = useHistory();

    const [ name, setName ] = useState( '' );
    const [ sequenceId, setSequenceId ] = useState( '1' );
    const [ speaker, setSpeaker ] = useState( '' );
    const [ duration, setDuration ] = useState( '1' );
    const [ level, setLevel ] = useState( '' );
    const [ abstract, setAbstract ] = useState( '' );

    const [ nameError, setNameError ] = useState( '' );
    const [ sequenceIdError, setSequenceIdError ] = useState( '' );
    
    const [ isValid, setValid ] = useState( false );
    const [ isSubmitted, setSubmitted ] = useState( false );

    // if initial value of inputs is to be read from an API call
    // useEffect(() => {
    //     const response = await fetchFormData();
    //     setName( response.data.name ); // etc..
    // }, []);

    // validation for all inputs
    useEffect(() => {
        let isValid = true;

        const csvNames = /^[A-Za-z ]+(,[A-Za-z ]+)*$/;
        if( !csvNames.test( name ) ) {
            setNameError( 'You can give comma-separated names. Names can only have letters.' );
            isValid = false;
        } else {
            setNameError( '' );
        }

        const num = /^\d+$/;
        if( !num.test( sequenceId ) ) {
            setSequenceIdError( 'Sequence ID must be a number' );
            isValid = false;
        } else {
            setSequenceIdError( '' );
        }

        setValid( isValid );
    }, [ name, sequenceId ]);

    const addSession = async ( event ) => {
        // prevent browser submission of the form
        event.preventDefault();

        setSubmitted( true );

        const session = {
            workshopId: id,
            upvoteCount: 0,
            name,
            sequenceId: parseInt( sequenceId ),
            speaker,
            duration: parseFloat( duration ),
            level,
            abstract
        }

        try {
            const newSession = await postSession( session );
            alert( `A new session with id=${newSession.id} has been added` );
            history.push( `/workshops/${id}` );
        } catch( error ) {
            alert( error.message );
        }
    };

    return (
        <div className="my-3">
            <h3>Add a new session</h3>
            <hr />
            <Form onSubmit={addSession}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Name of the session"
                        value={name}
                        onChange={( event ) => setName( event.target.value )}
                        autoComplete="off"
                        isInvalid={isSubmitted && nameError !== ''}
                    />
                    <Form.Control.Feedback type="invalid">
                        {nameError}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="sequenceId">
                    <Form.Label>Sequence ID</Form.Label>
                    <Form.Control
                        type="number"
                        value={sequenceId}
                        onChange={( event ) => setSequenceId( event.target.value )}
                        isInvalid={isSubmitted && sequenceIdError !== ''}
                    />
                    <Form.Control.Feedback type="invalid">
                        {sequenceIdError}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control 
                        type="text"
                        value={speaker}
                        onChange={( event ) => setSpeaker( event.target.value )}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Duration (in hours)</Form.Label>
                    <Form.Control
                        type="number"
                        value={duration}
                        onChange={( event ) => setDuration( event.target.value )}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select
                        aria-label="Level fo the workshop"
                        value={level}
                        onChange={( event ) => setLevel( event.target.value )}
                    >
                        <option value="">Select the level of the session</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="asbtract">
                    <Form.Label>Abstract</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={abstract}
                        onChange={( event ) => setAbstract( event.target.value )}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={!isValid}>
                    Add session
                </Button>
            </Form>
        </div>
    );
}

export default AddSession;