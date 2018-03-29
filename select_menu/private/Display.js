import NewAnimation from "../../lib/Animation.js";


var NewDisplay = function(eventDispatcher, rootNodeId){

  //private, configurable constants --------------------------------------------

  const ANIMATION_TIME = 200;


  //private variables ----------------------------------------------------------

  var rootNode;
  var optionNodes;
  var optionLabelNodes;
  var maxOptionLabelNodeWidth;
  var currentSelectedOptionNode;
  var animateOpenClose;


  //private functions ----------------------------------------------------------

  var resizeOptionLabelNodes = function(width){
    optionLabelNodes.forEach(function(node){
      node.style.width = `${width}px`;
    });
  };

  var adjustOptionNodeWidths = function(newOptionNode){
    var labelNode = newOptionNode.querySelector(".label");
    if (labelNode.offsetWidth > maxOptionLabelNodeWidth){
      maxOptionLabelNodeWidth = labelNode.offsetWidth;
      resizeOptionLabelNodes(maxOptionLabelNodeWidth);
    }
    labelNode.style.width = `${maxOptionLabelNodeWidth}px`;
    optionLabelNodes.push(labelNode);
  };

  var NewOptionNode = function(value, htmlStr){
    var containerNode = document.createElement("div");
    containerNode.dataset.value = value;
    if (value == "null"){
      containerNode.classList.add("placeholder");
    }
    var labelNode = document.createElement("div");
    labelNode.innerHTML = htmlStr;
    labelNode.classList.add("label");
    var iconNode = document.createElement("div");
    iconNode.classList.add("icon-container");
    containerNode.appendChild(labelNode);
    containerNode.appendChild(iconNode);
    return containerNode;
  };


  //private code block ---------------------------------------------------------

  rootNode = document.getElementById(rootNodeId);
  rootNode.classList.add("select-menu");
  optionNodes = [];
  optionLabelNodes = [];
  maxOptionLabelNodeWidth = 0;
  currentSelectedOptionNode = null;
  animateOpenClose = false;


  //public properties and methods ----------------------------------------------

  return {

    rootNode: rootNode,

    addOption: function(value, htmlStr){
      var newOptionNode = NewOptionNode(value, htmlStr);
      this.rootNode.appendChild(newOptionNode);
      adjustOptionNodeWidths(newOptionNode);
      newOptionNode.classList.add("option");
      optionNodes.push(newOptionNode);
    },

    unselectCurrentOption: function(optionName){
      currentSelectedOptionNode.classList.remove('selected');
      currentSelectedOptionNode = null;
    },

    selectNewOption: function(optionName){
      currentSelectedOptionNode = this.rootNode.querySelector(`[data-value="${optionName}"]`);
      currentSelectedOptionNode.classList.add('selected');
      eventDispatcher.broadcast("currentSelectedOptionChanged", optionName);
    },

    setAnimationOpenCloseOption: function(value){
      animateOpenClose = value;
    },

    expand: function(){
      this.rootNode.classList.add("open");
      eventDispatcher.broadcast("openStateChanged", "opening");
      var animationTime = (animateOpenClose) ? ANIMATION_TIME : 0;
      var animation = NewAnimation(animationTime);
      animation.cycleFunction = function(totalProgress){
        optionNodes.forEach(function(node){
          if (node.classList.contains("selected") == false){
            node.style.height = `${25 * totalProgress}px`;
            node.style.lineHeight = `${25 * totalProgress}px`;
          } else {
            node.style.height = `${25}px`;
            node.style.lineHeight = `${25}px`;
          }
        });
      };
      animation.callbackFunction = function(){
        eventDispatcher.broadcast("expansionComplete");
      };
      animation.run();
    },

    fadeIn: function(){
      var animationTime = (animateOpenClose) ? ANIMATION_TIME : 0;
      var animation = NewAnimation(animationTime);
      animation.cycleFunction = function(totalProgress){
        optionNodes.forEach(function(node){
          if (node.classList.contains("selected") == false){
            node.style.opacity = `${totalProgress}`;
          }
        });
      };
      animation.callbackFunction = function(){
        eventDispatcher.broadcast("openStateChanged", "open");
      };
      animation.run();
    },

    fadeOut: function(){
      eventDispatcher.broadcast("openStateChanged", "closing");
      var animationTime = (animateOpenClose) ? ANIMATION_TIME : 0;
      var animation = NewAnimation(animationTime);
      animation.cycleFunction = function(totalProgress){
        optionNodes.forEach(function(node){
          if (node.classList.contains("selected") == false){
            node.style.opacity = `${1 - totalProgress}`;
          }
        });
      };
      animation.callbackFunction = function(){
        eventDispatcher.broadcast("fadeOutComplete");
      };
      animation.run();
    },

    contract: function(){
      var animationTime = (animateOpenClose) ? ANIMATION_TIME : 0;
      var animation = NewAnimation(animationTime);
      animation.cycleFunction = function(totalProgress){
        optionNodes.forEach(function(node){
          if (node.classList.contains("selected") == false){
            node.style.height = `${25 - 25 * totalProgress}px`;
            node.style.lineHeight = `${25  - 25 * totalProgress}px`;
          }
        });
      };
      animation.callbackFunction = () => {
        this.rootNode.classList.remove("open")
        eventDispatcher.broadcast("closingComplete");
        eventDispatcher.broadcast("openStateChanged", "closed");
      };
      animation.run();
    },

  };

};


//exports function -------------------------------------------------------------

export default NewDisplay;
