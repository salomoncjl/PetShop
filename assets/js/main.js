import {createCarruHome,writeSponsorsHome} from './module/functions.js'

let slide = document.getElementById("slide")

let array2 = ["dog.jpg","pexels-adam-kontor-333083.jpg","pexels-kat-smith-551628.jpg","dog-ball.jpg"]

createCarruHome(array2,slide)

let slideTrack = document.getElementById("slide-track")

let array = ["dog-chow.png","dog-selection.png","dogui.png","kongo.jpg","pedigree.png","proplan.png","royal-canin.png","sabrocitos.png","whiscas.png","dog-chow.png","dog-selection.png","dogui.png","kongo.jpg","pedigree.png","proplan.png","royal-canin.png","sabrocitos.png","whiscas.png"]

writeSponsorsHome(array, slideTrack)