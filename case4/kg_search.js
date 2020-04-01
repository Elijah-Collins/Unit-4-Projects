"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Case Problem 4

   Wordsearch Game Script
   
   Filename: kg_search.js
   Author: Pete Burnham
   Date:   2018-03-01
   
   
   Global Variables
   
   allCells
      References all of the cells in the word search table
      
   found
      Stores a Boolean value indicating whether the currently
      selected letters represents a word in the word search list.
   
   Function List
   
   function drawWordSearch(letters, words)
      Returns the HTML code for a word search table based on the entries
      in the letters array and the location of the words
      in the words array
      
   showList(list)
      Returns the HTML for code for an unordered list of words based
      on the items in the list array

*/

/* Places in cells and leaves them unmarked. */
var allCells;
var found = false;

/* initialized all content as the window is loaded. */
window.onload = init;

function init() {
   document.querySelectorAll("aside h1")[0].innerHTML = wordSearchTitle;
   document.getElementById("wordTable").innerHTML = drawWordSearch(letterGrid, wordGrid);
   document.getElementById("wordList").innerHTML = showList(wordArray);
   
   allCells = document.querySelectorAll("table#wordSearchTable td");
   
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].style.cursor = "pointer";
      allCells[i].addEventListener("mousedown", startRecording);
   }
   /* The given fuction will alert you as the puzzle is finished by the user. */
   document.getElementById("wordSearchTable").onmouseup = function() {
      stopRecording();
      var wordList = document.querySelectorAll("ul#wordSearchList li");
      var solved = true;
      for (var i = 0; i < wordList.length; i++) {
         if (wordList[i].style.textDecoration !== "line-through") {
            solved = false;
            break;
         }
      }
      if (solved) {
         alert("You solved the puzzle!");
      }
   };
   /* Upon clicking the function, it will show the answer to the given word search. */
   document.getElementById("showSolution").onclick = function() {
      for (var i = 0; i < allCells.length; i++) {
         if (allCells[i].className === "wordCell") {
            allCells[i].style.backgroundColor = "rgb(191, 191, 255)";
         }
      }
   };

}
/* This and the following function will begin and continue highlighting content that you hover over when you click your mouse. */
function startRecording(e) {
   document.getElementById("pickedLetters").value += e.target.textContent;
   if (e.target.style.backgroundColor !== "rgb(28, 255, 132)") {
      e.target.style.backgroundColor = "rgb(255, 197, 153)";
   }
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].addEventListener("mouseenter", continueRecording);
   }
   e.preventDefault();
}

function continueRecording(e) {
   if (e.target.style.backgroundColor !== "rgb(28, 255, 132)") {
      e.target.style.backgroundColor = "rgb(255, 197, 153)";
   }
   document.getElementById("pickedLetters").value += e.target.textContent;
}

function stopRecording() {
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].removeEventListener("mouseenter", continueRecording);
   }
   checkLetters();
}
  
/* function will check the list in the maketable file to see if the word highlighted is correct. */
function checkLetters() {
   var currentLetters = document.getElementById("pickedLetters").value;
   var wordList = document.querySelectorAll("ul#wordSearchList li");
   for (var i = 0; i < wordList.length; i++) {
      if (currentLetters === wordList[i].textContent) {
         wordList[i].style.textDecoration = "line-through";
         wordList[i].style.color = "rgb(191, 191, 191)";
         found = true;
      }
   }
   
   for (var i = 0; i < allCells.length; i++) {
      if (allCells[i].style.backgroundColor !== "rgb(28, 255, 132)") {
         if (allCells[i].style.backgroundColor === "rgb(255, 197, 153)" && found) {
            allCells[i].style.backgroundColor = "rgb(28, 255, 132)";
         } else {
            allCells[i].style.backgroundColor = "";
         }
      }
   }
   document.getElementById("pickedLetters").value = "";
   found = false;
}



/*============================================================*/

function drawWordSearch(letters, words) {
   var rowSize = letters.length;
   var colSize = letters[0].length;

   var htmlCode = "<table id='wordSearchTable'>";
   htmlCode += "<caption>Word Search</caption>";

   for (var i = 0; i < rowSize; i++) {
      htmlCode += "<tr>";

      for (var j = 0; j < colSize; j++) {
         if (words[i][j] == " ") {
            htmlCode += "<td>";
         } else {
            htmlCode += "<td class='wordCell'>";
         }
         htmlCode += letters[i][j];
         htmlCode += "</td>";
      }

      htmlCode += "</tr>";
   }
   htmlCode += "</table>";

   return htmlCode;
}

function showList(list) {
   var htmlCode = "<ul id='wordSearchList'>";

   for (var i = 0; i < list.length; i++) {
      htmlCode += "<li>" + list[i] + "</li>";
   }

   htmlCode += "</ul>";

   return htmlCode;
}
