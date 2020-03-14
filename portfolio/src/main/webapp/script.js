// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['As a Man Thinkest, so is He', 'Failure is simply few errors in judgement, repeated everyday', 'Without sense of urgency, desire loses its value','If you really want to do something, you`ll find a way. If you don`t, you will find an excuse'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}
/* add a random quote to the page */
async function getRandomQuoteUsingAsyncAwait() {
  const response = await fetch('/random-quote');
  const quote = await response.text();
  document.getElementById('quote-container').innerText = quote;
}
function getMessages() {
  fetch('/data').then(response => response.json()).then((messages) => {

    console.log(messages);
    const messageList = document.getElementById('message-container');
    messageList.innerHTML = '';
    //loop through the json array
    for (let element in messages){
        var node = createListElement(messages[element]);
        messageList.appendChild(node);
    }
    });
}

//check whether user is logged in using async
async function checkUserLoginStatus() {
    const commentForm = document.getElementById('comment-form');
    const logInOutDiv = document.getElementById('logInOut');
  //set visibility of form and logurl to none
   commentForm.style.display="none";
   logInOutDiv.style.display="none";
  
  //get login status
  const response = await fetch('/login');
  const loginInfo = await response.json();

  //display form and logUrl based on whether user is logged in or not
  if(loginInfo.isLoggedIn === "true"){
      commentForm.style.display="block";
      logInOutDiv.innerHTML = '';
      logInOutDiv.appendChild(createLinkElement("Logout here",loginInfo.logUrl));
      logInOutDiv.style.display="block";
  }else{
      logInOutDiv.innerHTML = '';
      logInOutDiv.appendChild(createLinkElement("Login to Add Comments",loginInfo.logUrl));
      logInOutDiv.style.display="block";
  }
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}
/*Creates a <a> element containing text */
function createLinkElement(text,link) {
  const linkElement = document.createElement('a');
  linkElement.appendChild(document.createTextNode(text));
  linkElement.title = text;
  linkElement.href = link;
  return linkElement;
}
