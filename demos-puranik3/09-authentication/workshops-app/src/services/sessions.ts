import axios from 'axios';
import ISession from '../models/ISession';
import { KEY_TOKEN } from './auth';

export type VoteType = 'upvote' | 'downvote';

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem( KEY_TOKEN )}`
    }
});

const getSessionForWorkshopWithId = async ( id : string | number ) => {
    const response = await axios.get( `/workshops/${id}/sessions`, getHeaders() );
    return response.data as ISession[];
};

const vote = async ( id : string | number, voteType: VoteType ) /*: Promise<ISession> */ => {
    const response = await axios.put( `/sessions/${id}/${voteType}`, getHeaders() );
    return response.data as ISession;
};

const postSession = async ( session : Omit<ISession, 'id'> ) => {
    const response = await axios.post( `/sessions`, session, getHeaders() );
    
    return response.data as ISession;
};

export {
    getSessionForWorkshopWithId,
    vote,
    postSession
};