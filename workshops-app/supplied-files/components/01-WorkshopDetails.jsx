<div>
    <h2>
        {workshop.name}
    </h2>
    <hr />
    <div className="row my-4">
        <div className="col-4">
            <img className="img-fluid" src={workshop.imageUrl} alt={workshop.description} />
        </div>
        <div className="col-8">
            <div className="row">
                <div className="col-3">
                    <p>
                        <small>
                            <Moment interval={0} format="MMM D YYYY">
                                {workshop.startDate}
                            </Moment>
                            {" - "}
                            <Moment interval={0} format="MMM D YYYY">
                                {workshop.endDate}
                            </Moment>
                        </small>
                    </p>
                    <p>
                        <small className="text-muted">
                            {workshop.time}
                        </small>
                    </p>
                </div>
                <div className="col-3">
                    <p>
                        <small>Online</small>
                    </p>
                    <p>
                        <small>In person</small>
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-12" dangerouslySetInnerHTML={{__html: workshop.description}}></div>
            </div>
        </div>
    </div>
</div>