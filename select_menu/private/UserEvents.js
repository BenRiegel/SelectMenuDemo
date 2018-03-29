var NewUserEvents = function(eventDispatcher, rootNode){


  //private functions ----------------------------------------------------------

  var getClickedOptionName = function(initNode){
    var currentNode = initNode;
    while (currentNode){
      if (currentNode.classList.contains("option")){
        return currentNode.dataset.value;
      }
      currentNode = currentNode.parentNode;
    }
    return null;
  };

  var containerClickEventHandler = function(evt){
    var clickedOptionName = getClickedOptionName(evt.target);
    eventDispatcher.broadcast("clickedOption", clickedOptionName);
  };


  //public properties and methods ----------------------------------------------

  return {

    disable: function(){
      rootNode.removeEventListener("click", containerClickEventHandler);
      eventDispatcher.broadcast("enabledStateChanged", "disabled");
    },

    enable: function(){
      rootNode.addEventListener("click", containerClickEventHandler);
      eventDispatcher.broadcast("enabledStateChanged", "enabled");
    },

  };

}


//exports function -------------------------------------------------------------

export default NewUserEvents;
