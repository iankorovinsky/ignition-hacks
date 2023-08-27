# spleef.ai (Ignition Hacks 2023) 


## 💡 Inspiration Behind spleef.ai 🌍

At spleef.ai, our journey began with a simple question: What kind of challenge could we help aspiring professionals overcome? 🚀💼

We pondered over the obstacles that often stand in the way of interview success – the jitters, the uncertainty, and the lack of timely guidance. It struck us that there was an opportunity to bridge this gap with technology and innovation. 💡🔗

From this spark of inspiration, the concept of spleef.ai emerged – an interview assistant designed to provide real-time feedback on responses. We envisioned a tool that wouldn't just evaluate answers but would also nurture growth through personalized insights. 📝🌱

Our goal became clear: to create a companion that harnesses the power of AI to simulate real interview scenarios, offering an immersive practice ground. This would empower users to refine their interview skills and gain confidence, propelling them toward success. 🚀✨

As we embarked on this mission, the name "spleef.ai" naturally fell into place, signifying our fusion of speech (speak) and guidance (feedback). With unwavering determination, we set out to create an innovative solution that would revolutionize the interview preparation experience. 💬🗂️

Join us on this exciting journey as we fuse the prowess of AI with the aspirations of job seekers, redefining interview preparation into an uplifting and growth-inducing experience! 🚀🌱

## 🎙️ What spleef.ai does 🚀

A user starts on the landing page, where they have the option to get started on their interview training. At first, they are directed to a screen where they can choose what type of question they want to practice. The difficulties are easy, medium, and hard, and there are four categories of questions:

- Behavioural:  Ask about past experiences to assess skills and behavior
- Motivation and Fit: Ask about enthusiasm and cultural alignment
- Situational: Ask about hypothetical scenarios to evaluate decision-making
- Personal: Ask about personal interests and values

After they select the type of question, they are able to see the question, and once they are ready to start answering the question, they are able to start recording. They record their response, and their response is sent to our AI processes for parsing. After processing is complete, users can advance to the next page to view the feedback on their responses, particularly how they can improve their responses in the sections of:

- Professionalism: Did the response adhere to the rules of business etiquette?
- Creativity: Was the response detailed and include many different specifics?
- Clarity: Was the response clear?
- Originality: Was the response original and out-of-the-box?

Moreover, the AI provides a sample response that is better than what the user gave, showing the user what an improved response looks like, allowing them to see how they can improve. Once they have read their feedback, they can go back and try a new question!


## 💬 How we built spleef.ai 🛠️

For the front-end, we used Figma to design the visual design of the prototype. After validating the design, we used React, JavaScript, and Tailwind CSS to design the front-end. The logic for the camera and audio capture was coded on the front-end in JS, and data was transferred to the backend via blob objects.

For the back-end, we built it in Flask using Python, integrating the Whisper AI API for speech-to-text and GPT-3.5-Turbo API with engineered prompts for generating feedback. In order to retrieve the data, it was necessary to send POST requests to the server, and the data was returned as strings.

In an effort to cloud-host our project, we deployed our front-end on Vercel, which makes calls to our back-end which is hosted on Google Cloud using the App Engine.

## 🛠️ Challenges We Overcame at spleef.ai 🚧

The journey of building spleef.ai, our innovative interview assistant, was not without its fair share of challenges. Yet, through persistence and collaboration, we tackled each obstacle head-on and emerged stronger. Here are some hurdles we navigated:

### 🔌 Deploying on Google Cloud ☁️
Deploying our AI-powered interview assistant on Google Cloud presented a unique set of challenges. Ensuring seamless scalability, robust performance, and efficient resource allocation demanded a deep dive into cloud infrastructure management. With determination, we navigated this complex landscape, optimizing our deployment for a smooth user experience.

### 🔄 Converting Figma Prototype to React: Difficult Design 🎨
Translating our creative visions from a Figma prototype to a functional React application posed a formidable challenge. The intricacies of design integration and maintaining the visual essence while ensuring seamless user interactions were no small feat. Through iterative design refinements and meticulous coding, we transformed our ambitious designs into a user-friendly reality.

### 💾 Parsing Data without Saving Audio as Files 📊
One of the challenges we encountered was parsing interview audio data without the luxury of saving audio files due to backend constraints hosted on Google Cloud. This required us to engineer an elegant solution for processing and analyzing data on the fly, utilizing variables without relying on traditional file storage methods. We devised an efficient method to handle and glean insights from this real-time data flow.

## 🌟 Accomplishments We Celebrate at spleef.ai 🏆🎉

The journey of crafting spleef.ai has been adorned with numerous accomplishments that ignite our passion. Here are the milestones that stand as a testament to our dedication:

### 🎨 Visually Appealing Front-End Creation 🚀
One of our prime accomplishments is the creation of a visually captivating front-end interface. We embarked on a design journey that seamlessly blended aesthetics with user-friendliness. Through meticulous attention to detail and creative flair, we sculpted an interface that engages users and offers an immersive experience, making interview preparation an enjoyable endeavour.

### ☁️ Dual Deployment on Vercel and Google Cloud 🌐
Deploying both our front-end on Vercel and our back-end on Google Cloud as a seamless API showcases our technical prowess. This dual deployment not only ensures optimal performance but also reflects our dedication to providing a consistent experience to users across various platforms. Our achievement lies in the synchronization of these components, delivering a unified solution to our users.

### 💡 Elevating Figma Design Skills as a Team 🎨
As a team, we take pride in our journey of honing our Figma design skills. The evolution from our initial design drafts to the polished product signifies our commitment to growth and improvement. We embraced challenges, welcomed feedback, and iterated tirelessly, resulting in an elevated level of design proficiency that enhances the overall user experience.

## 🚀 Lessons Learned from spleef.ai's Journey 📚
The creation of spleef.ai, our trailblazing interview assistant, was not only an endeavour of innovation but also a profound learning experience. Throughout this odyssey, we gathered invaluable insights that shaped our skills and perspectives:

### 🔧 Converting Figma Prototype to Visual Design 🎨
Converting a Figma prototype into a functional visual design was a transformative lesson. The intricacies of maintaining the design's integrity while optimizing for user interactions necessitated a deep dive into design principles and front-end development. This process honed our eye for detail and highlighted the significance of user-centric design.

### ☁️ Deploying to Google Cloud: A New Horizon 🚀
Navigating the uncharted territories of Google Cloud deployment broadened our technical horizons. The challenges of ensuring scalability, efficiency, and robust performance in a cloud environment taught us the art of resource management and optimization. This experience paved the way for a better understanding of cloud infrastructure and its impact on user experiences.

### 🔗 Mastering Full-Stack Web App Development 🌐
The development of spleef.ai from concept to reality illuminated the path of full-stack web app construction. We delved into the intricacies of both front-end and back-end development, understanding how these components harmonize to create a seamless user journey. This holistic approach equipped us with the skills to create comprehensive, user-focused applications.

## 🌟 The Future of spleef.ai: Where Innovation Thrives! 💫
The journey of spleef.ai, our trailblazing interview assistant, is an ongoing saga of innovation and growth. As we stand at the crossroads of possibility, we're excited to share the thrilling next steps that await our project:

### 📷 Face Emotion Recognition for Enhanced Body Language Feedback 😃
Imagine a virtual interview tutor that not only evaluates your responses but also provides guidance on your body language and facial expressions. We're gearing up to implement face emotion recognition technology, enabling spleef.ai to offer insightful feedback on how to project confidence and professionalism through non-verbal cues. This holistic approach to interview preparation will set a new standard for comprehensive coaching.

### 🤖 Reclarify Feedback through AI-Powered Chat 💬
To foster a more interactive and personalized learning experience, we're introducing a chat functionality. This AI-powered chat assistant will allow users to delve deeper into their feedback, seek further explanations, and clarify doubts. This dynamic interaction will provide users with a platform for real-time learning and continuous improvement, ensuring that they're equipped with the knowledge they need to excel.

### 🔍 Technical Interview Support with AI Tutors 💻
Technical interviews can be a daunting challenge. That's why we're expanding spleef.ai's capabilities to encompass coding problem feedback through AI tutors. Whether you're navigating algorithms, data structures, or intricate coding challenges, spleef.ai will be there to guide you, providing insights to refine your problem-solving skills and excel in technical assessments.

As we embark on this exciting journey into the future, the core essence of spleef.ai remains unchanged – to empower individuals, nurture their growth, and pave their way to interview success. Through continuous innovation and a commitment to excellence, we're poised to redefine interview preparation as we know it. 

Join us as we revolutionize the art of mastering interviews with spleef.ai! 🚀🔮





