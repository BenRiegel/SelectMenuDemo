var StartController = function(eventDispatcher, options, states, display, userEvents){

  eventDispatcher.private.listen(["currentSelectedOptionChanged"], function(newOption){
    options.updateCurrentSelectedOption(newOption);
  });

  eventDispatcher.private.listen(["clickedOption"], function(option){
    options.select(option);
    states.toggleOpenState();
  });

  eventDispatcher.private.listen(["openStateChanged"], function(newState){
    if (newState == "open" || newState == "closed"){
      states.enable();
    } else {
      states.disable();
    }
  });

  eventDispatcher.private.listen(["enabledStateChanged"], function(newState){
    states.updateEnabledState(newState);
  });

  eventDispatcher.private.listen(["openStateChanged"], function(newState){
    states.updateOpenState(newState);
  });

  eventDispatcher.private.listen(["clickedMenu"], function(){
    states.toggleOpenState();
  });

  eventDispatcher.private.listen(["addNewOptionRequest"], function(newOption, htmlStr){
    display.addOption(newOption, htmlStr);
  });

  eventDispatcher.private.listen(["unselectCurrentOptionRequest"], function(currentSelectedOptionName){
    display.unselectCurrentOption(currentSelectedOptionName);
  });

  eventDispatcher.private.listen(["selectNewOptionRequest"], function(optionName){
    display.selectNewOption(optionName);
  });

  eventDispatcher.private.listen(["openRequest"], function(){
    display.expand();
  });

  eventDispatcher.private.listen(["expansionComplete"], function(){
    display.fadeIn();
  });

  eventDispatcher.private.listen(["closeRequest"], function(){
    display.fadeOut();
  });

  eventDispatcher.private.listen(["fadeOutComplete"], function(){
    display.contract();
  });

  eventDispatcher.private.listen(["disableRequest"], function(){
    userEvents.disable();
  });

  eventDispatcher.private.listen(["enableRequest"], function(){
    userEvents.enable();
  });

  eventDispatcher.private.listen(["closingComplete"], function(){
    options.checkNewOptionSelectedStatus();
  });
  
  eventDispatcher.private.listen(["newOptionSelected"], function(newOption){
    eventDispatcher.public.broadcast("newMenuOptionSelected", newOption);
  });

};


//exports function -------------------------------------------------------------

export default StartController;
