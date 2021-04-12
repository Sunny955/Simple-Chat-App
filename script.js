const socket = io('http://localhost:3000')

const messageForm=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");

const name = prompt('What is your name?')
appendMessage('You joined','left')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`,'left')
  var audio = new Audio('notify.wav');
  audio.play()
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`,'left')
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`,'right')
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`,'right')
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message,position) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement)
  
}