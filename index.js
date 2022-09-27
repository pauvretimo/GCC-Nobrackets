
// crédit à Matt Smith : https://codepen.io/AllThingsSmitty
(function () {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    const eventday = '2022-11-26T10:00:00+02:00';

    const countDown = new Date(eventday).getTime(),
        x = setInterval(function() {

            const now = Date.now(),
                distance = countDown - now;

            // Change le jour
            const daysNode = document.getElementById("days")
            const days = (Math.floor(distance / (day))).toString()
            // change que s'il y a à changer pour ne pas avoir de pb d'animations
                if (daysNode.innerText !== days) {
                    const newDaysNode = document.createElement("span")
                    const daysText = document.createTextNode(days)
                    newDaysNode.setAttribute('id', 'days')
                    newDaysNode.appendChild(daysText)

                    //change l'enfant
                    const parentDaysDiv = daysNode.parentNode
                    parentDaysDiv.replaceChild(newDaysNode, daysNode)
                }


            // change les heures
            const hoursNode = document.getElementById("hours")
            const hours = (Math.floor((distance % (day)) / (hour))).toString()
            if (hoursNode.innerText !== hours) {
                const newHoursNode = document.createElement("span")
                const hoursText = document.createTextNode(hours)
                newHoursNode.setAttribute('id', 'hours')
                newHoursNode.appendChild(hoursText)

                const parentHoursDiv = hoursNode.parentNode
                parentHoursDiv.replaceChild(newHoursNode, hoursNode)
            }

            // change les minutes
            const minutesNode = document.getElementById("minutes")
            const minutes = (Math.floor((distance % (hour)) / (minute))).toString()
            if (minutesNode.innerText !== minutes) {
                const newMinutesNode = document.createElement("span")
                const MinutesText = document.createTextNode(minutes)
                newMinutesNode.setAttribute('id', 'minutes')
                newMinutesNode.appendChild(MinutesText)

                const parentMinutesDiv = minutesNode.parentNode
                parentMinutesDiv.replaceChild(newMinutesNode, minutesNode)
            }

            // change les secondes
            const secondsNode = document.getElementById("seconds")
            const seconds = (Math.floor((distance % (minute)) / second)).toString()
            if (secondsNode.innerText !== seconds) {

                const newSecondsNode = document.createElement("span")
                const secondsText = document.createTextNode(seconds)
                newSecondsNode.setAttribute('id', 'seconds')
                newSecondsNode.appendChild(secondsText)

                const parentSecondsDiv = secondsNode.parentNode
                parentSecondsDiv.replaceChild(newSecondsNode, secondsNode)
            
            }

            /*

            //do something later when date is reached
            if (distance < 0) {
                document.getElementById("headline").innerText = "It's my eventday!";
                document.getElementById("countdown").style.display = "none";
                document.getElementById("content").style.display = "block";
                clearInterval(x);
            }
            //seconds
             */
        }, 20)
}());

// vérifie si on est en pied de page
let anim = true
function scrollVerif() {
    const distance = window.scrollY
    document.getElementById("background").style.backgroundPositionY = (Math.floor(-distance/4)).toString() + 'px, ' + (Math.floor(-distance/4) + 800).toString() + 'px';
    if (distance + window.innerHeight < document.body.scrollHeight - 100) {
        // s'occupe de l'apparition du bouton scroll to top
        document.getElementsByClassName("imgForbidden")[0].classList.add('hide')
        // déclenche l'animation du logo gcc
        document.getElementsByClassName("imgForbidden")[0].classList.remove('animate')
        anim = true
    } else {
        document.getElementsByClassName("imgForbidden")[0].classList.remove('hide')
        if (anim) {
            document.getElementsByClassName("imgForbidden")[0].classList.add('animate')
        }
        anim = false
    }
}

// Permet de gérer les effets on scroll
window.addEventListener("scroll", function() {
    scrollVerif()
})

// vérifie on load l'orientation de l'écran pour opacifier le fond du texte
function portrait () {
    const w = window.innerWidth
    if (w < 1500) {
        const op = (Math.min(0.6, Math.max(0.6 - (w - 1000) * 5 / 5000, 0.1))).toString()
        const pad = Math.min(18, Math.max(1 + (w - 1000) * 17 / 500, 1))
        document.getElementById("portrait").style.background = "linear-gradient(90deg, rgba(0,0,0,0)" + (pad - 2).toString() + "%, rgba(0,0,0," + op + ")" + (pad - 3).toString() + "%, rgba(0,0,0," + op + ") " + (100 - pad + 3).toString() + "%, rgba(0,0,0,0) " + (100 - pad + 3).toString() + "%)"
        document.getElementById("textDiv").style.padding = "2%" + pad.toString() + "%"
    } else {
        document.getElementById("portrait").style.background = "linear-gradient(90deg, rgba(0,0,0,0) 15%, rgba(0,0,0,0.1) 15%, rgba(0,0,0,0.1) 85%, rgba(0,0,0,0) 85%)"
        document.getElementById("textDiv").style.padding = "2% 18%"
    }
}

// modifie l'arrière-plan du texte en fonction des modifications de l'orientation de l'écran
window.addEventListener("resize", function () {
    portrait()
})