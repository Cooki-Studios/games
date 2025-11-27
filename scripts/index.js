for (let i = 0; i < document.getElementsByClassName("games-grid-child").length; i++) {
    document.getElementsByClassName("games-grid-child")[i].onpointermove = (e) => {
        bannerHover(document.getElementsByClassName("games-grid-child")[i],e);
    }

    document.getElementsByClassName("games-grid-child")[i].onpointerup = (e) => {
        bannerHover(document.getElementsByClassName("games-grid-child")[i],e);
    }

    document.getElementsByClassName("games-grid-child")[i].onpointerleave = () => {
        bannerHoverEnd(document.getElementsByClassName("games-grid-child")[i]);
    }

    document.getElementsByClassName("games-grid-child")[i].onpointerdown = (e) => {
        bannerClick(document.getElementsByClassName("games-grid-child")[i],e);
    }
}



function bannerHover(el, e) {
    // Credit to https://codepen.io/technokami/pen/abojmZa
    el.style.transform = 'perspective(500px) scale(1.05) rotateX(' + -20 * ((e.layerY - el.clientHeight / 2) / el.clientHeight) + 'deg) rotateY(' + 20 * ((e.layerX - el.clientWidth / 2) / el.clientWidth) + 'deg)';
    el.style.zIndex = "3";
    el.style.setProperty('--after','perspective(200px) translateZ(0.15em)');
}

function bannerHoverEnd(el) {
    el.style.transform = 'perspective(500px) scale(1) rotateX(0deg) rotateY(0deg)';
    el.style.zIndex = "";
    el.style.setProperty('--after','perspective(500px) translateZ(0)');
}

function bannerClick(el, e) {
    el.style.transform = 'perspective(500px) scale(1.025) rotateX(' + -25 * ((e.layerY - el.clientHeight / 2) / el.clientHeight) + 'deg) rotateY(' + 25 * ((e.layerX - el.clientWidth / 2) / el.clientWidth) + 'deg)';
    el.style.setProperty('--after','perspective(500px) translateZ(0.025em)');
}