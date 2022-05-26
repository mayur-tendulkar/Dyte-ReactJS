# Integrate Dyte SDK in React JS  

## Introduction

In this guide, we will integrate Dyte SDK into React JS application which we will build from scratch.

The UI of the application looks something like as shown below. And you can find source code of this app here.

![Image to display application UI](https://dyte-assets.s3.ap-south-1.amazonaws.com/guides/dyte-integrate-reactjs/integrate-dyte-reactjs.gif)

## Pre-requisite

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

![Project structure UI](https://dyte-assets.s3.ap-south-1.amazonaws.com/guides/dyte-integrate-reactjs/integrate-dyte-reactjs-project-structure.png)

- Index.JS : To setup initial application and launch.
- App.JS : To setup application routes.
- Pages\Welcome.JS : Ask user for meeting tile and create meeting.
- Pages\Meeting.JS : Ask user to join as 'Host' or 'Participant'
- Pages\Lobby.JS : Launch meeting screen with user joined. Allow user to manage the meeting.

## Step 04: Create meeting
## Step 05: Add participants

## Step 06: Join meeting in the Lobby
## Step 07: Invite attendees

## Step 08: Launch & debug application