<div className="container">
    <div class="row my-4">
        <div class="col-12">
            <h3>
                Sessions in this workshop
            </h3>
            <hr />
        </div>
        <div class="col-12">
            <ul class="list-group">
                {
                    sessions.map
                }
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-1">
                            <div class="d-flex flex-column align-items-center">
                                <i class="fa fa-caret-up"></i>
                                <span>{session.upvoteCount}</span>
                                <i class="fa fa-caret-down"></i>
                            </div>
                        </div>
                        <div class="col-11">
                            <div class="lead">{session.name}</div>
                            <div class="h6">by {session.speaker}</div>
                            <div>
                                <span class="badge">{session.level}</span>
                            </div>
                            <div class="my-2">
                                {session.duration} hours
                            </div>
                            <p>
                                {session.abstract}
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>