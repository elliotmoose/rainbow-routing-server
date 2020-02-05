let RainbowSDK = require('rainbow-node-sdk');

// Define your configuration
let options = {
    "rainbow": {
        "host": "sandbox",                      
    },
    "credentials": {
        "login": "kyzelliot@gmail.com",  // To replace by your developer credendials
        "password": ",2}8ti5ILg~7"  // To replace by your developer credentials
    },
    // Application identifier
    "application": {
        "appID": "9d1acbc0475611ea819a43cb4a9dae9b", 
        "appSecret": "b55bLCAQxqrca0zi9V1VQDG4m9QTEXnXyQbQG7nQehrEaH9M576hwqgHdPtcNLt2", 
    },
    // Logs options
    "logs": {
        "enableConsoleLogs": false,              
        "enableFileLogs": false,
        "color": true,
        "level": "debug",
        "customLabel": "RainbowNodeSdk",
        "system-dev": {
            "internals": false,
            "http": false,
        }, // */
        "file": {
            "path": '/var/tmp/rainbowsdk/',
            "customFileName": "R-SDK-Node-",
            "zippedArchive" : false/*,
            "maxSize" : '10m',
            "maxFiles" : 10 // */
        }                
    },
    // IM options
    "im": {
        "sendReadReceipt": true   
    }
};

// instantiate the SDK
let rainbowSDK = new RainbowSDK(options);

// start the SDK
rainbowSDK.start().then(() => {        
    console.log("rainbow sdk has started");    
    // console.log(rainbowSDK.invitations.receivedInvitationsArray);
    // console.log(Object.keys(rainbowSDK.invitations));
    // console.log(rainbowSDK.invitations.getAllInvitationsNumber());
    // console.log(rainbowSDK.invitations.started);
    // console.log(rainbowSDK.invitations.invitationEventHandler = () => {
    //     console.log("NEW INVITATION");
    // });
    // console.log(rainbowSDK);
});

rainbowSDK.events.on('rainbow_onmessagereceived', (message) => {    
    console.log(message);
    // Check if the message is not from you
    if(!message.fromJid.includes(rainbowSDK.connectedUser.jid_im)) {
        // Check that the message is from a user and not a bot
        if( message.type === "chat") {
            // Answer to this user
            rainbowSDK.im.sendMessageToJid("hello! How may I help you?", message.fromJid);            
        }
    }
});


let createUser = (companyId) => {
    let userEmailAccount = "john.doe@sutdesc9.com";
    let userPassword = "Sutdesc9!";
    let userFirstname = "John";
    let userLastname = "Doe";

    rainbowSDK.admin.createUserInCompany(userEmailAccount, userPassword, userFirstname, userLastname).then((user) => {
        console.log("user created");

    }).catch((err) => {
        console.log(JSON.stringify(err));
    });

}
rainbowSDK.events.on("rainbow_onready", () => {
    
    // Get your account information
    let account = rainbowSDK.connectedUser;
    
    // console.log(Object.keys(account));
    // createUser(account.companyId);
    console.log(rainbowSDK.contacts.getAll());
    rainbowSDK.im.sendMessageToJid("hello! How may I help you?", "190000448fd446ff8b9f548ddadc499d@sandbox-all-in-one-rbx-prod-1.rainbow.sbg");
});

