const url = "https://api.api-ninjas.com/v1/dadjokes?limit=1"
const key = "xZG2k6LgkxSVwpbF/E+4Ug==QgOZY1insFiiVzkR"

let map = []

let landscapeImages = [
    ["landscapes/alps.png", "Fyfan vad kallt. Nu skyndar vi oss härifrån!"],
    ["landscapes/bamboo_bridge.webp", "Den här bron känns inte riktigt stadig."],
    ["landscapes/city_street.jpg", "Vad är det här för stad?"],
    ["landscapes/cliffs.webp", "Lite för högt för att hoppa ner."],
    ["landscapes/desert.webp", "Sand, sand, sand, bara massa sand."],
    ["landscapes/eiffel_tower.webp", "Farmor kanske är upp i Eiffeltornet?"],
    ["landscapes/flower_park.webp", "Jag kan ju plocka med mig några blommor."],
    ["landscapes/glacier.webp", "Är jag på Island nu helt plötsligt?"],
    ["landscapes/lavender_fields.webp", "Gud vad det luktar starkt!"],
    ["landscapes/london_eye.jpg", "Man ser nog bra om man åker högst upp i den där."],
    ["landscapes/old_street.webp", "Vart är jag nu då?"],
    ["landscapes/pedestrian_street.jpg", "Vädret är ju fint i alla fall."],
    ["landscapes/rainforest.webp", "Varmt, fuktigt och spindlar, vi skyndar oss igenom här!"],
    ["landscapes/river_in_front_of_mountain.webp", "Jaa, det var ju fin utsikt."],
    ["landscapes/rohan_plains.jpg", "Ingenting här."],
    ["landscapes/salt_desert.webp", "Dom där träden mår nog inte så bra."],
    ["landscapes/santorini_city.webp", "Jag kanske är nånstans i Grekland nu?"],
    ["landscapes/statue_of_liberty.jpg", "Inte konstigt att hon blev trött efter att ha stått så jävla länge."],
    ["landscapes/step_falls.webp", "Vart har dom de där ballongerna?"],
    ["landscapes/stone_beach.jpg", "Vattnet är varmt, kanske en badpaus?"],
    ["landscapes/street_corner.jpeg", "Det måste ju finnas ett café här nånstans."],
    ["landscapes/taj_mahal.jpg", "Farmor brukar gömma sig i Taj Mahal, så det är nog bäst att jag kollar."],
    ["landscapes/tree_garden.jpg", "Det prasslar bland träden, är det farmor eller en zombie?"],
    ["landscapes/valley.jpg", "Jaaa! Äntligen lite nerförsbacke!"],
    ["landscapes/waterfall.jpg", "Det var ju fint rätt fint här."]
]

mixLandscapes()

let zombieImages = [
    "zombies/minecraft_zombie1.png",
    "zombies/minecraft_zombie2.png",
    "zombies/minecraft_zombie3.png",
    "zombies/minecraft_zombie4.png",
    "zombies/minecraft_zombie5.png",
    "zombies/plant_zombie.webp"
]

let catImages = [
    "farmor.webp"
]

let landscapeCounter = 0
let zombieCounter = Math.floor(Math.random() * zombieImages.length)
let catCounter = Math.floor(Math.random() * catImages.length)

const rows = 5
const cols = 5

let zombieWalk = false
let displayZombie = false
let displayCat = false
let mapEvent = false
let lives = 3
let catsSaved = 0

let playerX = 0
let playerY = 0

let zombieX = Math.floor(Math.random() * (cols - 1)) + 1
let zombieY = Math.floor(Math.random() * (rows - 1)) + 1

let catX = Math.floor(Math.random() * (cols - 1)) + 1
let catY = Math.floor(Math.random() * (rows - 1)) + 1

//document.getElementById("playerX").innerHTML = playerX
//document.getElementById("playerY").innerHTML = playerY

//document.getElementById("zombieX").innerHTML = zombieX
//document.getElementById("zombieY").innerHTML = zombieY

//document.getElementById("catX").innerHTML = catX
//document.getElementById("catY").innerHTML = catY

//document.getElementById("lives").innerHTML = lives
document.getElementById("catssaved").innerHTML = catsSaved

let zombieImage = document.createElement("img")
zombieImage.src = "images/" + zombieImages[zombieCounter]
zombieImage.id = "currentzombieimage"
document.getElementById("graphics").appendChild(zombieImage)
zombieImage.style.display = "none"

let catImage = document.createElement("img")
catImage.src = "images/" + catImages[catCounter]
catImage.id = "currentcatimage"
document.getElementById("graphics").appendChild(catImage)
catImage.style.display = "block"

buildMap(rows, cols)

drawLives()

getJoke()


function getJoke() {
    fetch(url, {
        headers: { 'X-Api-Key': key }
    })
        .then(function (response) { return response.json() })
        .then(function (data) {
            data.map(function (d) {
                let p = document.createElement("p")
                p.setAttribute("id", "quoteparagraph")
                p.innerHTML = d.joke
                document.getElementById("quotesdiv").innerHTML = ""
                document.getElementById("quotesdiv").appendChild(p)
            })

        })
        .catch(function (error) {
            console.log("Something went wrong: " + error)
        })
}

function catNoises() {
    let noise = []
    if (playerX < catX) {
        noise.appendChild("east")
    }
    if (playerX > catX) {
        noise.appendChild("west")
    }
    if (playerY < catY) {
        noise.appendChild("south")
    }
    if (playerY > catY) {
        noise.appendChild("north")
    }

    if (noise.length == 1) {

    }
    else if (noise.length == 2) {

    }
    else {

    }
}

function mixLandscapes() {
    let currentIndex = landscapeImages.length
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [landscapeImages[currentIndex], landscapeImages[randomIndex]] =
            [landscapeImages[randomIndex], landscapeImages[currentIndex]];
    }
}

function drawLives() {
    let currentLives = document.getElementById("lives")
    while (currentLives.firstChild) {
        currentLives.removeChild(currentLives.lastChild)
    }

    for (let i = 0; i < lives; i++) {
        let newImage = document.createElement("img")
        newImage.src = "images/heart.webp"
        newImage.id = "heartimage"
        currentLives.appendChild(newImage)
    }
}

function gameOver() {
    let body = document.getElementById("body")
    body.innerHTML = ""

    let gameOverTitle = document.createElement("h1");
    gameOverTitle.innerHTML = "GAME OVER"

    let scoreTag = document.createElement("p")
    scoreTag.innerHTML = "Cats saved: "
    scoreTag.id = "scoretag"
    let finalScore = document.createElement("span")
    finalScore.innerHTML = catsSaved
    scoreTag.appendChild(finalScore)

    let restartButton = document.createElement("a")
    restartButton.innerHTML = "Try again?"
    restartButton.href = "index.html"

    body.appendChild(gameOverTitle)
    body.appendChild(scoreTag)
    body.appendChild(restartButton)
}

function respawnCat() {
    getJoke()
    catX = Math.floor(Math.random() * (cols - 1)) + 1
    catY = Math.floor(Math.random() * (rows - 1)) + 1

    while (catX == playerX && catY == playerY) {
        catX = Math.floor(Math.random() * (cols - 1)) + 1
        catY = Math.floor(Math.random() * (rows - 1)) + 1
    }
    //document.getElementById("catX").innerHTML = catX
    //document.getElementById("catY").innerHTML = catY

    if (catCounter < catImages.length - 1) {
        catCounter++
    }
    else {
        catCounter = 0
    }
    catImage.src = "images/" + catImages[catCounter]
}

function moveZombie() {
    if (zombieWalk) {
        let xDistance = zombieX - playerX
        let yDistance = zombieY - playerY

        if (Math.abs(xDistance) > 0 && Math.abs(xDistance) >= Math.abs(yDistance)) {
            xDistance < 0 ? zombieX++ : zombieX--
            //document.getElementById("zombieX").innerHTML = zombieX
            event = true
        }
        else if (Math.abs(yDistance) > 0) {
            yDistance < 0 ? zombieY++ : zombieY--
            //document.getElementById("zombieY").innerHTML = zombieY
        }
        zombieWalk = false
    }
    else {
        zombieWalk = true
    }
}

function buildMap(rows, cols) {
    document.getElementById("map").innerHTML = ""
    let table = document.createElement("table")

    for (let i = 0; i < rows; i++) {
        let row = document.createElement("tr")
        for (let j = 0; j < cols; j++) {
            let data = document.createElement("td")

            if (playerX == zombieX && playerY == zombieY && playerX == catX && playerY == catY && i == playerY && j == playerX) {
                displayZombie = true
                displayCat = true
                data.style.backgroundColor = "darkmagenta"
                document.getElementById("eventinfo").innerHTML = "Du hittade farmor, men en zombie attackerar dig, du måste lura bort zombien!"
                lives--
                zombieWalk = false
                //document.getElementById("lives").innerHTML = lives
                drawLives()
                if (lives < 1) {
                    gameOver()
                }
                mapEvent = true
            }
            else {
                if (playerX == zombieX && playerY == zombieY && i == playerY && j == playerX) {
                    displayZombie = true
                    data.style.backgroundColor = "red"
                    document.getElementById("eventinfo").innerHTML = "En zombie attackerar dig! Du lyckas smälla till den med ett basebollträ och springa iväg. Men du förlorar ett liv!"
                    lives--
                    zombieWalk = false
                    //document.getElementById("lives").innerHTML = lives
                    drawLives()
                    if (lives < 1) {
                        gameOver()
                    }
                    mapEvent = true
                }
                else if (playerX == catX && playerY == catY && i == playerY && j == playerX) {
                    displayCat = true
                    data.style.backgroundColor = "chartreuse"
                    document.getElementById("eventinfo").innerHTML = "Du hittade farmor! Men hon är snabb, så fort du kollar bort så har hon sprungit iväg, nu måste du hitta henne igen!"
                    catsSaved++
                    document.getElementById("catssaved").innerHTML = catsSaved
                    mapEvent = true
                    respawnCat()
                }
                else if (catX == zombieX && catY == zombieY && i == catY && j == catX) {
                    data.style.backgroundColor = "magenta"
                    document.getElementById("eventinfo").innerHTML = "Du hör nån som skäller på en zombie. Den måste vara nära farmor."
                    mapEvent = true
                }
                else {
                    if (i == playerY && j == playerX) {
                        data.style.backgroundColor = "blue"
                    }
                    else if (i == zombieY && j == zombieX) {
                        data.style.backgroundColor = "red"
                    }
                    else if (i == catY && j == catX) {
                        data.style.backgroundColor = "green"
                    }
                    else {
                        //data.innerHTML = "O"
                    }
                }
            }
            row.appendChild(data)
        }
        table.appendChild(row)
    }
    document.getElementById("map").appendChild(table)
    if (mapEvent == false) {
        document.getElementById("eventinfo").innerHTML = landscapeImages[getLocationImageIndex()][1]
    }
    mapEvent = false

    document.getElementById("locationimage").src = "images/" + landscapeImages[getLocationImageIndex()][0]

    if (displayZombie) {
        document.getElementById("currentzombieimage").style.display = "block"
        displayZombie = false
    }
    else {
        document.getElementById("currentzombieimage").style.display = "none"
    }

    if (displayCat) {
        document.getElementById("currentcatimage").style.display = "block"
        displayCat = false
    }
    else {
        document.getElementById("currentcatimage").style.display = "none"
    }
}

function getLocationImageIndex() {
    return (playerY * cols) + playerX
}

function goNorth() {
    if (playerY > 0) {
        playerY--
        //document.getElementById("playerY").innerHTML = playerY
        moveZombie()
        buildMap(rows, cols)
    }
}

function goWest() {
    if (playerX > 0) {
        playerX--
        //document.getElementById("playerX").innerHTML = playerX
        moveZombie()
        buildMap(rows, cols)
    }
}

function goEast() {
    if (playerX < cols - 1) {
        playerX++
        //document.getElementById("playerX").innerHTML = playerX
        moveZombie()
        buildMap(rows, cols)
    }
}

function goSouth() {
    if (playerY < rows - 1) {
        playerY++
        //document.getElementById("playerY").innerHTML = playerY
        moveZombie()
        buildMap(rows, cols)
    }
}