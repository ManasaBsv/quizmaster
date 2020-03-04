window.console = window.console || function(t) {};

if (document.location.search.match(/type=embed/gi)) {
    window.parent.postMessage("resize", "*");
  }

function glow()
{
const target = window.document.getElementsByTagName('h1')[0];

const flickerLetter = letter => `<span style="animation: text-flicker-in-glow ${Math.random() * 4}s linear both ">${letter}</span>`;
const colorLetter = letter => `<span style="color: hsla(${Math.random() * 360}, 100%, 80%, 1);">${letter}</span>`;
const flickerAndColorText = (text) =>
text.
split('').
map(flickerLetter).
map(colorLetter).
join('');
const neonGlory = target => target.innerHTML = flickerAndColorText(target.textContent);

neonGlory(target);
target.onclick = ({ target }) => neonGlory(target);
}
    
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
var colorA = document.querySelector('.optionA');
var colorB = document.querySelector('.optionB');
var colorC = document.querySelector('.optionC');
var colorD = document.querySelector('.optionD');
var q = document.querySelector('.card');

let questions = [
    {
        question : "What does HTML stand for? avfhkfjskjolsa;qkwepiqwoeikhdjwmwfns,v",
        
        choiceA : "Correct",
        choiceB : "Wrong",
        choiceC : "Wrong",
        choiceD : "abcd",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        
        choiceA : "Wrong",
        choiceB : "Correct",
        choiceC : "Wrong",
        choiceD : "abcd",
        correct : "B"
    },{
        question : "What does JS stand for?",
        
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        choiceD : "abcd",
        correct : "C"
    }
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
let score = 0;
const questionTime = 10;
var deadline = new Date(Date.parse(new Date()) + 10000);
var timeinterval;
let TIMER;

function renderQuestion(){
    let q = questions[runningQuestion];
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}


function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var s = Math.floor(t / 1000 % 60);
    var m = Math.floor(t / 1000 / 60 % 60);
    return {
    'total': t,
    'minutes': m,
    'seconds': s };
    }
    
    function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var mSpan = clock.querySelector('.minutes');
    var sSpan = clock.querySelector('.seconds');
    
    function updateClock() {
    var t = getTimeRemaining(endtime);
    
    mSpan.innerHTML = ('0' + t.minutes).slice(-2);
    sSpan.innerHTML = ('0' + t.seconds).slice(-2);
    
    if(t.total<=0) {
    clearInterval(timeinterval);
    }
    
    }
    updateClock();
    timeinterval = setInterval(updateClock, 1000);
    }

  colorA.onclick = function () {
    recolour(colorB);
    recolour(colorC);
    recolour(colorD);
  this.style.backgroundColor = "#ae38c5b4";
  this.style.color = "white";
  if( 'A' == questions[runningQuestion].correct)
        score++;
}

colorB.onclick = function () {
  recolour(colorA);
    recolour(colorC);
    recolour(colorD);
  this.style.backgroundColor = "#ae38c5b4";
  this.style.color = "white";
  if( 'B' == questions[runningQuestion].correct)
        score++;
}

colorC.onclick = function () {
  recolour(colorB);
    recolour(colorA);
    recolour(colorD);
  this.style.backgroundColor = "#ae38c5b4";
  this.style.color = "white";
  if( 'C' == questions[runningQuestion].correct)
        score++;
}

colorD.onclick = function () {
  recolour(colorB);
    recolour(colorC);
    recolour(colorA);
  this.style.backgroundColor = "#ae38c5b4";
  this.style.color = "white";
  if( 'D' == questions[runningQuestion].correct)
        score++;
}
    
function recolour(colour){
  colour.style.backgroundColor = "white";
  colour.style.color = "black";
}  


function startQuiz(){
  initializeClock('box', new Date(Date.parse(new Date()) + qTime()*1000));
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
}

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

function qTime(){
  if(runningQuestion == 0)
  return 10;
  if(runningQuestion == 1)
  return 15;
  if(runningQuestion == 2)
  return 20;
}

function renderCounter(){
    if(count <= qTime())
        count++;
    else{
      nextQuestion();
    }
}

let cardTransitionTime = 1000;
let $card = $('.js-card');

function nextQuestion(){
  count = 0;
  recolour(colorA);
  recolour(colorB);
    recolour(colorC);
    recolour(colorD);
  if(runningQuestion < lastQuestion){
            runningQuestion++;
            $card.addClass('js-card is-switched');
            window.setTimeout(function () {
              $card.removeClass('js-card is-switched');
              }, cardTransitionTime);
            renderQuestion();
            clearInterval(timeinterval);
            initializeClock('box', new Date(Date.parse(new Date()) + qTime()*1000));
        }else{
            clearInterval(TIMER);
            clearInterval(timeinterval);
            next();
            scoreRender();
        }
}

function next()
{
  var count = 2;
  setInterval(function(){
      count--;
      if (count == 0) {
          window.location = 'cong.html'; 
        }
    },1000);
}

function scoreRender(){
    //scoreDiv.style.display = "block";
    const scorePerCent = Math.round(100 * score/questions.length);
    scoreDiv.innerHTML += scorePerCent +"%</p>";
}
