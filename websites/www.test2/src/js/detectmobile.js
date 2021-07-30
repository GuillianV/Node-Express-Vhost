
function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

export {detectMob}

function MobileOverflow(isActive = true) {

    if (detectMob() && isActive) {
        var x = document.querySelector("html");
        x.style.overflowX = "hidden"

        var y = document.querySelector("body");
        y.style.overflowX = "hidden"
    }else{
        var x = document.querySelector("html");
        x.style.overflowX = "initial"

        var y = document.querySelector("body");
        y.style.overflowX = "initial"
    }
}


export {MobileOverflow}


function MatchMedia() {
    if (window.matchMedia("(max-width: 560px)").matches) {
        return "560"
    } else if(window.matchMedia("(max-width: 960px)").matches) {
        return "960"
    } else{
        return "full"
    }
}

export {MatchMedia}