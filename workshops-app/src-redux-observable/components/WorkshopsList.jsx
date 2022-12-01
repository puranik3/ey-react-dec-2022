import React from 'react';
import { Link } from 'react-router-dom';
import Alert from './utils/Alert';
import Pagination from './utils/Pagination';
import Moment from 'react-moment';

import {
    FETCHING_WORKSHOPS,
    FETCHED_WORKSHOPS,
    ERROR_FETCHING_WORKSHOPS
} from '../actions/constants';

import { fetchWorkshopsAC } from '../actions/creators';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './WorkshopsList.css';

const styles = {
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
};


class WorkshopsList extends React.Component {
    pageSize = 2;
    numPaginationItems = 2;

    getPaginationData() {
        const { total, currentPage, onPageChange } = this.props;
        return {
            total,
            currentPage,
            pageSize : this.pageSize,
            numPaginationItems: this.numPaginationItems,
            onPageChange
        };
    }

    render() {
        const { classes, workshops, status, error, showDescriptions, toggleDescriptions } = this.props;

        let el = null;

        switch( status ) {
            case FETCHING_WORKSHOPS:
                el = <Alert theme="primary" message="We are fetching list of workshops. Hang on!" />;
                break;
            case FETCHED_WORKSHOPS:
                console.log( '***' );
                
                el = (
                    <div className="row">
                        {
                            workshops.map(workshop => (
                                <div className="col-4 d-flex" key={workshop.id}>
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                            className={classes.media}
                                            image={workshop.imageUrl}
                                            title={workshop.description}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {workshop.name}
                                                </Typography>
                                                {
                                                    showDescriptions && (
                                                        <Typography variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={{__html: workshop.description}} />
                                                    )
                                                }
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                Share
                                            </Button>
                                            <Button size="small" color="primary">
                                                <Link to={`/workshops/${workshop.id}`} className="text-reset text-decoration-none w-100 my-3 d-flex flex-column">Learn More</Link>
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                );
                break;
            case ERROR_FETCHING_WORKSHOPS:
                el = <Alert theme="danger" message={error.message} />;
                break;
            default:
                el = null;
        }

        return (
            <div>
                <div className="clearfix">
                    <h1>
                        Workshops
                        <div className="float-right">
                            <button className="btn btn-sm btn-primary" onClick={toggleDescriptions}>
                                { showDescriptions ? 'Hide details' : 'Show details' }
                            </button>
                        </div>
                    </h1>
                </div>
                <hr />
                <div className="col-12 clearfix">
                    <Pagination {...this.getPaginationData()} className="float-right mb-2" />
                </div>
                {el}
            </div>
        );
    }

    componentDidMount() {
        this.props.fetchWorkshops( this.props.currentPage, this.pageSize );
    }

    componentDidUpdate( oldProps, oldState ) {
        if( oldProps.currentPage !== this.props.currentPage ) {
            this.props.fetchWorkshops( this.props.currentPage, this.pageSize );
        }
    }
}

export default withStyles(styles)( WorkshopsList );