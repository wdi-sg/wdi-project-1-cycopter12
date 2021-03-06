function overAll () {
  var words = document.querySelector('.words')
  var score = document.querySelector('.score')
  var timerId = document.querySelector('.time')
  var button = document.querySelector('.btn')
  var error = document.querySelector('.error')
  var reset = document.querySelector('.restart')
  var allWords
  var typed
  var seconds = 60
  var points = 0
  var error_c = 0 // counts the errors
  var global_c = 0 // counts the letters of a word.

  reset.addEventListener('click', function () { location.reload() })

  var list = ['chlordiazepoxide', 'jimmy', 'symmachus', 'picker', 'treelessness',
    'pettishness', 'gangliest', 'saehrimnir', 'gnosticiser', 'circumambience', 'catching', 'precharted', 'permanganic', 'nondivulgence', 'claystone', 'crownpiece', 'alorton', 'predoubt', 'confetti', 'evanescing', 'tenner', 'overaffliction', 'realize', 'ossian',
    'sakhalin', 'eclamptic', 'goldarnedest', 'primine', 'habitacle', 'cogitate', 'transiently', 'interaxis', 'resuit', 'gastrocnemius', 'taking', 'unopted', 'appealer', 'azbine', 'phosphocreatine', 'nalchik', 'gentilesse'
  ]

//create gameStart function
// inside gameStart i will need to initalizae the game with functions of updateTimer and newWords


  function updateTimer () {
    button.disabled = true
    seconds--
    timerId.innerHTML = seconds
    if (seconds === 0) {
      alert('Time is Up! Here is your Score ' + points + '. You commited ' + error_c + ' errors.')
      words.innerHTML = ''
      location.reload()
      // timerId.innerHTML = '30'
      // seconds = 30
    } else {
      setTimeout(updateTimer, 1000)
    }
  }

  function newWord () {
    words.innerHTML = ''
    var randomWordIndex = Math.floor(Math.random() * list.length)
    var randomWord = list[randomWordIndex]

    // randomWord is the word to appear for game
    // for each character in randomWord
    //    create a div, set textContent of div to character
    //    append div into .words DOM Element
    for (var i = 0; i < randomWord.length; i++) {
      var span = document.createElement('span')
      span.textContent = randomWord[i]
      span.className = 'wordsCharacter'
      words.appendChild(span)
    }
    allWords = randomWord
  }

  button.addEventListener('click', function (e) {
      updateTimer()
      newWord()
      button.disabled = true
    })

  function keyCheck (e) {
    // typed = keydown character.toLowerCase
      // find the dom element that we want -> span
      // get char of the dom Element -> toCheck
      // check toCheck === typed
      // if true
      //    highlight
      //    global counter ++
      // else
      //    error
    typed = String.fromCharCode(e.which).toLowerCase()
    // word -> element with class .words -> p dom element
    var whatWeWant = words.querySelectorAll('.wordsCharacter')[global_c] // array of spans
    if (whatWeWant.innerHTML === typed) { // if typed letter is the from the word
      whatWeWant.classList.add('bg')
      global_c++
    } else {
      error_c++
      error.innerHTML = error_c
    }
  // animation for horse movement

    var margin1 = points * 30
    var horsey = document.getElementById('horse')
    horsey.style.marginLeft = margin1 + 'px'

    if (global_c === allWords.length) { // animate character
      global_c = 0
      points++ // increment the points
      score.innerHTML = points // add points to the points div
      setTimeout(function () {
        words.className = 'words' // restart the classes
        newWord() // give another word
        document.addEventListener('keydown', keyCheck)
      }, 200)
    }
  }
  document.addEventListener('keydown', keyCheck)

  return {
    updateTimer:updateTimer,
    newWord:newWord,
    keyCheck:keyCheck
  }
}

window.addEventListener('DOMContentLoaded', function () {
  overAll()
})
