import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import React from 'react'
// Welcome Component
// This component is used to welcome the user and allow them to create meeting
function Welcome(){


    // Fetch values from .env file and store in Context for reuse.
    const dyte_apiKey = React.createContext(process.env.REACT_APP_DYTE_API_KEY);
    const dyte_orgId = React.createContext(process.env.REACT_APP_DYTE_ORG_ID);
    const dyte_baseUrl = React.createContext(process.env.REACT_APP_DYTE_API_BASE_URL);

    // React Hook useNavigate() to allow navigation
    const navigate = useNavigate(); 
    // React Hook useState() to set Meeting Title
    const [title, setTitle] = useState('');
    // Handler to set Meeting Title in the variable
    const setTitleHandler = (e) => {
        setTitle(e.target.value);
    }

    const createMeetingHandler = async e => {
        const apiKEY = process.env.REACT_APP_DYTE_API_KEY;
        const orgID = process.env.REACT_APP_DYTE_ORG_ID;
        const baseURL = process.env.REACT_APP_DYTE_API_BASE_URL; 
      

        const meetingURL = `${baseURL}/v1/organizations/${orgID}/meeting`;
        const createMeetingResponse = await axios.post(meetingURL, { title: title || "New test meeting", }, { headers: { 'Authorization': `APIKEY ${apiKEY}` } });
        const meeting = createMeetingResponse.data.data.meeting;
        const meetingId = meeting.id;
        const roomName = meeting.roomName;

        navigate('/meeting', { state: { meetingId: meetingId, roomName: roomName } });
    }

    return (
        <div>
            <h1>: Welcome to Dyte :</h1>
            <input id='meetingTitleInput' onChange={setTitleHandler}/>
            <button id='createMeetingButton' onClick={createMeetingHandler}>Create Meeting</button>
        </div>
    )

}

export default Welcome