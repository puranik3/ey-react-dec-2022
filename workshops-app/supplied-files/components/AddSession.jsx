import React, { Component } from 'react';

class AddSession extends Component {
    render() {
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
                    <form>
                        <div className="form-group row">
                            <label htmlFor="sequenceId" className="col-sm-3 col-form-label">Sequence ID</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="sequenceId" id="sequenceId" placeholder="" aria-describedby="sequenceHelpId" />
                                <small id="sequenceHelpId" className="text-muted">Sequence ID is the serial number of the session in the workshop</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="name" id="name" placeholder=""  aria-describedby="NameHelpId" />
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
                                <button type="submit" className="btn btn-primary mr-2">Add session</button>
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