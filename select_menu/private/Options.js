var NewOptions = function(eventDispatcher){


  //private variables ----------------------------------------------------------

  var optionsList;
  var currentSelectedOption;
  var newOptionSelected;


  //private code block ---------------------------------------------------------

  optionsList = [];
  currentSelectedOption = null;
  newOptionSelected = false;


  //public properties and methods ----------------------------------------------

  return {

    add: function(option, htmlStr){
      if (optionsList.includes(option)){
        throw `Error: duplicate option value "${option}"`;
      } else {
        optionsList.push(option);
        eventDispatcher.broadcast("addNewOptionRequest", option, htmlStr);
      }
    },

    addPlaceholder: function(text){
      optionsList.push("null");
      eventDispatcher.broadcast("addNewOptionRequest", "null", text);
    },

    select: function(option){
      if (optionsList.includes(option) == false){
        throw `Error: option value "${option}" not found`;
      } else {
        if (currentSelectedOption !== option){
          if (currentSelectedOption){
            eventDispatcher.broadcast("unselectCurrentOptionRequest", currentSelectedOption);
          }
          eventDispatcher.broadcast("selectNewOptionRequest", option);
        }
      }
    },

    updateCurrentSelectedOption: function(newOptionName){
      currentSelectedOption = newOptionName;
      newOptionSelected = true;
    },

    checkNewOptionSelectedStatus: function(){
      if (newOptionSelected){
        eventDispatcher.broadcast("newOptionSelected", currentSelectedOption);
        newOptionSelected = false;
      }
    },

  };

};


//exports function -------------------------------------------------------------

export default NewOptions;
