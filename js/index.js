/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
document.getElementById("page-content").style.visibility = "hidden";
var input;
var numEmetteur;
var myText;
function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
function showNumberOfTheUser() {
    // document.getElementById("numUilisateur").innerHTML = input;
    //document.write(window.localStorage.getItem("numUser"));
    //console.log(window.localStorage.getItem("numUser"));
    return window.localStorage.getItem("numUser");
}
function validationRecepteur() {
    document.getElementById("numRecepteur").style.visibility = "hidden";
    document.getElementById("validationRecepteur").style.visibility = "hidden";
    document.getElementById("page-content").style.visibility = "visible";
}
// function to handle click on submit button
function verificationNumber() {
    var input = document.getElementById("numRecepteur").value;
    var format = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;


    // conditional statements

    if (input === '') {

        alert("Please Enter Phone Number")

    }

    else if (input.match(format)) {

        validationRecepteur();

    }
}
function handleClick() {

    // getting the reference of myPhone input

    var input = document.getElementById("num").value;

    // format for the phone number

    var format = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;


    // conditional statements

    if (input === '') {

        alert("Please Enter Phone Number")

    }

    else if (input.match(format)) {

        //alert("Phone Number: "+ input);
        console.log(input);
        window.localStorage.setItem("numUser", input);
        numeroDeTel = input;

    }

    else {

        alert("Type using correct format");

    }

}
async function getListMessage() {

    //let myURL = await fetch("https://munosutu.myhostpoint.ch/chatGetherApi.php");


    //document.getElementById("numEmetteur").value = myText[0].Message;
    /* numEmetteur = showNumberOfTheUser();
     console.log(numEmetteur);*/
     validationRecepteur();
    document.getElementById("numEmetteur").value = showNumberOfTheUser();
    let path = "https://munosutu.myhostpoint.ch/chatGetherApi.php" + "?numRecepteur=" + document.getElementById("numRecepteur").value + "&numEmetteur=" + showNumberOfTheUser();
    let myURL = await fetch(path);
    let myResponse = await myURL.text();
     myText = JSON.parse(myResponse);
    window.localStorage.setItem("message", myText);
    console.log(myText);
    showMessage();



}
function showMessage() {
    divWithAllMessage = document.getElementById("allMessage");
    let allMessage = window.localStorage.getItem("message");
    var message ="";
    for (let i = 0; i < myText.length; i++) {
        if (myText[i]["NumEmetteur"] == window.localStorage.getItem("numUser")) 
        {
            message += '<div class="media media-chat media-chat-reverse "><div class="media-body"><p>'+ myText[i]["Message"]+'</p><p class="meta"><time datetime="2018">23:58</time></p></div></div>';
                 
            
        }
        else{
            message += '<div class="media media-chat"><div class="media-body"><p>'+ myText[i]["Message"]+'</p><p class="meta"><time datetime="2018">23:58</time></p></div></div>';
             
        }

    }
    divWithAllMessage.innerHTML = message;

}

