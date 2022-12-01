import React, { Component } from 'react';
import { addSession } from '../services/sessions';

class AddSession extends Component {
    state = {
        values: {
            sequenceId: '',
            name: ''
        },
        errors: {
            sequenceId: [],
            name: []
        },
        isValid: false
    };

    validate = () => {
        // eslint-disable-next-line
        const { sequenceId, name } = this.state.values;
        const sequenceIdErrs = [], nameErrs = [];
        let isValid = true;

        // sequenceId tests
        // must be number
        if( isNaN( parseInt( sequenceId ) ) ) {
            sequenceIdErrs.push( 'SequenceID must be a number' );
            isValid = false;
        }

        this.setState(
            curState => {
                return {
                    errors: {
                        sequenceId: sequenceIdErrs,
                        name: nameErrs
                    },
                    isValid
                };
            }
        );
    }

    updateValues = ( event ) => {
        const key = event.target.name;
        const value = event.target.value;

        this.setState(
            curState => {
                return {
                    values: {
                        ...curState.values,
                        [key]: value
                    }
                };
            },
            this.validate
        );
    }

    addSession = async ( event ) => {
        event.preventDefault();

        try {
            const sessionUpdated = await addSession( this.props.match.params.id, this.state.values );
            alert( 'New session has been added' );

            // Do the redirect using history.push( url ) to navigate user to /workshops/<id>
        } catch( error ) {
            alert( 'Something went wrong when trying to add session' );
        }
    }

    render() {
        const { sequenceId, name } = this.state.values;
        const { sequenceId : sequenceIdErrs, name : nameErrs } = this.state.errors;
        const isValid = this.state.isValid;

        return (
            <div className="container">
                <div className="row my-4">
                    <div className="col-12">
                        <h3>
                            Details of new session
                        </h3>
                        <hr />
                    </div>
                </div>
                <div className="col-12">
                    <form onSubmit={this.addSession}>
                        <div className="form-group row">
                            <label htmlFor="sequenceId" className="col-sm-3 col-form-label">Sequence ID</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="sequenceId" id="sequenceId" placeholder="" aria-describedby="sequenceHelpId" onChange={this.updateValues} value={sequenceId} />
                                <small id="sequenceHelpId" className="text-muted">Sequence ID is the serial number of the session in the workshop</small>
                                {
                                    sequenceIdErrs.map( error => <div>{error}</div> )
                                }
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="name" id="name" placeholder=""  aria-describedby="NameHelpId" onChange={this.updateValues} />
                                <small id="NameHelpId" className="text-muted">The title of the session</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="speaker" className="col-sm-3 col-form-label">Speaker(s)</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="speaker" id="speaker" placeholder="" aria-describedby="speakerHelpId" />
                                <small id="speakerHelpId" className="text-muted">The name of the speaker(s) for this session. Separate speaker names by a comma. Example <strong>John Doe, Jane Doe</strong>.</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="duration" className="col-sm-3 col-form-label">Duration</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" name="duration" id="duration" placeholder="" aria-describedby="durationHelpId" />
                                <small id="durationHelpId" className="text-muted">The length of the session in hours</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="level" className="col-sm-3 col-form-label">Level</label>
                            <div className="col-sm-9">
                                <select className="form-control" name="level" id="level">
                                    <option value="">-- Select the level of the session --</option>
                                    <option value="Basic">Basic</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="duration" className="col-sm-3 col-form-label">Abstract</label>
                            <div className="col-sm-9">
                                <textarea type="number" className="form-control" name="abstract" id="abstract"
                                aria-describedby="abstractHelpId"></textarea>
                                <small id="abstractHelpId" className="text-muted">A brief description of the session topics</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-sm-3 col-sm-9">
                                <button type="submit" className="btn btn-primary mr-2" disabled={!isValid}>Add session</button>
                                <button type="button" className="btn btn-danger">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddSession;