# ignition-hacks


## Inspiration

## What it does

A user starts on the landing page, where they have the option to get started on their interview training. At first, they are directed to a screen where they can choose what type of question they want to practice. The difficulties are easy, medium, and hard, and there are four categories of questions:

- 
-
-
-

After they select the type of question, they are able to see the question, and once they are ready to start answering the question, they are able to start recording. They record their response


## How we built it

For the front-end, we used Figma to design the visual design of the prototype. After validating the design, we used React, JavaScript, and Tailwind CSS to design the front-end. The logic for the camera and audio capture was coded on the front-end in JS, and data was transferred to the backend via blob objects.

For the back-end, we built it in Flask using Python, integrating the Whisper AI API for speech-to-text and GPT-3.5-Turbo API with engineered prompts for generating feedback. In order to retrieve the data, it was necessary to send POST requests to the server, and the data was returned as strings.

In an effort to cloud-host our project, we deployed our front-end on Vercel, which makes calls to our back-end which is hosted on Google Cloud using the App Engine.

## Challenges we ran into

- deploying on google cloud
- converting the figma prototype to react (difficult design)
- parsing data without saving audio as files, we could not save variables because our backend was hosted on google cloud

## Accomplishments that we're proud of

- creating a front-end that looks visually appealing
- deploying both our front end on vercel and our back end on google cloud as an API
- improving our figma designing skills as a team

## What we learned

- how to convert the figma prototype to a visual design
- how to deploy to google cloud (unfamiliar with it)
- how to build full-stack web apps

## What's next for spleef.ai

- implementing face emotion recognition for interview tutoring on how to improve body language
- adding the option to reclarify feedback by chatting with an AI assistant
- adding functionality for technical interviews (coding problem feedback through AI tutors)