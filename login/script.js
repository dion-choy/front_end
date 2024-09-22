function revealLogin() {
    document.getElementById("goLogin").style.display = "none";
    document.getElementById("goRegister").style.display = "block";

    for (let i = 0; i < document.getElementsByClassName("hideLogin").length; i++) {
        document.getElementsByClassName("hideLogin")[i].style.display = "none";
    }

    document.getElementsByTagName("main")[0].style.backgroundPosition = "left";

    document.getElementById("confirmPassword").value = "null";

    form.className = "login";

    submitBtn.style.animation = "toLogin 0.4s";
    setTimeout(() => {
        submitBtn.innerText = "Log in";
        submitBtn.style.marginLeft = "0px";
        submitBtn.style.transform = "none";
        submitBtn.style.backgroundColor = "red";
    }, 350);
}

function revealRegister() {
    document.getElementById("goLogin").style.display = "block";
    document.getElementById("goRegister").style.display = "none";

    for (let i = 0; i < document.getElementsByClassName("hideLogin").length; i++) {
        document.getElementsByClassName("hideLogin")[i].style.display = "block";
    }

    document.getElementsByTagName("main")[0].style.backgroundPosition = "right";

    document.getElementById("confirmPassword").value = "";

    form.className = "register";

    submitBtn.style.animation = "toReg 0.4s";
    setTimeout(() => {
        submitBtn.innerText = "Sign up";
        submitBtn.style.marginLeft = "100%";
        submitBtn.style.transform = "translate(-100%)";
        submitBtn.style.backgroundColor = "cyan";
    }, 350);
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
    if (form.className == "register") {
        document.getElementById("confirmPassword").value = "";
    }
}

const submitBtn = document.getElementById("submit");
const form = document.getElementById("form");
