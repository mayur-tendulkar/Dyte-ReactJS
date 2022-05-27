# Integrate Dyte SDK in React JS  

## Introduction
In this guide, we will integrate Dyte SDK into React JS application which we will build from scratch. 

The UI of the application looks something like as shown below. And you can find source code of this app here. 

<img src="https://dyte-assets.s3.ap-south-1.amazonaws.com/guides/dyte-integrate-reactjs/integrate-dyte-reactjs.gif" alt="Image to display application UI" title="Image to display application UI" width="800"/>

## Pre-requisite:

To build and run this application, make sure you have NodeJS and React development tools installed. 
If you are new to React JS, find information [here](https://reactjs.org/docs/getting-started.html).

Note: If you've downloaded the source code, replace or add values to .env file from Dyte Developer Portal

## Step 01: Create React application

Use `npx create-react-app dyte-reactjs` on Terminal to create an app called `dyte-reactjs`

This will create a folder on your machine with same name `dyte-reactjs`. Open this folder in your favorite editor. 

## Step 02: Install required packages

We will use following NPM packages in this project. Install those using `npm-install` command as shown.

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
For example, below code sample is from `App.js` which needs all components for routing purpose.

```javascript
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Welcome from './Pages/Welcome';
import Meeting from './Pages/Meeting';
import Lobby from './Pages/Lobby';
import Logo from '../dyte.svg'
```
Let's setup routing for this app using React Router.

```javascript
<Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/meeting" element={<Meeting />} />
    <Route path="/meeting/:roomName/:meetingId" element={<Meeting />} />
    <Route path="/lobby" element={<Lobby/>}/>
</Routes>
```

## Step 04: Create meeting 

We use `Welcome.JS` file to create a React component called `Welcome` which allows users to create a Meeting.

```javascript
function Welcome(){

}
export default Welcome
```

This component returns HTML to allow user to enter meeting title and create meeting by clicking on a button.

```javascript
<div class="App">
    <img src={Logo}/>
    <h1>: Welcome to Dyte :</h1>
    <input  id='meetingTitleInput' onChange={setTitleHandler} placeholder="Enter Meeting Title"/>
    <button id='createMeetingButton'  onClick={createMeetingHandler}>Create Meeting</button>
</div>
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

Now, creating a meeting is a simple HTTP call to Dyte backend APIs. However, to call these APIs, you'll need to pass details which include Organization ID, API Key and Base URL. You can find these details on Dyte Developer Portal. Copy these details and save it in `.env` file.

In `createMeetingHandler` let's read these values from `.env` file and use it to make a HTTP call. 

On success (HTTP 200), we will use details from response and store in variables `meetingId` and `roomName` 

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


## Step 06: Join meeting in the Lobby

## Step 07: Invite attendees

## Step 08: Launch & debug application



