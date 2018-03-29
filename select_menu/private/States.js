var NewStates = function(eventDispatcher){


  //private variables ----------------------------------------------------------

  var openState;
  var enabledState;


  //private code block ---------------------------------------------------------

  openState = "closed";
  enabledState = "disabled";


  //public properties and methods ----------------------------------------------

  return {

    enable: function(){
      if (enabledState == "disabled"){
        eventDispatcher.broadcast("enableRequest");
      }
    },

    disable: function(){
      if (enabledState == "enabled"){
        eventDispatcher.broadcast("disableRequest");
      }
    },

    toggleOpenState: function(){
      if (openState == "open" && enabledState == "enabled"){
        eventDispatcher.broadcast("closeRequest");
      } else if (openState == "closed" && enabledState == "enabled"){
        eventDispatcher.broadcast("openRequest");
      }
    },

    open: function(){
      if (openState == "closed" && enabledState == "enabled"){
        eventDispatcher.broadcast("openRequest");
      }
    },

    close: function(){
      if (openState == "open" && enabledState == "enabled"){
        eventDispatcher.broadcast("closeRequest");
      }
    },

    updateOpenState: function(newState){
      openState = newState;
    },

    updateEnabledState: function(newState){
      enabledState = newState;
    },

  };

};


//exports function -------------------------------------------------------------

export default NewStates;
