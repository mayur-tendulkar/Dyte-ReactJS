
import axios from "axios";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDyteClient } from "@dytesdk/react-web-core";
import { DyteMeeting } from "@dytesdk/react-ui-kit";


function Lobby() {
    const location = useLocation();
    const params = useParams();

    const meetingId = location.state['meetingId'];
    const roomName = location.state['roomName'];
    const authToken = location.state['authToken'];
    const orgID = location.state['orgID'];

    const[client, initClient] = useDyteClient();

    useEffect(() => {
        initClient({
            authToken: authToken,
            roomName: roomName,
            defaults: {
              audio: true,
              video: true,
            },
          });
    },[]) 

    const meetingURL = '/meeting/' + roomName + '/' + meetingId;
    window.history.pushState('', 'meeting', meetingURL);
    return (<div>   
        <DyteMeeting meeting={client} class="Dyte" />
        </div>);
}

export default Lobby