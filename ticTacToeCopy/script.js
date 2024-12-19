/* !Important Rules!
  1. Format RGBA as "rgba(0, 0, 0, 0.0)" NO EXCEPTIONS!
*/

// Stores Data Relating To Pieces
const CurrentImgs = ["", ""]
const SelectedPieceIcons = [0, 1]
const Wins = [0, 0]
var LastWin = null // Allows Undo To Remove A Win
var Forfeit = false // Allows Undo To Not Revert Back When User Forfeits

// Configurable Variables
const GameName = "Tic Tac Toe ULTRA"
const CurrentVersion = "V1.03.23"
const PlayingMessage = "Is up!"
const WinMessage = "Won!"
const DrawMessage = "Draw!"
const TotalWinsMessage = "Wins: "
const FourCornersMessage = "Got 4 Corners!"
const HugeWinNumber = "Too Much!" // Displays when you have a trillion wins or more
const TinyWinNumber = "Too Little!"
const DefaultColorCode = ["rgba(255, 0, 0, 0.125)", "rgba(0, 0, 255, 0.125)"]
const DefaultFogColor = "rgba(125, 125, 125, 0.75)"
const DefaultWinLineColor = "rgba(255, 0, 0, 1)"
const DefaultRemovedBlockColor = "rgba(0, 0, 0, 1)"
const DefaultBackgroundColor = "rgba(255, 255, 255, 1)"

// Settings Variables
const ColorCode = [DefaultColorCode[0], DefaultColorCode[1]]
var OpenSettings = false
var TSFourCorners = false
var TSOveridePieces = false
var TSRandomLocation = false
var TSPointsBy = 1
var TSFog = false
var TSFogColor = DefaultFogColor
var TSFogDisapearOnWin = true
var TSWinLineColor = DefaultWinLineColor
var TSRemovedBlockColor = DefaultRemovedBlockColor
var TSBackgroundColor = DefaultBackgroundColor

// Holds HTML Components
const TestColorDiv = document.getElementById("test-color-div")
const GameTitle = document.getElementById("game-title")
const PieceButtons = document.getElementsByClassName("piece-button")
const PieceIcons = document.getElementsByClassName("piece-icon")
const TurnImage = document.getElementById("turn-image")
const TurnText = document.getElementById("turn-text")
const UndoButton = document.getElementById("undo-button")
const SkipButton = document.getElementById("skip-button")
const SettingsButton = document.getElementById("settings-button")
const ResetButton = document.getElementById("reset-button")
const ForfeitButton = document.getElementById("forfeit-button")
const WinLine = document.getElementById("win-line")
const LeftTab = document.getElementById("left-tab")
const RightTab = document.getElementById("right-tab")
const LeftWins = document.getElementById("left-wins")
const RightWins = document.getElementById("right-wins")
const VersionNumber = document.getElementById("version-number")
const SettingsMenu = document.getElementById("settings-menu")
const ToggleSettingButtons = document.getElementsByClassName("tog-switch-button")
const ToggleSettingText = document.getElementsByClassName("tog-input-box")
const ToggleSubmitButtons = document.getElementsByClassName("tog-submit-button")

// Holds Major Game Storage
var CurrentBoard = [null, null, null, null, null, null, null, null, null]
var PresentBlocks = [0, 1, 2, 3, 4, 5, 6, 7, 8]
var CurrentTurn = false // false=X, true=O
var MoveHistory = []
var WonGame = false

// Holds Number Suffixes
const NumberSuffixes = [[1000, "k"], [1000000, "m"], [1000000000, "b"], [1000000000000, "t"]]

/*
  General Purpose Functions
*/

// Abbreviates Win Amount
function AbbreviateWinAmount(Amount) {
  let AbsoluteAmount = Math.abs(Amount)
  let UseSuffixIndex = -2
  for (let i = 0; i < NumberSuffixes.length; i++) {
    const UseTable = NumberSuffixes[i]
    if (AbsoluteAmount < UseTable[0]) {
      UseSuffixIndex = i - 1
      break
    } else if (AbsoluteAmount == UseTable[0]) {
      UseSuffixIndex = i
      break
    }
  }
  if (UseSuffixIndex == -1) {
    return(String(Amount))
  } else if (UseSuffixIndex == -2) {
    if (Amount > 0) {
      return(HugeWinNumber)
    } else {
      return(TinyWinNumber)
    }
  } else {
    const WholeNumber = (Amount / NumberSuffixes[UseSuffixIndex][0])
    const FullPart = Math.trunc(WholeNumber)
    const DecimalPart = WholeNumber - FullPart
    const SuffixedAmount = String(FullPart + (Math.round(DecimalPart * 100) / 100)) + NumberSuffixes[UseSuffixIndex][1]
    return(SuffixedAmount)
  }
}

// Uses Inputed Text To Generate Standardized RGBA Value
function MakeUsableRGBA(Text, AValue) {
  const Sections = Text.split(",")
  const SectionLength = Sections.length
  if (SectionLength >= 3 && SectionLength < 5) {
    if (SectionLength == 4) {
      Sections.pop()
    }
    for (let i = 0; i < 3; i++) {
      const UseSection = Sections[i]
      const NotNumber = isNaN(UseSection)
      if (NotNumber || !NotNumber && Number(UseSection) > 255) {
        return
      }
    }
    const TestRGBA = String(`rgba(${Sections[0]},${Sections[1]},${Sections[2]}, ${AValue})`)
    TestColorDiv.style.backgroundColor = TestRGBA
    return(getComputedStyle(TestColorDiv).backgroundColor)
  }
}

// Checks If URL Is A Valid Image
function ValidImageURL(URL) {
  return new Promise((Success, Failure) => {
    if (!URL.includes("http") || !URL.includes("://")) {
      Failure()
    }

    let ImageLoaded = false
    const TestImage = new Image()
    TestImage.style.position = "fixed"
    TestImage.style.opacity = "0"
    TestImage.style.zIndex = "-6"
    TestImage.style.height = "5px"
    TestImage.style.width = "5px"
    TestColorDiv.appendChild(TestImage)

    TestImage.onload = () => {
      ImageLoaded = true
      Success(TestImage)
    }
    TestImage.onerror = () => Failure(TestImage)
    TestImage.src = URL

    setTimeout(() => {
      if (!ImageLoaded) {
        Failure(TestImage)
      }
    },3000)
  })
}

/*
  Game Loop Starts Bellow
*/

// Removes Fog On Win
function RemoveFogOnFullBoard() {
  if (TSFogDisapearOnWin) {
    const UseColorCode = (CurrentImgs[0]==CurrentImgs[1])
    for (let i = 0; i < PieceButtons.length; i++) {
      if (CurrentBoard[i] != null) {
        const Button = PieceButtons[i]
        const Image = Button.querySelector(".piece-icon")
        const PIV = Number(CurrentBoard[i]=="O")
        Image.src = CurrentImgs[PIV]
        Image.style.opacity = 1
        if (UseColorCode) {
          Image.style.backgroundColor = ColorCode[PIV]
        }
      }
    }
  }
}

// Reverts Fog When User Undoes Winning/Draw Move
function RevertFog() {
  for (let i = 0; i < PieceButtons.length; i++) {
    const Button = PieceButtons[i]
    if (Button.style.backgroundColor === TSFogColor && CurrentBoard[i] != null) {
      const Image = Button.querySelector(".piece-icon")
      Image.src = ""
      Image.style.opacity = 0
    }
  }
}

// Updates Win Message
function UpdateWins() {
  LeftWins.textContent = TotalWinsMessage + AbbreviateWinAmount(Wins[0])
  RightWins.textContent = TotalWinsMessage + AbbreviateWinAmount(Wins[1])
}

// Gets Status On Board Fullness
function BoardFull() {
  if (CurrentBoard.some(element => element === null)) {
    return (false)
  }
  return (true)
}

// Checks Status Of Board And Returns Winner, Draw, Or Continue
function GetWinner() {
  // Checks For Win In Rows And Columns
  for (let i = 0; i < 3; i++) {
    const Rows = [0 + (i * 3), 1 + (i * 3), 2 + (i * 3)]
    const Columns = [0 + i, 3 + i, 6 + i]
    if (CurrentBoard[Rows[0]] != null &&
      CurrentBoard[Rows[0]] === CurrentBoard[Rows[1]] &&
      CurrentBoard[Rows[1]] === CurrentBoard[Rows[2]]) {
      return ([0, CurrentBoard[Rows[0]] == "O", i])
    }
    if (CurrentBoard[Columns[0]] != null &&
      CurrentBoard[Columns[0]] === CurrentBoard[Columns[1]] &&
      CurrentBoard[Columns[1]] === CurrentBoard[Columns[2]]) {
      return ([1, CurrentBoard[Columns[0]] == "O", i])
    }
  }
  // Checks Diagnols
  if (CurrentBoard[0] != null &&
    CurrentBoard[0] === CurrentBoard[4] &&
    CurrentBoard[4] === CurrentBoard[8]) {
    return ([2, CurrentBoard[0] == "O"])
  }
  // Checks Diagnols
  if (CurrentBoard[2] != null &&
    CurrentBoard[2] === CurrentBoard[4] &&
    CurrentBoard[4] === CurrentBoard[6]) {
    return ([3, CurrentBoard[2] == "O"])
  }
  // Checks for 3 Corners If Enabled
  if (TSFourCorners) {
    if (CurrentBoard[0] != null &&
      CurrentBoard[0] == CurrentBoard[2] &&
      CurrentBoard[2] == CurrentBoard[6] &&
      CurrentBoard[6] == CurrentBoard[8]) {
      return ([4, CurrentBoard[0] == "O"])
    }
  }
  return (BoardFull())
}

// Handles Reseting Win Line
function ResetWinLine() {
  WinLine.style.opacity = 0
  WinLine.style.zIndex = "-1"
  WinLine.style.top = "calc(50% + 37px)"
  WinLine.style.left = "calc(50% - 200px)"
}

// Handles Positioning And Rotating Win Line
function HandleDisplayWin(Data) {
  const WinType = Data[0]
  if (WinType == 0) {
    WinLine.style.transform = "rotate(0deg)"
    const UpBy = ((Data[2] + 1) - 2) * 83.333
    WinLine.style.top = `calc(50% + 37px + ${UpBy}px)`
  } else if (WinType == 1) {
    WinLine.style.transform = "rotate(90deg)"
    const LeftBy = ((Data[2] + 1) - 2) * 83.333
    WinLine.style.left = `calc(50% - 200px + ${LeftBy}px)`
  } else if (WinType == 2) {
    WinLine.style.transform = "rotate(45deg)"
  } else if (WinType == 3) {
    WinLine.style.transform = "rotate(-45deg)"
  }

  if (WinType == 4) {
    TurnText.textContent = FourCornersMessage
  } else {
    WinLine.style.zIndex = "5"
    WinLine.style.opacity = "1"
  }
}

// Handles Placing Piece
function HandlePlacePiece(Button) {
  const Image = Button.querySelector(".piece-icon")
  MoveHistory.push([Button.id, CurrentBoard[Button.id]])
  if (!CurrentTurn) {
    if (SelectedPieceIcons[0] == SelectedPieceIcons[1]) {
      Image.style.backgroundColor = ColorCode[0]
    }
    CurrentBoard[Button.id] = "X"
  } else {
    if (SelectedPieceIcons[0] == SelectedPieceIcons[1]) {
      Image.style.backgroundColor = ColorCode[1]
    }
    CurrentBoard[Button.id] = "O"
  }
  if (TSFog) {
    Button.style.backgroundColor = TSFogColor
  } else {
    Image.src = CurrentImgs[Number(CurrentTurn)]
    Image.style.opacity = 1
  }

  // Checks If Game Won/Lost/In Progress
  const Data = GetWinner()
  if (Data.length > 1) {
    // Game Won
    WonGame = true
    LastWin = Number(Data[1])
    Wins[LastWin] += TSPointsBy
    UpdateWins()
    TurnText.textContent = WinMessage
    TurnImage.src = CurrentImgs[Number(Data[1])]
    if (CurrentImgs[0] == CurrentImgs[1]) {
      TurnImage.style.backgroundColor = ColorCode[Number(Data[1])]
    }
    HandleDisplayWin(Data)
    RemoveFogOnFullBoard()
  } else {
    // Draw
    if (Data) {
      WonGame = true
      TurnText.textContent = DrawMessage
      RemoveFogOnFullBoard()
    } else {
      // Continue
      TurnImage.src = CurrentImgs[Number(!CurrentTurn)]
      if (CurrentImgs[0] == CurrentImgs[1]) {
        TurnImage.style.backgroundColor = ColorCode[Number(!CurrentTurn)]
      }
    }
  }
  CurrentTurn = !CurrentTurn
}

// Returns A Random Location On The Board
function GetRandomLocation() {
  const UseableLocations = PresentBlocks.slice()
  if (!TSOveridePieces) {
    for (let i = 0; i < CurrentBoard.length; i++) {
      const ContainsLocation = UseableLocations.indexOf(i)
      if (ContainsLocation != -1 && CurrentBoard[i] != null) {
        UseableLocations.splice(ContainsLocation,1)
      }
    }
  }
  if (UseableLocations.length == 0) {
    return(false)
  } else {
    return(UseableLocations[Math.floor(Math.random()*(UseableLocations.length-1))])
  }
}

// Establishes Click Connections
for (let i = 0; i < PieceButtons.length; i++) {
  const Button = PieceButtons[i]
  Button.addEventListener("click", function () {
    if ((!CurrentBoard[Button.id] || TSOveridePieces) && !WonGame && PresentBlocks.indexOf(Number(Button.id)) != -1) { // Detects If Board Piece Is Empty And If Game Not Won And If Block Not Removed
      if (TSRandomLocation) {
        const RandomIndex = GetRandomLocation()
        if (RandomIndex !== false) {
          const RandomButton = PieceButtons[RandomIndex]
          HandlePlacePiece(RandomButton)
        }
      } else {
        HandlePlacePiece(Button)
      }
    }
  })
}

// Handles Undo Most Recent Move
UndoButton.addEventListener("click", function() {
  if (MoveHistory[0]) {
    if (!Forfeit) {
      // Reset Last Block
      const PreOverigPie = MoveHistory[MoveHistory.length-1]
      const Index = PreOverigPie[0]
      const Button = PieceButtons[Index]
      const Image = Button.querySelector(".piece-icon")
      Image.src = ""
      Image.style.opacity = 0
      CurrentBoard[Index] = null

      // Handle Special Setting Requirements
      if (PreOverigPie[1] != null && PresentBlocks.indexOf(PreOverigPie[0] != -1)) {
        Image.src = CurrentImgs[Number(PreOverigPie[1] == "O")]
        Image.style.opacity = 1
        CurrentBoard[PreOverigPie[0]] = PreOverigPie[1]
        if (CurrentImgs[0] == CurrentImgs[1]) {
          Image.style.backgroundColor = ColorCode[Number(PreOverigPie[1] == "O")]
        }
      }
      if (!TSFog || CurrentBoard[Index] == null) {
        Button.style.backgroundColor = ""
      }

      // Handles Displaying Who's Turn It Is
      TurnText.textContent = PlayingMessage
      TurnImage.src = CurrentImgs[Number(!CurrentTurn)]
      if (CurrentImgs[0] == CurrentImgs[1]) {
        TurnImage.style.backgroundColor = ColorCode[Number(!CurrentTurn)]
      }
      CurrentTurn = !CurrentTurn
      MoveHistory.pop()

    } else {
      TurnText.textContent = PlayingMessage
      TurnImage.src = CurrentImgs[Number(CurrentTurn)]
      if (CurrentImgs[0] == CurrentImgs[1]) {
        TurnImage.style.backgroundColor = ColorCode[Number(CurrentTurn)]
      }
    }
    // Handles Removing Win Points
    if (LastWin !== null) {
      Wins[LastWin] -= TSPointsBy
      UpdateWins()
      LastWin = null
    }
    // Handles Reseting After Win
    if (WonGame) {
      ResetWinLine()
      RevertFog()
    }
    Forfeit = false
    WonGame = false
  }
})

// Handles Skip Turn
SkipButton.addEventListener("click", function() {
  if (!WonGame) {
    TurnText.textContent = PlayingMessage
    TurnImage.src = CurrentImgs[Number(!CurrentTurn)]
    if (CurrentImgs[0] == CurrentImgs[1]) {
      TurnImage.style.backgroundColor = ColorCode[Number(!CurrentTurn)]
    }
    CurrentTurn = !CurrentTurn
  }
})

// Handles Reset Game
ResetButton.addEventListener("click", function() {
  for (let i = 0; i < PieceButtons.length; i++) {
    const Button = PieceButtons[i]
    const Image = Button.querySelector(".piece-icon")
    Image.src = ""
    Image.style.opacity = 0
    if (PresentBlocks.indexOf(i) != -1) {
      Button.style.backgroundColor = ""
    }
  }
  CurrentBoard = [null, null, null, null, null, null, null, null, null]
  CurrentTurn = false
  TurnText.textContent = PlayingMessage
  TurnImage.src = CurrentImgs[0]
  if (CurrentImgs[0] == CurrentImgs[1]) {
    TurnImage.style.backgroundColor = ColorCode[0]
  }
  MoveHistory = []
  ResetWinLine()
  LastWin = null
  WonGame = false
})

// Handles Forfeit
ForfeitButton.addEventListener("click", function() {
  if (!WonGame && MoveHistory[1]) {
    Forfeit = true
    WonGame = true
    LastWin = Number(!CurrentTurn)
    Wins[LastWin] += TSPointsBy
    UpdateWins()
    TurnText.textContent = WinMessage
    TurnImage.src = CurrentImgs[Number(!CurrentTurn)]
    if (CurrentImgs[0] == CurrentImgs[1]) {
      TurnImage.style.backgroundColor = ColorCode[Number(!CurrentTurn)]
    }
  }
})

// Handles Color Code And Icon Change
function HandleChangeIcon() {
  TurnImage.src = CurrentImgs[Number(CurrentTurn)]
  const UseColorCode = (CurrentImgs[0]==CurrentImgs[1])
  if (UseColorCode) {
    TurnImage.style.backgroundColor = ColorCode[Number(CurrentTurn)]
    LeftTab.style.backgroundColor = ColorCode[0]
    RightTab.style.backgroundColor = ColorCode[1]
  } else {
    TurnImage.style.backgroundColor = ""
    LeftTab.style.backgroundColor = "#dedede"
    RightTab.style.backgroundColor = "#dedede"
  }

  for (let i = 0; i < PieceButtons.length; i++) {
    const Button = PieceButtons[i]
    const Image = Button.querySelector(".piece-icon")
    const PieceOnBoard = CurrentBoard[i]
    if (PieceOnBoard == null) {
      Image.src = ""
      Image.style.backgroundColor = ""
    } else {
      if (TSFog) {
        Button.style.backgroundColor = TSFogColor
      } else {
        const PIV = Number(PieceOnBoard=="O")
        Image.src = CurrentImgs[PIV]
        if (UseColorCode) {
          Image.style.backgroundColor = ColorCode[PIV]
        } else {
          Image.style.backgroundColor = ""
        }
      }
    }
  }
}

// Handles Displaying Selected Icon
function DisplaySelectedIcon(Side, PIV, Location) { // PIV = Player Identifier Value
  const SelectedButton = Side.item(Location)
  const SelectedIcon = SelectedButton.querySelector(".cosmetic-icon")
  if (CurrentImgs[PIV] != SelectedIcon.src) {
    const OldButton = Side.item(SelectedPieceIcons[PIV])
    OldButton.style.border = "1px solid black"
    CurrentImgs[PIV] = SelectedIcon.src
    SelectedPieceIcons[PIV] = Location
    HandleChangeIcon()
    SelectedButton.style.border = "5px solid #00aaff"
  }
}

// Handles Switching Icons
for (let i = 0; i < LeftTab.children.length; i++) {
  const LeftButton = LeftTab.children[i]
  const RightButton = RightTab.children[i]
  LeftButton.addEventListener("click", function () {
    const IconI = i
    DisplaySelectedIcon(LeftTab.children, 0, IconI)
  })
  RightButton.addEventListener("click", function () {
    const IconI = i
    DisplaySelectedIcon(RightTab.children, 1, IconI)
  })
}

// Toggle Settings Tab
SettingsButton.addEventListener("click", function () {
  OpenSettings = !OpenSettings
  SettingsMenu.style.opacity = Number(OpenSettings)
  if (OpenSettings) {
    SettingsMenu.style.zIndex = "25"
  } else {
    SettingsMenu.style.zIndex = "-5"
  }
})

// Handles Setting Points By
function HandleChangePointsBy(Text) {
  if (!isNaN(Text)) {
    TSPointsBy = Number(Text)
  }
}

// Updates Removed Block Color
function UpdateRemovedBlockColor() {
  for (let i = 0; i < PieceButtons.length; i++) {
    const Button = PieceButtons[i]
    if (PresentBlocks.indexOf(i) == -1) {
      Button.style.backgroundColor = TSRemovedBlockColor
    }
  }
}

// Updates Fog Color
function UpdateFogColor() {
  for (let i = 0; i < PieceButtons.length; i++) {
    const Button = PieceButtons[i]
    if (CurrentBoard[i] != null && Button.style.backgroundColor != "" && PresentBlocks.indexOf(i) != -1) {
      Button.style.backgroundColor = TSFogColor
    }
  }
}

// Handles Removing And Adding Block To Grid
function HanldeBlock(IsOn, BlockNum) {
  const Button = PieceButtons[BlockNum]
  const Image = Button.querySelector(".piece-icon")
  if (IsOn) { // Remove Block
    PresentBlocks.splice(PresentBlocks.indexOf(BlockNum), 1)
    Button.style.backgroundColor = "rgb(0,0,0)"
  } else { // Add Back Block
    PresentBlocks.push(BlockNum)
    Button.style.backgroundColor = ""
  }
  Image.src = ""
  Image.style.opacity = 0
  Image.style.backgroundColor = ""
  CurrentBoard[BlockNum] = null
}

// Handles Setting Values And Updating Stuff Related To Changing Button Settings
function HandleButtonSettingChanged(IsOn, ButtonId) {
  switch (ButtonId) {
    case "FourCorners":
      TSFourCorners = IsOn
      break
    case "OveridePieces":
      TSOveridePieces = IsOn
      break
    case "LightMode":
      const AllDiv = document.querySelectorAll("div")
      if (IsOn) {
        document.body.style.backgroundColor = "rgb(255, 255, 255)"
        AllDiv.forEach(div => {
          div.style.filter = "brightness(1)"
        })
      } else {
        document.body.style.backgroundColor = "rgb(44, 44, 44)"
        AllDiv.forEach(div => {
          div.style.filter = "brightness(.75)"
        })
      }
      break
    case "RB1":
      HanldeBlock(IsOn, 0)
      break
    case "RB2":
      HanldeBlock(IsOn, 1)
      break
    case "RB3":
      HanldeBlock(IsOn, 2)
      break
    case "RB4":
      HanldeBlock(IsOn, 3)
      break
    case "RB5":
      HanldeBlock(IsOn, 4)
      break
    case "RB6":
      HanldeBlock(IsOn, 5)
      break
    case "RB7":
      HanldeBlock(IsOn, 6)
      break
    case "RB8":
      HanldeBlock(IsOn, 7)
      break
    case "RB9":
      HanldeBlock(IsOn, 8)
      break
    case "RandomLocation":
      TSRandomLocation = IsOn
      break
    case "Fog":
      TSFog = IsOn
      break
    case "FogDisappear":
      TSFogDisapearOnWin = IsOn
      break
  }
}

// Handles Repetitive Color Stuff
function HandleSetColor(RGBAData, DefaultOption) {
  const UseColor = MakeUsableRGBA(RGBAData[0], RGBAData[1])
  if (!UseColor) {
    return(DefaultOption)
  } else {
    return(UseColor)
  }
}

// Handles Setting Values And Updating Stuff Related To Changing Text Settings
function HandleTextSettingChanged(Text, TextId) {
  switch (TextId) {
    case "P1SC":
      ColorCode[0] = HandleSetColor([Text, "0.125"], DefaultColorCode[0])
      HandleChangeIcon()
      break
    case "P2SC":
      ColorCode[1] = HandleSetColor([Text, "0.125"], DefaultColorCode[1])
      HandleChangeIcon()
      break
    case "PointsPerWin":
      HandleChangePointsBy(Text)
      break
    case "FogColor":
      TSFogColor = HandleSetColor([Text, "0.75"], DefaultFogColor)
      UpdateFogColor()
      break
    case "WinLineColor":
      TSWinLineColor = HandleSetColor([Text, "1.0"], DefaultWinLineColor)
      WinLine.style.backgroundColor = TSWinLineColor
      break
    case "RemovedBlockColor":
      TSRemovedBlockColor = HandleSetColor([Text, "1.0"], DefaultRemovedBlockColor)
      UpdateRemovedBlockColor()
      break
    case "BackgroundColor":
      TSBackgroundColor = HandleSetColor([Text, "1.0"], DefaultBackgroundColor)
      document.body.style.backgroundColor = TSBackgroundColor
  }
}

// Checks If Existing Icon Has Same Image URL
function ImageAlreadyIcon(URL) {
  for (let i = 0; i < LeftTab.children.length; i++) {
    const Button = LeftTab.children[i]
    const Icon = Button.querySelector(".cosmetic-icon")
    if (Icon.src == URL) {
      return(true)
    }
  }
}

// Handles Setting Values And Updating Stuff Related To Submit Settings
function HandleSubmitSettingChanged(Text, Button) {
  const ButtonId = Button.id
  switch (ButtonId) {
    case "AddNewIcon":
      ValidImageURL(Text)
        .then(TestImage => {
          TestImage.remove()
          if (!ImageAlreadyIcon(Text)) {
            const AllTabs = [LeftTab, RightTab]
            for (let i = 0; i < 2; i++) {
              const Tab = AllTabs[i]
              const NewButton = Tab.children[0].cloneNode(true)
              NewButton.style.border = "1px solid black"
              const NewIcon = NewButton.querySelector(".cosmetic-icon")
              NewIcon.src = Text
              const IconI = (Tab.children.length)
  
              NewButton.addEventListener("click", function() {
                DisplaySelectedIcon(Tab.children, i, IconI)
              })
  
              Tab.appendChild(NewButton)
            }
          }
        })
        .catch(TestImage => {
          if (TestImage instanceof HTMLElement) {
            TestImage.remove()
          }
        })
      break
    case "SetBackground":
      ValidImageURL(Text)
        .then(TestImage => {
          TestImage.remove()
          document.body.style.backgroundImage = "url("+Text+")"
          document.body.style.backgroundRepeat = "no-repeat"
          document.body.style.backgroundSize = "contain"
          document.body.style.backgroundPosition = "50%"
        })
        .catch(TestImage => {
          if (TestImage instanceof HTMLElement) {
            TestImage.remove()
          }
        })
    break
  }
}

// Handles Toggle Button Settings
for (let i = 0; i < ToggleSettingButtons.length; i++) {
  const Button = ToggleSettingButtons[i]
  Button.addEventListener("click", function () {
    const ButtonParent = Button.parentElement
    const IsOn = (window.getComputedStyle(Button).marginLeft && window.getComputedStyle(Button).marginLeft != "0px")
    if (IsOn) {
      Button.style.marginLeft = "0px"
      ButtonParent.style.backgroundColor = "red"
      HandleButtonSettingChanged(false, Button.id)
    } else {
      Button.style.marginLeft = "25px"
      ButtonParent.style.backgroundColor = "rgb(0, 255, 0)"
      HandleButtonSettingChanged(true, Button.id)
    }
  })
}

// Handles Settings Textbox Input
for (let i = 0; i < ToggleSettingText.length; i++) {
  const TextBox = ToggleSettingText[i]
  TextBox.addEventListener("keyup", function () {
    HandleTextSettingChanged(TextBox.value, TextBox.id)
  })
}

// Handles Setting Submit Input
for (let i = 0; i < ToggleSubmitButtons.length; i++) {
  const Button = ToggleSubmitButtons[i]
  Button.addEventListener("click", function() {
    const InputBox = Button.parentElement.querySelector(".tog-submit-textbox")
    HandleSubmitSettingChanged(InputBox.value, Button)
  })
}

// Final Setup
for (let i = 0; i < PieceIcons.length; i++) { // Removes Left Over Piece Icons Left From Refreshing
  PieceIcons[i].src = ""
}
DisplaySelectedIcon(LeftTab.children, 0, 0)
DisplaySelectedIcon(RightTab.children, 1, 1)
TurnImage.src = CurrentImgs[0]
VersionNumber.textContent = CurrentVersion
GameTitle.textContent = GameName + " " + CurrentVersion