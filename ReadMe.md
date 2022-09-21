# Pairing Card Game Project

## Getting Started
Choose below listed framework and lauguage (No 3rd party UI library) to implement the following card game (not required to be exactly same on UI)
* React Native with Javascript or Typescript (required)
* Android Native with Java or Kotlin (addons)
* iOS Native with Objective-C or Swift (addons)

## Requirements
* Using constant 'CARD_PAIRS_VALUE' to define and generate pairs of numbers(from 1 to 100) and assign to different cards with random order when app launch
* Card default states is back side up, the cards will turn to front side with animation when player tap it
* If player flop two cards with different number, these 2 card will flip to back side after 1 seconds
* If player flop two cards with same number, these two cards will make as resolved (flop other cards won't affect them)
* When player resolve all the cards, app will show congratulation prompt as demo, after prompt dismiss will restart the game
* Need to record how many steps player has tried as shows as demo
* When play tap 'Restart' button, all the card need to be regenerated and steps counter also reset to 0
* Compatible with different screen size
* Unit test case for key feature codes.

## Bonus Points
In case to improve our code quality and production quality, we have such practices as:

* Build reuse UI as component
* Code is clean and well structured
* Styling it to a production quality level
* Unit test case coverage up to 80% with report
* Linting, code quality scan, etc
* For React Native
    * use react-hooks
    * use redux
* For Android native
    * use MVVM design
    * use AndroidX
    * use Kotlin
* For iOS native
    * use MVVM design
    * build UI programmatically

## License
Kuan-Wah.Teo