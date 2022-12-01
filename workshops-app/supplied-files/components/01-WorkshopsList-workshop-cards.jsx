<div class="row">
    <div class="col-4 d-flex">
        <div class="card w-100 my-3 d-flex flex-column">
            <div class="card-body">
                <div class="card-img-container d-flex flex-column justify-content-center">
                    <img class="card-img-top w-50 d-block mx-auto" src="{workshop.imageUrl}" alt="{workshop.description}" />
                </div>
                <h4 class="card-title">{workshop.name}</h4>
                <div class="card-text">
                    <div>
                        <span>{workshop.startDate}</span> - <span>{workshop.endDate}</span>
                    </div>
                    <div>
                        <span>{workshop.time}</span>
                    </div>
                    <div class="my-3">
                        {workshop.description}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>