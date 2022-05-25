import axios from "axios";
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';

function Meeting() {

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    let meetingId = '';
    let roomName = '';
    let authToken = '';

    if (Object.keys(params).length >= 2) {
        meetingId = params['meetingId'];
        roomName = params['roomName'];
    }
    else { 
        meetingId = location.state.meetingId;
        roomName = location.state.roomName;
    }

    const apiKEY = process.env.REACT_APP_DYTE_API_KEY;
    const orgID = process.env.REACT_APP_DYTE_ORG_ID;
    const baseURL = process.env.REACT_APP_DYTE_API_BASE_URL;

    const joinURL = `${baseURL}/v1/organizations/${orgID}/meetings/${meetingId}/participant`; 

    const joinParticipantHandler = async e => { 
        var participantResponse = await axios.post(joinURL, {
            clientSpecificId: Math.random().toString(36).substring(7),
            userDetails: {
                "name": "Participant" + Math.random().toString(36).substring(2) }, }, {
            headers: {
                'Authorization': `APIKEY ${apiKEY}`
            }
        });
        
        const authResponse = participantResponse.data.data.authResponse;
        authToken = authResponse.authToken;

        navigate('/lobby', { state: { meetingId: meetingId, roomName: roomName, authToken: authToken, orgID: orgID } });
    }

    const joinHostHandler = async e => { 
        var hostResponse = await axios.post(joinURL, {
        clientSpecificId: Math.random().toString(36).substring(7),
        userDetails: {
            "name": "Host" + Math.random().toString(36).substring(2) }, }, {
        headers: {
            'Authorization': `APIKEY ${apiKEY}`
        }
    });
    
    const authResponse = hostResponse.data.data.authResponse;
    authToken = authResponse.authToken;

    navigate('/lobby', { state: { meetingId: meetingId, roomName: roomName, authToken: authToken, orgID: orgID } });
}

    return (<div>
        <h1>Welcome to Meeting Room: {roomName}</h1>
        <button id='joinHostButton' onClick={joinHostHandler}>Join as Host</button>
        <button id='joinParticipantButton' onClick={joinParticipantHandler}>Join as Participant</button>
    </div>);
}

export default Meeting