game.splash("Welcome, your goal is to shoot and dodge slimes right now")
game.splash("Unfortunately do to lack of time the game isn't finished")
game.splash("For now your goal is to get 500 score without dying to win the game")
let Hero = sprites.create(img`
    . . . . . . f f f f . . . . . .
    . . . . f f 1 1 1 1 f f . . . .
    . . . f b 1 1 1 1 1 1 b f . . .
    . . . f 1 1 1 1 1 1 1 1 f . . .
    . . f d 1 1 1 1 1 1 1 1 d f . .
    . . f d 1 1 1 1 1 1 1 1 d f . .
    . . f d d d 1 1 1 1 d d d f . .
    . . f b d b f d d f b d b f . .
    . . f c d c f 1 1 f c d c f . .
    . . . f b 1 1 1 1 1 1 b f . . .
    . . f f f c d b 1 b d f f f f .
    f c 1 1 1 c b f b f c 1 1 1 c f
    f 1 b 1 b 1 f f f f 1 b 1 b 1 f
    f b f b f f f f f f b f b f b f
    . . . . . f f f f f f . . . . .
    . . . . . . . f f f . . . . . .
`, SpriteKind.Player)
info.setScore(0)
info.setLife(3)

enum MyKinds {
    EnemyProjectile,
    PlayerProjectile
}

let GroundSlime: Sprite = null
let WaterSlime: Sprite = null
let FireSlime: Sprite = null
let ElectricSlime: Sprite = null
let statusbar: StatusBarSprite = null
controller.player1.moveSprite(Hero)
//let current_map:number = 0
//tiles.setCurrentTilemap(tilemap`X2Y1U`)
let current_map = 29
tiles.setCurrentTilemap(tilemap`X7Y6U`)
scene.cameraFollowSprite(Hero)
let HeroDirection = "South"
let MaxRandomEnemies = 0
//let SpawnEnemiesCondition = false
let GroundSlimesSpawn = 0
let WaterSlimesSpawn = 0
let FireSlimesSpawn = 0
let ElectricSlimesSpawn = 0
let Diff = 0
let RandomX = 0
let RandomY = 0
let PathDirection = ""
let EnemiesInTheRoom = 0
let LastHit = 0
let CurrentHit = 0
Hero.setPosition(128, 128)
Hero.setBounceOnWall(true)

//doslova jenom system na chození z místnosti do místnosti

let UnlockedRooms = [tilemap`X2Y1U`, tilemap`X7Y1U`, tilemap`X2Y2U`, tilemap`X3Y2U`, tilemap`X7Y2U`, tilemap`X2Y3U`, tilemap`X5Y3U`, tilemap`X7Y3U`, tilemap`X8Y3U`, tilemap`X9Y3U`, tilemap`X10Y3U`, tilemap`X11Y3U`, tilemap`X1Y4U`, tilemap`X2Y4U`, tilemap`X3Y4U`, tilemap`X4Y4U`, tilemap`X5Y4U`, tilemap`X6Y4U`, tilemap`X7Y4U`, tilemap`X9Y4U`, tilemap`X10Y4U`, tilemap`X2Y5U`, tilemap`X5Y5U`, tilemap`X7Y5U`, tilemap`X2Y6U`, tilemap`X3Y6U`, tilemap`X4Y6U`, tilemap`X5Y6U`, tilemap`X6Y6U`, tilemap`X7Y6U`, tilemap`X8Y6U`, tilemap`X9Y6U`, tilemap`X10Y6U`, tilemap`X11Y6U`, tilemap`X12Y6U`, tilemap`X3Y7U`, tilemap`X7Y7U`, tilemap`X7Y8U`, tilemap`X6Y9U`, tilemap`X7Y9U`, tilemap`X7Y10U`]
let ClosedRooms = [tilemap`X2Y1C`, tilemap`X7Y1C`, tilemap`X2Y2C`, tilemap`X3Y2C`, tilemap`X7Y2C`, tilemap`X3Y3C`, tilemap`X5Y3C`, tilemap`X7Y3C`, tilemap`X8Y3C`, tilemap`X9Y3C`, tilemap`X10Y3C`, tilemap`X11Y3C`, tilemap`X1Y4C`, tilemap`X2Y4C`, tilemap`X3Y4C`, tilemap`X4Y4C`, tilemap`X5Y4C`, tilemap`X6Y4C`, tilemap`X7Y4C`, tilemap`X9Y4C`, tilemap`X10Y4C`, tilemap`X2Y5C`, tilemap`X5Y5C`, tilemap`X7Y5C`, tilemap`X2Y6C`, tilemap`X3Y6C`, tilemap`X4Y6C`, tilemap`X5Y6C`, tilemap`X6Y6C`, tilemap`X7Y6C`, tilemap`X8Y6C`, tilemap`X9Y6C`, tilemap`X10Y6C`, tilemap`X11Y6C`, tilemap`X12Y6C`, tilemap`X3Y7C`, tilemap`X7Y7C`, tilemap`X7Y8C`, tilemap`X6Y9C`, tilemap`X7Y9C`, tilemap`X7Y10C`]
let AllRooms = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]
let ClearedRooms = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118,119,120,121,122,123,124,125,126,127,128,29,130,131,132,133,134,135,136,137,138,139,140]
let SpotWithSlimeX:number[] = []
let SpotWithSlimeY: number[] = []
let SlimesInTheRoom: any[] = []

// NORTH
const RoomsHaveN = [2, 4, 5, 7, 13, 16, 18, 19, 20, 22, 23, 24, 27, 29, 35, 36, 37, 39, 40]
const DoorNorth   = [128,226]

// SOUTH
const RoomsHaveS = [0, 1, 2, 4, 5, 6, 7, 9, 10, 16, 18, 21, 22, 23, 25, 29, 36, 37, 39]
const DoorSouth = [128, 30]

// WEST
const RoomsHaveW = [3, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 39]
const DoorWest = [226, 128]

// EAST
const RoomsHaveE = [2, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 38]
const   DoorEast = [30, 128]

// Pohyb po mapě skrz dveře + zjištění jestli místnost byla pročištěna
function DoDoorMove( roomlist:number[], targets:number[], tgtpos:number[])
{
    for (let i = 0; i < roomlist.length; i++) {
        if (current_map == roomlist[i]) {
            Hero.setPosition(tgtpos[0], tgtpos[1])
            current_map = targets[i];
            if (current_map != ClearedRooms[current_map]) {
                tiles.setCurrentTilemap(ClosedRooms[current_map])
                ClearedRooms[current_map] = current_map
                if (current_map != 6)
                {
                    if (current_map != 34)
                    {
                        if (current_map != 35)
                        {
                            SpawnEnemies()
                        }
                    }
                }
                LastHit = game.runtime()
                CurrentHit = game.runtime()
                console.log(current_map)
                break
            } else {
                tiles.setCurrentTilemap(UnlockedRooms[current_map])
                console.log(current_map)
                break
            }
        }
    }
}

// spawnování nepřátelských mobů
function SpawnEnemies()
{
    MaxRandomEnemies = Math.randomRange(3, 15)
    GroundSlimesSpawn = Math.randomRange(1, MaxRandomEnemies - 1)
    Diff = MaxRandomEnemies - GroundSlimesSpawn
    if (Diff > 0)
    {
        WaterSlimesSpawn = Math.randomRange(1, Diff)
        Diff = Diff - WaterSlimesSpawn
    }
    if (Diff > 0) {
        FireSlimesSpawn = Math.randomRange(1, Diff)
        Diff = Diff - FireSlimesSpawn
    }
    if (Diff > 0) {
        ElectricSlimesSpawn = Math.randomRange(1, Diff)
        Diff = Diff - ElectricSlimesSpawn
    }
    Diff = 0
    EnemiesInTheRoom = GroundSlimesSpawn + WaterSlimesSpawn + FireSlimesSpawn + ElectricSlimesSpawn
    let GSS = 0
    let WSS = 0
    let FSS = 0
    let ESS = 0
    while (GSS != GroundSlimesSpawn) {
        RandomX = Math.randomRange(1, 14)
        RandomY = Math.randomRange(1, 14)
        if (tiles.tileIsWall(tiles.getTileLocation(RandomX, RandomY)) == false) {
            if (SpotWithSlimeX[GSS - 1] != RandomX && SpotWithSlimeY[GSS - 1] != RandomY)
            {
                GroundSlime = sprites.create(assets.image`GroundSlime`, SpriteKind.Enemy)
                SlimesInTheRoom.push(GroundSlime)
                GroundSlime.setPosition((RandomX * 16) + 8, (RandomY * 16) + 8)
                statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
                statusbar.setColor(5, 12)
                statusbar.max = 100
                statusbar.attachToSprite(GroundSlime)
                GSS++
            }
            else{
            }
        }
        else {
        }
    }
    while (WSS != WaterSlimesSpawn) {
        RandomX = Math.randomRange(1, 14)
        RandomY = Math.randomRange(1, 14)
        if (tiles.tileIsWall(tiles.getTileLocation(RandomX, RandomY)) == false) {
            if (SpotWithSlimeX[WSS - 1] != RandomX && SpotWithSlimeY[WSS - 1] != RandomY) {
                WaterSlime = sprites.create(assets.image`WaterSlime`, SpriteKind.Enemy)
                SlimesInTheRoom.push(WaterSlime)
                WaterSlime.setPosition((RandomX * 16) + 8, (RandomY * 16) + 8)
                statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
                statusbar.setColor(5, 12)
                statusbar.max = 100
                statusbar.attachToSprite(WaterSlime)
                WSS++
            }
            else {
            }
        }
        else {
        }
    }
    while (FSS != FireSlimesSpawn) {
        RandomX = Math.randomRange(1, 14)
        RandomY = Math.randomRange(1, 14)
        if (tiles.tileIsWall(tiles.getTileLocation(RandomX, RandomY)) == false) {
            if (SpotWithSlimeX[FSS - 1] != RandomX && SpotWithSlimeY[FSS - 1] != RandomY) {
                FireSlime = sprites.create(assets.image`FireSlime`, SpriteKind.Enemy)
                SlimesInTheRoom.push(FireSlime)
                FireSlime.setPosition((RandomX * 16) + 8, (RandomY * 16) + 8)
                statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
                statusbar.setColor(5, 12)
                statusbar.max = 100
                statusbar.attachToSprite(FireSlime)
                FSS++
            }
            else {
            }
        }
        else {
        }
    }
    while (ESS != ElectricSlimesSpawn) {
        RandomX = Math.randomRange(1, 14)
        RandomY = Math.randomRange(1, 14)
        if (tiles.tileIsWall(tiles.getTileLocation(RandomX, RandomY)) == false) {
            if (SpotWithSlimeX[ESS - 1] != RandomX && SpotWithSlimeY[ESS - 1] != RandomY) {
                ElectricSlime = sprites.create(assets.image`ElectricSlime`, SpriteKind.Enemy)
                SlimesInTheRoom.push(ElectricSlime)
                ElectricSlime.setPosition((RandomX * 16) + 8, (RandomY * 16) + 8)
                statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
                statusbar.setColor(5, 12)
                statusbar.max = 100
                statusbar.attachToSprite(ElectricSlime)
                ESS++
            }
            else {
            }
        }
        else {
        }
    }
}

// pohyb slimů
let ourbro = 0
game.onUpdateInterval(2000, function () {
    if (SlimesInTheRoom.length > 0)
    {
        ourbro = 0
        let OurSlimey: object 

        while (true)
        {
            OurSlimey = SlimesInTheRoom[ourbro]
            let SlimeMoves = Math.randomRange(1, 5)
            let SlimeDirection = Math.randomRange(1, 8)
            if (SlimesInTheRoom[ourbro].isHittingTile(CollisionDirection.Left))
            {
                SlimesInTheRoom[ourbro].setVelocity((SlimeMoves * 16) / 5, 0)
                break
            }
            if (SlimesInTheRoom[ourbro].isHittingTile(CollisionDirection.Top)) {
                SlimesInTheRoom[ourbro].setVelocity(0, (SlimeMoves * 16) / 5)
                break
            }
            if (SlimesInTheRoom[ourbro].isHittingTile(CollisionDirection.Right)) {
                SlimesInTheRoom[ourbro].setVelocity((SlimeMoves * -16) / 5, 0)
                break
            }
            if (SlimesInTheRoom[ourbro].isHittingTile(CollisionDirection.Bottom)) {
                SlimesInTheRoom[ourbro].setVelocity(0, (SlimeMoves * -16) / 5)
                break
            }
            if (SlimeDirection == 1) 
            {
                SlimesInTheRoom[ourbro].setVelocity(0 , (SlimeMoves * -16)/5)
            }
            if (SlimeDirection == 2) {
                SlimesInTheRoom[ourbro].setVelocity((SlimeMoves * 22.62742) / 5, (SlimeMoves * -22.62742) / 5)
            }
            if (SlimeDirection == 3) {
                SlimesInTheRoom[ourbro].setVelocity((SlimeMoves * 16) / 5, 0)
            }
            if (SlimeDirection == 4) {
                SlimesInTheRoom[ourbro].setVelocity((SlimeMoves * 22.62742) / 5, (SlimeMoves * 22.62742) / 5)
            }
            if (SlimeDirection == 5) {
                SlimesInTheRoom[ourbro].setVelocity(0, (SlimeMoves * 16) / 5)
            }
            if (SlimeDirection == 6) {
                SlimesInTheRoom[ourbro].setVelocity((SlimeMoves * -22.62742) / 5, (SlimeMoves * 22.62742) / 5)
            }
            if (SlimeDirection == 7) {
                SlimesInTheRoom[ourbro].setVelocity((SlimeMoves * -16) / 5, 0)
            }
            if (SlimeDirection == 8) {
                SlimesInTheRoom[ourbro].setVelocity((SlimeMoves * -22.62742)/5, (SlimeMoves * -22.62742)/5)
            }
            if (ourbro + 1 == SlimesInTheRoom.length) {
                break
            }
            ourbro++
        }
    }
})

//dveře na sever
scene.onOverlapTile(SpriteKind.Player, assets.tile`NLU` || assets.tile`NRU`, function (sprite: Sprite, location: tiles.Location) {
    PathDirection = "North"
    DoDoorMove(RoomsHaveN, RoomsHaveS, DoorNorth)
})
//dveře na jih
scene.onOverlapTile(SpriteKind.Player, assets.tile`SLU` || assets.tile`SRU`, function (sprite: Sprite, location: tiles.Location) {
    PathDirection = "South"
    DoDoorMove(RoomsHaveS, RoomsHaveN, DoorSouth)
})
//dveře na zapad
scene.onOverlapTile(SpriteKind.Player, assets.tile`WLU` || assets.tile`WRU`, function (sprite: Sprite, location: tiles.Location) {
    PathDirection = "West"
    DoDoorMove(RoomsHaveW, RoomsHaveE, DoorWest)
})
//dveře na vychod
scene.onOverlapTile(SpriteKind.Player, assets.tile`ELU` || assets.tile`ERU` || assets.tile`ERU0`, function (sprite: Sprite, location: tiles.Location) {
    PathDirection = "East"
    DoDoorMove(RoomsHaveE, RoomsHaveW, DoorEast)
})


//otáčení
forever(function() {
    if (Hero.vx == 100 && Hero.vy == 0) {
        Hero.setImage(assets.image`GhostEast`)
        HeroDirection = "East"
    } else if (Hero.vx == 70.703125 && Hero.vy == 70.703125) {
        Hero.setImage(assets.image`GhostSouthEast`)
        HeroDirection = "SouthEast"
    } else if (Hero.vx == 0 && Hero.vy == 100) {
        Hero.setImage(assets.image`GhostSouth`)
        HeroDirection = "South"
    } else if (Hero.vx == -70.703125 && Hero.vy == 70.703125) {
        Hero.setImage(assets.image`GhostSouthWest`)
        HeroDirection = "SouthWest"
    } else if (Hero.vx == -100 && Hero.vy == 0) {
        Hero.setImage(assets.image`GhostWest`)
        HeroDirection = "West"
    } else if (Hero.vx == -70.703125 && Hero.vy == -70.703125) {
        Hero.setImage(assets.image`GhostNorthWest`)
        HeroDirection = "NorthWest"
    } else if (Hero.vx == 0 && Hero.vy == -100) {
        Hero.setImage(assets.image`GhostNorth`)
        HeroDirection = "North"
    } else if (Hero.vx == 70.703125 && Hero.vy == -70.703125) {
        Hero.setImage(assets.image`GhostNorthEast`)
        HeroDirection = "NorthEast"
    }
})


//střelba projektilů
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function() {
    if (HeroDirection == "North")
    {
        let HeroProjectile =sprites.createProjectileFromSprite(assets.image`PlayerShotNorth`, Hero, 0, -150)
        HeroProjectile.setKind(MyKinds.PlayerProjectile)
    } else if (HeroDirection == "South")
    {
        let HeroProjectile =sprites.createProjectileFromSprite(assets.image`PlayerShotSouth`, Hero, 0, 150)
        HeroProjectile.setKind(MyKinds.PlayerProjectile)
    } else if (HeroDirection == "East")
    {
        let HeroProjectile = sprites.createProjectileFromSprite(assets.image`PlayerShotEast`, Hero, 150, 0)
        HeroProjectile.setKind(MyKinds.PlayerProjectile)
    } else if (HeroDirection == "West")
    {
        let HeroProjectile = sprites.createProjectileFromSprite(assets.image`PlayerShotWest`, Hero, -150, 0)
        HeroProjectile.setKind(MyKinds.PlayerProjectile)
    } else if (HeroDirection == "NorthWest") {
        let HeroProjectile = sprites.createProjectileFromSprite(assets.image`PlayerShotNorthWest`, Hero, -150, -150)
        HeroProjectile.setKind(MyKinds.PlayerProjectile)
    }
    else if (HeroDirection == "NorthEast") {
        let HeroProjectile = sprites.createProjectileFromSprite(assets.image`PlayerShotNorthEast`, Hero, 150, -150)
        HeroProjectile.setKind(MyKinds.PlayerProjectile)
    }
    else if (HeroDirection == "SouthWest") {
        let HeroProjectile = sprites.createProjectileFromSprite(assets.image`PlayerShotSouthWest`, Hero, -150, 150)
        HeroProjectile.setKind(MyKinds.PlayerProjectile)
    }
    else if (HeroDirection == "SouthEast") {
        let HeroProjectile = sprites.createProjectileFromSprite(assets.image`PlayerShotSouthEast`, Hero, 150, 150)
        HeroProjectile.setKind(MyKinds.PlayerProjectile)
    }
})

//kontrola střetnutí hráčského projektilu s nepřítelem
sprites.onOverlap(MyKinds.PlayerProjectile, SpriteKind.Enemy, function(sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value -= 30
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value == 0)
    {
        info.changeScoreBy(1)
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy()
    EnemiesInTheRoom -= 1
})
forever(function () {
    if (EnemiesInTheRoom == 0)
    {
        if (current_map != 6) {
            if (current_map != 34) {
                if (current_map != 35) {
                    tiles.setCurrentTilemap(UnlockedRooms[current_map])
                    SlimesInTheRoom = []
                }
            }
        }
    }
})
let myMinimap = minimap.minimap()

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    CurrentHit = game.runtime()
    if ((LastHit - CurrentHit) < -5000)
    {
        LastHit = CurrentHit
        info.changeLifeBy(-1)
    }
})
forever(function() {
    if (info.score() == 500)
    {
        game.splash("Congratulation, you technically won the game")
        game.over(true)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Locked1` || assets.tile`Locked2` || assets.tile`Locked3` || assets.tile`Locked4`, function (sprite: Sprite, location: tiles.Location) {
    info.changeLifeBy(1)
    tiles.setCurrentTilemap(UnlockedRooms[current_map])
})
