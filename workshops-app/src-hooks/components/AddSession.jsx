import React, { Component } from 'react';
import SessionsService from '../services/sessions.js';

class AddSession extends Component {
    state = {
        values: {
            sequenceId: 0,
            name: '',
            speaker: '',
            duration: 0,
            level: '',
            abstract: ''
        },
        errors: {
            sequenceId: [],
            name: [],
            speaker: [],
            duration: [],
            level: [],
            abstract: []
        }
    };

    isValid = () => {
        return Object.values( this.state.errors ).every( arr => arr.length === 0 );
    }

    validateForm = () => {
        const errors = {
            sequenceId: [],
            name: [],
            speaker: [],
            duration: [],
            level: [],
            abstract: []
        };

        // eslint-disable-next-line
        const { sequenceId, name, speaker, duration, level, abstract } = this.state.values;

        if( sequenceId === '' ) {
            errors.sequenceId.push( 'Sequence ID is required' );
            console.log( errors );
        }

        this.setState(
            ( curState ) => {
                return {
                    ...curState,
                    errors
                };
            }
        );
    }

    updateValues = ( event ) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        this.setState(
            ( curState ) => {
                return {
                    ...curState,
                    values: {
                        ...curState.values,
                        [inputName]: inputValue
                    }
                };
            },
            this.validateForm
        );
    }

    addSession = ( event ) => {
        event.preventDefault();

        SessionsService.addSession( this.state.values, this.props.match.params.id )
            .then(session => {
                alert( `The session has been added successfully (session id = ${session.id})` );
            })
            .catch( error => alert( `Something went wrong (${error.message})` ) );
    }

    render() {
        const { sequenceId, name, speaker, duration, level, abstract } = this.state.values;
        const {
            // eslint-disable-next-line 
            sequenceId: sequenceIdErrs,
            // eslint-disable-next-line
            name : nameErrs,
            // eslint-disable-next-line
            speaker: speakerErrs,
            // eslint-disable-next-line
            duration: durationErrs,
            // eslint-disable-next-line
            level: levelErrs,
            // eslint-disable-next-line
            abstract: abstractErrs
        } = this.state.errors;


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
                    <form noValidate onSubmit={this.addSession}>
                        <div className="form-group row">
                            <label htmlFor="sequenceId" className="col-sm-3 col-form-label">Sequence ID</label>
                            <div className="col-sm-9">
                                <input className={`form-control ${sequenceIdErrs.length === 0 ? 'is-valid' : 'is-invalid'}`} type="text" name="sequenceId" id="sequenceId" placeholder="" aria-describedby="sequenceHelpId" onChange={this.updateValues} value={sequenceId} />
                                <small id="sequenceHelpId" className="text-muted">Sequence ID is the serial number of the session in the workshop</small>
                                <small className="invalid-feedback">
                                    {sequenceIdErrs.map(error => <div key={error}>{error}</div>)}
                                </small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="name" id="name" placeholder=""  aria-describedby="NameHelpId" onChange={this.updateValues} value={name} />
                                <small id="NameHelpId" className="text-muted">The title of the session</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="speaker" className="col-sm-3 col-form-label">Speaker(s)</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="speaker" id="speaker" placeholder="" aria-describedby="speakerHelpId" onChange={this.updateValues} value={speaker} />
                                <small id="speakerHelpId" className="text-muted">The name of the speaker(s) for this session. Separate speaker names by a comma. Example <strong>John Doe, Jane Doe</strong>.</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="duration" className="col-sm-3 col-form-label">Duration</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" name="duration" id="duration" placeholder="" aria-describedby="durationHelpId" onChange={this.updateValues} value={duration} />
                                <small id="durationHelpId" className="text-muted">The length of the session in hours</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="level" className="col-sm-3 col-form-label">Level</label>
                            <div className="col-sm-9">
                                <select className="form-control" name="level" id="level" onChange={this.updateValues} value={level}>
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
                                <textarea type="number" className="form-control" name="abstract" id="abstract" aria-describedby="abstractHelpId" onChange={this.updateValues} value={abstract}></textarea>
                                <small id="abstractHelpId" className="text-muted">A brief description of the session topics</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-sm-3 col-sm-9">
                                <button type="submit" className="btn btn-primary mr-2" disabled={!this.isValid()}>Add session</button>
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