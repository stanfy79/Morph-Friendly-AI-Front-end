
import { Configuration, OpenAIApi } from 'openai'
import {process} from './env'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
const instructionObj = {
    role: 'system',
    content: "Am Morph friendly AI copilot. Am happy you could try out our blockchian. 😊"
}


const chatbotConversation = document.querySelector('.chatbot-conversation-container')
const userInput = document.getElementById('user-input');

function commands() {
    const questionSugg = this.textContent;
    const newSpeechBubbleContainer = document.createElement('div')
    const newSpeechBubbleImg = document.createElement('img')
    const newSpeechBubbleCopyIcon = document.createElement('img')
    const newSpeechBubble = document.createElement('div')
    newSpeechBubbleContainer.appendChild(newSpeechBubbleImg)
    newSpeechBubbleContainer.appendChild(newSpeechBubble)
    newSpeechBubbleContainer.appendChild(newSpeechBubbleCopyIcon)
    newSpeechBubbleContainer.classList.add('general-speech-container', 'speech-human')
    newSpeechBubbleCopyIcon.classList.add('copy-ai-text-icon')
    newSpeechBubble.classList.add('speech')
    chatbotConversation.appendChild(newSpeechBubbleContainer)
    newSpeechBubbleImg.setAttribute('src', '/assets/profile-icon.svg')
    newSpeechBubbleCopyIcon.setAttribute('src', '/assets/copy-icon.svg');
    newSpeechBubble.textContent = questionSugg
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight
}

var chatbotQuestion = document.querySelectorAll('.chatbot-quest-list');
for (var i = 0, len = chatbotQuestion.length; i < len; i++) {
    chatbotQuestion[i].onclick = commands;
}
 
document.addEventListener('submit', (e) => {
    e.preventDefault();
    
    fetchReply();
    const newSpeechBubbleContainer = document.createElement('div')
    const newSpeechBubbleImg = document.createElement('img')
    const newSpeechBubbleCopyIcon = document.createElement('img')
    const newSpeechBubble = document.createElement('div')
    newSpeechBubbleContainer.appendChild(newSpeechBubbleImg)
    newSpeechBubbleContainer.appendChild(newSpeechBubble)
    newSpeechBubbleContainer.appendChild(newSpeechBubbleCopyIcon)
    newSpeechBubbleContainer.classList.add('general-speech-container', 'speech-human')
    newSpeechBubble.classList.add('speech')
    newSpeechBubbleCopyIcon.classList.add('copy-ai-text-icon')
    chatbotConversation.appendChild(newSpeechBubbleContainer)
    newSpeechBubbleImg.setAttribute('src', '/assets/profile-icon.svg')
    newSpeechBubbleCopyIcon.setAttribute('src', '/assets/copy-icon.svg');
    newSpeechBubble.textContent = userInput.value;
    userInput.value = ''
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight
});

async function fetchReply() {
    const conversationArr = userInput;
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationArr,
    });

    renderTypewriterText(response.data.choices[0].message.content);
}

function renderTypewriterText(text) {
    const newSpeechBubbleContainer = document.createElement('div');
    const newSpeechBubbleImg = document.createElement('img');
    const newSpeechBubble = document.createElement('div');
    newSpeechBubbleContainer.appendChild(newSpeechBubbleImg);
    newSpeechBubbleContainer.appendChild(newSpeechBubble);
    newSpeechBubbleContainer.classList.add('general-speech-container', 'speech-ai');
    newSpeechBubbleImg.setAttribute('src', '/assets/TxnCLnvh-xIevxxfQ.jpeg');
    newSpeechBubble.classList.add('speech', 'ai-typing');
    chatbotConversation.appendChild(newSpeechBubbleContainer);
    let i = 0;
    const interval = setInterval(() => {
        
        if (text.length === i) {
            clearInterval(interval);
            newSpeechBubble.classList.remove('ai-typing');
            newSpeechBubble.textContent += text;
        }
        i++;
        chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
    }, 10);
}

    // const copyIcon = document.querySelectorAll('.copy-ai-text-icon')

    // await copyIcon.addEventListener('click', () => {
    //     alert(this.parentNode.textContent.document.execCommand("copy"))
    // })

    // Display news feed & hide 

    function newsFeed() {
        const newsBtn = document.querySelector(".news-feed-url")
        const newsFeedDisplay = document.querySelector(".news-feed-container")
        const newsCloseBtn = document.querySelector(".close-btn")

        newsBtn.addEventListener('click', () => {
            newsFeedDisplay.style.display = "block"
        })
        newsCloseBtn.addEventListener('click', () => {
            newsFeedDisplay.style.display = "none"
        })
    }
    newsFeed()


// change theme background, toggle button function 
const toggleBtn = document.querySelector('.checkbox')

toggleBtn.addEventListener('change', function() {
    if(this.checked) {
        document.documentElement.style.setProperty('--light-theme', 'black')
        document.documentElement.style.setProperty('--dark-text', '#fcfcfc')
        document.documentElement.style.setProperty('--medium-dark-theme', '#0f0e0e')
    } else {
        document.documentElement.style.setProperty('--dark-text', 'black')
        document.documentElement.style.setProperty('--light-theme', '#fcfcfc')
        document.documentElement.style.setProperty('--medium-dark-theme', '#fcfcfc')
    }
})
