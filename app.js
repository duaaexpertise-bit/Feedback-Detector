function tryDemo(){
    document
    .querySelector(".demo")
    .scrollIntoView({
        behavior:"smooth"
    });
}

function analyze(){

    let email =
    document.getElementById("email").value;

    let result =
    document.getElementById("result");

    if(email===""){
        result.innerHTML =
        "Please paste an email.";
        return;
    }

    result.innerHTML =
    `
    Tone: Positive<br>
    Confidence: 92%<br>
    AI Reply:
    Thank you for your feedback.
    `;
}
