/*window.onload = setTimeout(function () {
  introductionToMain()
}, 4000);
*/
const backgroundColor = "#040E1E";

const uiHighlightColor = "#7AE4FD";
const uiPrimaryColor = "#79E3FC";
const uiSecondaryColor = "#407A8E";

const textPrimaryColor = "#A0C1CA";
const textSecondaryColor = "#8DAFB4";
const textTertiaryColor = "#637C84";

const strongHighlightColor = "#9FDDF8";
const iconColor = "#74A1B6";

var inIntro = true;


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function flushCss(element) {
  element.offsetHeight;
}

function downloadURI(uri, name)
{
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}

var passwordHash = 1570204103;
//console.log(stringHashCode("4UbFCe"));

function stringHashCode(string) {
  var hash = 0, i, chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

document.addEventListener('DOMContentLoaded',function(event){
  /* INTRODUCTION */

  var timeouts = [];

  {
    function initialize() {
      document.querySelector("body").style.backgroundColor = backgroundColor;
      document.getElementById("body").onclick = function() {
        if(inIntro) switchToPortfolio();
      };

      document.getElementById("download-box-input-field").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          document.getElementById("download-box-button").click();
        }
      });

      timeouts.push(setTimeout(function () {
        startTypingLine(0);
      }, 2500));
    }


    var dataText = ["Greetings", "You must be interested in my work to come here", "Well, then let me introduce myself"];


    function startTypingLine(textIndex) {

      if (textIndex == 0) {
        document.getElementById("intro-line-" + (textIndex)).style.display = "inline";
        timeouts.push(setTimeout(function () {
          typeLine(dataText[textIndex], textIndex, 0);
        }, 2000));
      } else {
        typeLine(dataText[textIndex], textIndex, 0);
      }
    }

    function typeLine(text, textIndex, i) {
      document.querySelector("#intro-line-" + (textIndex) + ">.underscore").style.animation = "none";

      if (i < (text.length)) {
        document.getElementById("intro-text-" + (textIndex)).innerHTML = text.substring(0, i + 1);

        timeouts.push(setTimeout(function () {
          typeLine(text, textIndex, i + 1)
        }, 50 + getRandomInt(80)));
      }

      //line is finished
      else if (textIndex < dataText.length - 1) {
        document.querySelector("#intro-line-" + (textIndex) + ">.underscore").style.animation = "";

        timeouts.push(setTimeout(function () {
          nextLine(textIndex)
        }, 2000));
      }
      //intro is finished
      else {
        document.querySelector("#intro-line-" + (textIndex) + ">.underscore").style.animation = "";

        timeouts.push(setTimeout(function () {
          body.style.transition = "background-color 10s ease-in";
          document.getElementById("body").style.backgroundColor = "#407A8E";
        }, 1000));

        typeDots(text, textIndex, i);

        timeouts.push(setTimeout(function () {
          document.getElementById("introduction-flasher").style.display = "inline";
          document.getElementById("portfolio").style.display = "flex";
          timeouts.push(setTimeout(function () {
            switchToPortfolio();
            document.getElementById("introduction-flasher").style.display = "none";
          }, 250));
        }, 4000));
      }
    }

    function typeDots(text, textIndex) {
      timeouts.push(setTimeout(function () {
        document.getElementById("intro-text-" + (textIndex)).innerHTML = document.getElementById("intro-text-" + (textIndex)).innerHTML + ".";
        timeouts.push(setTimeout(function () {
          document.getElementById("intro-text-" + (textIndex)).innerHTML = document.getElementById("intro-text-" + (textIndex)).innerHTML + ".";
          timeouts.push(setTimeout(function () {
            document.getElementById("intro-text-" + (textIndex)).innerHTML = document.getElementById("intro-text-" + (textIndex)).innerHTML + ".";
          }, 1000));
        }, 1000));
      }, 1500));
    }

    function nextLine(textIndex) {

      document.querySelector("#intro-line-" + (textIndex) + ">.underscore").style.display = "none";

      var previousLineStyle = document.getElementById("intro-line-" + (textIndex)).style;
      previousLineStyle.color = uiSecondaryColor;
      previousLineStyle.textShadow = "0 0 3px " + uiSecondaryColor;
      previousLineStyle.marginBottom = "0.2em";

      document.getElementById("intro-line-" + (textIndex + 1)).style.display = "inline";
      timeouts.push(setTimeout(function () {
        startTypingLine(textIndex + 1)
      }, 500));
    }
  }
  /* INTRODUCTION END */

  function switchToPortfolio() {
    document.getElementById("introduction").style.display = "none";
    document.getElementById("portfolio").style.display = "flex";
    setTimeout(function () {
      // LMAO IT SKIPS TRANSITIONS
      var body = document.getElementById("body");
      body.style.transition = "none";
      body.style.backgroundColor = "#02070f"; //#02070f, #224456
      body.style.overflow = "hidden";
      //flushCss(body);
      body.style.backgroundColor = backgroundColor;
      body.style.transition = "background-color 0.4s ease-in-out";

      document.getElementById("portfolio").style.filter = "blur(0px) contrast(100%)";
      document.getElementById("portfolio").style.transform = "scaleY(1)";
      setTimeout(function () {
        document.getElementById("portfolio-tracker").style.transform = "scaleX(1)";
        setTimeout(function () {
          document.getElementById("body").style.overflow = "";
        }, 500);
      }, 100);
    }, 10);
    inIntro = false;

    //clears all introduction timeouts
    for (var i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
    timeouts = [];
  }


  document.getElementById("info-box-wrapper").style.display = "none";
  document.getElementById("introduction").style.display = "flex";
  setTimeout(function () {
    initialize();
  }, 50);
});

var downloaded = false;

function downloadAnimation() {
  var inputPassword = document.getElementById("download-box-input-field").value;
  if(stringHashCode(inputPassword) != passwordHash) {
    var inputField = document.getElementById("download-box-input-field");
    inputField.value = "";
    inputField.style.backgroundColor = "red";
    inputField.style.borderColor = "red";
    setTimeout(function () {
      inputField.style.backgroundColor = "";
      inputField.style.borderColor = "";
    }, 125);
    return;
  }
  if(downloaded) return;
  var input = document.getElementById("download-box-input-field").style;
  var loader = document.getElementById("download-loader").style;

  input.transform = "rotateY(90deg)";
  setTimeout(function () {
    input.display = "none";
    loader.display = "flex";
    setTimeout(function () {
      loader.transform = "rotateY(0deg)";
      setTimeout(function () {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'doc/CV Frackiewicz.pdf');
        xhr.responseType = "blob";

        xhr.onload = function () {
          saveData(this.response, 'CV Frackiewicz');
        };
        xhr.send();
        downloaded = true;
      }, 1500);
    }, 10);
  }, 200);
}

function showDownloadBox() {
  downloaded = false;

  var box = document.getElementById("download-box-wrapper").style;
  box.filter = "blur(5px) contrast(400%)";
  box.display = "inline";
  box.transition = "";

  setTimeout(function () {
    box.filter = "blur(0px) contrast(100%)";
    box.transform = "scaleY(1)";
  }, 10);

}

function closeDownloadBox() {
  var box = document.getElementById("download-box-wrapper").style;
  box.transition = "transform 0.1s ease-out";
  box.transform = "scaleY(0)";

  setTimeout(function () {
    box.display = "none";

    document.getElementById("download-box-input-field").style.transform = "rotateY(0)";
    document.getElementById("download-box-input-field").style.display= "inline";
    document.getElementById("download-loader").style.display = "none";
    document.getElementById("download-loader").style.transform = "rotateY(-90deg)";
  }, 210);

}

function saveData(blob, fileName)
{
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";

  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

var currentPage = 1;

var minPage = 1;
var maxPage = 2;

function previousPage() {
  if (currentPage > minPage) {
    document.getElementById("pages").style.transform = "rotateX(90deg)";
    document.getElementById("pages").style.backgroundColor = uiPrimaryColor;
    document.getElementById("pages").style.filter = "blur(2px)";
    currentPage--;

    setTimeout(function () {
      document.getElementById("page-" + (currentPage+1)).style.display = "none";
      document.getElementById("page-" + currentPage).style.display = "inline";
      document.getElementById("pages").style.transform = "";
      document.getElementById("pages").style.backgroundColor = "";
      document.getElementById("pages").style.filter = "";
    }, 100);

    var pageControlsNext = document.getElementById("page-controls-next").style;
    pageControlsNext.color = uiPrimaryColor;
    pageControlsNext.textShadow = "0px 0px 5px " + uiPrimaryColor;
    pageControlsNext.cursor = "pointer";
    if (currentPage == minPage) {
      var pageControlsPrevious = document.getElementById("page-controls-previous").style;
      pageControlsPrevious.color = uiSecondaryColor;
      pageControlsPrevious.textShadow = "0px 0px 3px " + uiSecondaryColor;
      pageControlsPrevious.paddingRight = "";
      pageControlsPrevious.cursor = "auto";
      document.getElementById("page-controls").style.paddingRight = "";
    }
  }
}
function nextPage() {
  if(currentPage < maxPage) {
    document.getElementById("pages").style.transform = "rotateX(90deg)";
    document.getElementById("pages").style.backgroundColor = uiPrimaryColor;
    document.getElementById("pages").style.filter = "blur(2px)";
    currentPage++;

    setTimeout(function () {
      document.getElementById("page-" + (currentPage-1)).style.display = "none";
      document.getElementById("page-" + currentPage).style.display = "inline";
      document.getElementById("pages").style.transform = "";
      document.getElementById("pages").style.backgroundColor = "";
      document.getElementById("pages").style.filter = "";
    }, 100);

    var pageControlsPrevious = document.getElementById("page-controls-previous").style;
    pageControlsPrevious.color = uiPrimaryColor;
    pageControlsPrevious.textShadow = "0px 0px 5px " + uiPrimaryColor;
    pageControlsPrevious.cursor = "pointer";
    if (currentPage == maxPage) {
      var pageControlsNext =document.getElementById("page-controls-next").style;
      pageControlsNext.color = uiSecondaryColor;
      pageControlsNext.textShadow = "0px 0px 3px " + uiSecondaryColor;
      pageControlsNext.paddingLeft = "";
      pageControlsNext.cursor = "auto";
      document.getElementById("page-controls").style.paddingLeft = "";
    }
  }
}

function previousPageHover() {
  if (currentPage == minPage) return;

  document.getElementById("page-controls-previous").style.paddingRight = "15px";
  document.getElementById("page-controls").style.paddingRight = "15px";
}

function nextPageHover() {
  if (currentPage == maxPage) return;

  document.getElementById("page-controls-next").style.paddingLeft = "15px";
  document.getElementById("page-controls").style.paddingLeft = "15px";
}

function resetPageControls() {
  document.getElementById("page-controls-previous").style.paddingRight = "";
  document.getElementById("page-controls").style.paddingRight = "";

  document.getElementById("page-controls-next").style.paddingLeft = "";
  document.getElementById("page-controls").style.paddingLeft = "";
}
