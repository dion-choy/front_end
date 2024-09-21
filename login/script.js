function revealLogin() {
    document.getElementById("goLogin").style.display = "none";
    document.getElementById("goRegister").style.display = "block";

    for (let i = 0; i < document.getElementsByClassName("hideLogin").length; i++) {
        document.getElementsByClassName("hideLogin")[i].style.display = "none";
    }

    document.getElementsByTagName("main")[0].style.backgroundPosition = "left";

    form.className = "login";

    submitBtn.innerText = "Log in";
    submitBtn.style.marginLeft = "0px";
    submitBtn.style.transform = "none";
    submitBtn.style.backgroundColor = "red";
}

function revealRegister() {
    document.getElementById("goLogin").style.display = "block";
    document.getElementById("goRegister").style.display = "none";

    for (let i = 0; i < document.getElementsByClassName("hideLogin").length; i++) {
        document.getElementsByClassName("hideLogin")[i].style.display = "block";
    }

    document.getElementsByTagName("main")[0].style.backgroundPosition = "right";

    form.className = "register";

    submitBtn.innerText = "Sign up";
    submitBtn.style.marginLeft = "100%";
    submitBtn.style.transform = "translate(-100%)";
    submitBtn.style.backgroundColor = "cyan";
}

function submitForm(event) {
    event.preventDefault();

    if (form.className == "login") {
        alert("login");
    } else if (form.className == "register") {
        alert("register");
    } else {
        alert("An error as occurred");
    }

    form.reset();
}

const submitBtn = document.getElementById("submit");
const form = document.getElementById("form");
