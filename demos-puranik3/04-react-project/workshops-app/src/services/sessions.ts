import axios from 'axios';
import ISession from '../models/ISession';

export type VoteType = 'upvote' | 'downvote';

const getSessionForWorkshopWithId = async ( id : string | number ) => {
    const response = await axios.get( `/workshops/${id}/sessions` );
    return response.data as ISession[];
};

const vote = async ( id : string | number, voteType: VoteType ) /*: Promise<ISession> */ => {
    const response = await axios.put( `/sessions/${id}/${voteType}` );
    return response.data as ISession;
};

const postSession = async ( session : Omit<ISession, 'id'> ) => {
    const response = await axios.post( `/sessions`, session );
    
    return response.data as ISession;
};

export {
    getSessionForWorkshopWithId,
    vote,
    postSession
};