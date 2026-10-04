const title = document.getElementById("title");
const profile_div = document.getElementById("about_me_profile_div");
const about_div = document.getElementById("about_me_title_div");

const more_about_me_div = document.getElementById("more_about_me_div");
const about_me_text_2 = document.getElementById("more_text_2");

const passion_div = document.getElementById("about_passion_div");
const passion_text_2 = document.getElementById("passion_text_2");

function updateGUIElements() {
    const shrink = window.innerWidth <= 1300 || window.innerHeight <= 500;
    if (shrink) {
        title.style.justifyContent = "flex-start";
        profile_div.style.display = "none";
        more_about_me_div.style.alignItems = "center";
        passion_div.style.alignItems = "center";
        about_me_text_2.style.textAlign = "center";
        about_me_text_2.style.fontSize = "28px";
        about_me_text_2.style.width = "max(calc(100vw - 50px), 700px)";
        about_me_text_2.style.alignSelf = "center";
        passion_text_2.style.textAlign = "center";
        passion_text_2.style.fontSize = "28px";
        passion_text_2.style.width = "max(calc(100vw - 50px), 700px)";
        passion_text_2.style.alignSelf = "center";
    } else {
        title.style.justifyContent = "center";
        profile_div.style.display = "flex";
        passion_div.style.alignItems = "start";
        more_about_me_div.style.alignItems = "end";
        about_me_text_2.style.textAlign = "left";
        about_me_text_2.style.fontSize = "38px";
        about_me_text_2.style.width = "auto";
        about_me_text_2.style.alignSelf = "stretch";
        passion_text_2.style.textAlign = "left";
        passion_text_2.style.fontSize = "38px";
        passion_text_2.style.width = "auto";
        passion_text_2.style.alignSelf = "stretch";
    }
}

window.addEventListener('resize', () => {
    updateGUIElements();
});

window.visualViewport.addEventListener('resize', () => {
    updateGUIElements();
});
updateGUIElements();