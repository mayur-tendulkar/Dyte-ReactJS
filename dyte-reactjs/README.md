# Integrate Dyte SDK in React JS  

Dyte has various SDKs available depending on the platforms. For example:

- Core SDK - Low-level yet easy to use Video SDK.
- React Core SDK - React Hooks based low-level yet easy to use Video SDK.
- React UI Kit - React components to build real-time communication user interfaces.
- Angular UI Kit - Angular components to build real-time communication user interfaces.
- Web Components UI Kit - Web Components based framework independent kit to build real-time communication user interfaces.

You can read more about this SDK on the [blog](https://blog.dyte.io/launching-new-dyte-web-sdk/) or [documentation](http://docs.dyte.io).

In this guide, we will integrate **React Core** and **React UIKit** SDK into **ReactJS** application which we will build from scratch.

The UI of the application looks something like as shown below. And you can find source code of this app [here]().

<img src="https://dyte-assets.s3.ap-south-1.amazonaws.com/guides/dyte-integrate-reactjs/integrate-dyte-reactjs.gif" alt="Image to display application UI" title="Image to display application UI" width="800"/>


## Pre-requisite

To build and run this application, make sure you have Node.js and React development tools installed.
If you are new to ReactJS, find information [here](https://reactjs.org/docs/getting-started.html).

Note: If you've downloaded the source code, replace or add values to `.env` file from [Dyte Developer Portal](https://dev.dyte.io/apikeys). To get an overiew of Dyte Developer Portal, watch this [YouTube Video](https://www.youtube.com/watch?v=uiHJTYXQCrI)

## Step 01: Create React application

Use `npx create-react-app dyte-reactjs` on Terminal to create an app called `dyte-reactjs`

This will create a folder on your machine with the same name i.e. `dyte-reactjs`. Open this folder in your favorite editor. We will use Visual Studio Code in this guide.

## Step 02: Install required packages

To build this project, we will need to install few dependencies. Install those using `npm-install` command as shown.

- Axios : `npm install axios`
- React Router Dom : `npm install react-router-dom`
- Dyte SDK (React Web Core and React UI Kit): `npm install @dytesdk/react-ui-kit @dytesdk/react-web-core`

## Step 03: Project structure

Once you create the React app, the project structure will look something like this:

<img src="https://dyte-assets.s3.ap-south-1.amazonaws.com/guides/dyte-integrate-reactjs/integrate-dyte-reactjs-project-structure.png" alt="Project structure UI" title="Project structure UI" width="800"/>

- Index.JS : To setup initial application and launch.
- App.JS : To setup application routes.
- Pages\Welcome.JS : Ask user for meeting tile and create meeting.
- Pages\Meeting.JS : Ask user to join as 'Host' or 'Participant'
- Pages\Lobby.JS : Launch meeting screen with user joined. Allow user to manage the meeting.

On each JavaScript page, import packages and components as required.
For example, below code sample is from `App.JS` which needs all components for routing purpose. Refer each file for its `imports`.

```javascript
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Welcome from './Pages/Welcome';
import Meeting from './Pages/Meeting';
import Lobby from './Pages/Lobby';
import Logo from '../dyte.svg'
```

Once, we imported all components, let's setup routing for this app using React Router in `App.js` file.

```javascript
<Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/meeting" element={<Meeting />} />
    <Route path="/meeting/:roomName/:meetingId" element={<Meeting />} />
    <Route path="/lobby" element={<Lobby/>}/>
</Routes>
```

## Step 04: Create meeting

<img src="https://dyte-assets.s3.ap-south-1.amazonaws.com/guides/dyte-integrate-reactjs/integrate-dyte-reactjs-welcome.png" alt="Welcome UI" title="Welcome UI" width="800" />

We use `Welcome.JS` file to create a React component called `Welcome` which allows users to create a Meeting.

```javascript
function Welcome(){

}
export default Welcome
```

To manage navivation, state etc, let's use React Hooks `useNavivate()` and `useState()`.  

```javascript
// React Hook useNavigate() to allow navigation
const navigate = useNavigate(); 
// React Hook useState() to set Meeting Title
const [title, setTitle] = useState('');
// Handler to set Meeting Title in the variable
const setTitleHandler = (e) => {
    setTitle(e.target.value);
}
```

This component returns HTML to allow user to enter meeting title and create meeting by clicking on a button. We will render this HTML in `return` block.

```javascript
<div class="App">
    <img src={Logo}/>
    <h1>: Welcome to Dyte :</h1>
    <input  id='meetingTitleInput' onChange={setTitleHandler} placeholder="Enter Meeting Title"/>
    <button id='createMeetingButton'  onClick={createMeetingHandler}>Create Meeting</button>
</div>
```

Creating a meeting is a simple HTTP call to Dyte backend API [Create Meeting](https://docs.dyte.io/api/#/operations/createMeeting). However, to call these APIs, you'll need to pass details which include `Organization ID`, `API Key` and `Base URL`. You can find the se details on Dyte Developer Portal. Copy these details and save it in `.env` file.

In `createMeetingHandler` let's read these values from `.env` file and use it to make a HTTP call.

On success (HTTP 200), we will use details from response and store in variables `meetingId` and `roomName`.
Also, after meeting is created, let's navigate the user to `Meeting' component.

```javascript
const createMeetingHandler = async e => {
    const apiKEY = process.env.REACT_APP_DYTE_API_KEY;
    const orgID = process.env.REACT_APP_DYTE_ORG_ID;
    const baseURL = process.env.REACT_APP_DYTE_API_BASE_URL; 
    

    const meetingURL = `${baseURL}/v1/organizations/${orgID}/meeting`;
    const createMeetingResponse = await axios.post(meetingURL, { title: title || "New test meeting", }, 
                                                                { headers: { 'Authorization': `APIKEY ${apiKEY}` } });
    const meeting = createMeetingResponse.data.data.meeting;
    const meetingId = meeting.id;
    const roomName = meeting.roomName;

    navigate('/meeting', { state: { meetingId: meetingId, roomName: roomName } });
}
```

## Step 05: Add participants

<img src="https://dyte-assets.s3.ap-south-1.amazonaws.com/guides/dyte-integrate-reactjs/integrate-dyte-reactjs-meeting.png" alt="Meeting created, add participant UI" title="Meeting created, add participant UI" width="800" />

Once the meeting is created, you can add participants in this meeting. Participants can have different roles or presets which you can define already. By default, 'host' or 'participant' roles are available. 
Adding a participant is nothing but calling a REST API [Add Participant](https://docs.dyte.io/api/#/operations/addParticipant).

Create a React component called `Meeting` in `Meeting.js` file and use following code.

```javascript
 const joinURL = `${baseURL}/v1/organizations/${orgID}/meetings/${meetingId}/participant`; 

    const joinParticipantHandler = async e => { 
        var participantResponse = await axios.post(joinURL, {
            // Use random ID for user to add in this meeting
            clientSpecificId: Math.random().toString(36).substring(7),
            userDetails: {
            // Provide details like name, profile URL
                "name": "Participant" + Math.random().toString(36).substring(2) }, }, {
            headers: {
                'Authorization': `APIKEY ${apiKEY}`
            }
        });
        
        const authResponse = participantResponse.data.data.authResponse;
        authToken = authResponse.authToken;

        navigate('/lobby', { state: { meetingId: meetingId, roomName: roomName, authToken: authToken, orgID: orgID } });
    }
```
In above code, on success (HTTP 200), we will navigate the user to lobby, where user can select preferred video and audio devices and join the meeting. 

## Step 06: Join meeting in the Lobby

<img src="https://dyte-assets.s3.ap-south-1.amazonaws.com/guides/dyte-integrate-reactjs/integrate-dyte-reactjs-lobby.png" alt="Meeting lobby UI" title="Meeting lobby UI" width="800" />

On this screen, we render `DyteClient` which represents a lobby (where users can wait, select preferred video & audio devices) and join the meeting room (actual meeting stage). 

Create a React components called `Lobby` in `Lobby.JS` file and use following code.

```javascript
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
```

In above code we initialize `DyteClient`. To actually render it, we `return` it in HTML code.

```javascript
return (<div>   
    <DyteMeeting meeting={client} class="Dyte" />
</div>);
```

## Step 07: Invite attendees

<img src="https://dyte-assets.s3.ap-south-1.amazonaws.com/guides/dyte-integrate-reactjs/integrate-dyte-reactjs-stage.png" alt="Meeting room UI" title="Meeting room UI" width="800" />

In the same `Lobby.JS` file, let's write code to set browser URL to something which can be shared as invite and people can join the same meeting.

```javascript
const meetingURL = '/meeting/' + roomName + '/' + meetingId;
window.history.pushState('', 'meeting', meetingURL);
```

## Step 08: Launch & debug application

React applications can be launched by command `npm start`. If everything is right and you have no compile errors, you should see the same output as shown below. You should be able to create a meeting, add participant and see the meeting room.

<img src="https://dyte-assets.s3.ap-south-1.amazonaws.com/guides/dyte-integrate-reactjs/integrate-dyte-reactjs.gif" alt="Image to display application UI" title="Image to display application UI" width="800"/>