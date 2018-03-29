import NewEventDispatcher from "../../lib/EventDispatcher.js";
import NewOptions from "../../select_menu/private/Options.js";
import NewStates from "../../select_menu/private/States.js";
import NewDisplay from "../../select_menu/private/Display.js";
import NewUserEvents from "../../select_menu/private/UserEvents.js";
import StartController from "../../select_menu/private/Controller.js";


//==============================================================================

var NewSelectMenu = function(configProperties){


  //private variables ----------------------------------------------------------

  var selectMenu;
  var eventDispatcher;
  var options;
  var states;
  var display;
  var userEvents;


  //private code block ---------------------------------------------------------

  eventDispatcher = {
    private: NewEventDispatcher(),
    public: NewEventDispatcher(),
  };

  options = NewOptions(eventDispatcher.private);
  states = NewStates(eventDispatcher.private);
  display = NewDisplay(eventDispatcher.private, configProperties.rootNodeId);
  userEvents = NewUserEvents(eventDispatcher.private, display.rootNode);
  StartController(eventDispatcher, options, states, display, userEvents);

  selectMenu = {

    addEventListener: function(eventName, listener){
      eventDispatcher.public.listen(eventName, listener);
    },

    open: function(){
      states.open();
    },

    close: function(){
      states.close();
    },

    disable: function(){
      states.disable();
    },

    enable: function(){
      states.enable();
    },

    addOption: function(value, htmlStr){
      value = value.toString();
      options.add(value, htmlStr);
    },

    selectOption: function(option){
      option = option.toString();
      options.select(option);
    },

    setAnimationOption: function(value){
      display.setAnimationOpenCloseOption(value);
    },

  };

  selectMenu.enable();
  if (configProperties.placeholderOption){
    options.addPlaceholder(configProperties.placeholderOption);
    selectMenu.selectOption("null");
  }
  if (configProperties.animations){
    selectMenu.setAnimationOption(configProperties.animations);
  }


  //return public api ----------------------------------------------------------

  return selectMenu;

};


//exports function -------------------------------------------------------------

export default NewSelectMenu;
