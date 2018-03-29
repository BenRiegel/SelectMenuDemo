import NewSelectMenu from "../../select_menu/public/SelectMenu.js";


//private variables ------------------------------------------------------------

var selectMenu;
var optionNameNode;
var buttonListNode;


//private functions ------------------------------------------------------------

var clickHandler = function(evt){
  var clickedButtonId = evt.target.id;
  switch (clickedButtonId){
    case "enable":
      selectMenu.enable();
      break;
    case "disable":
      selectMenu.disable();
      break;
    case "open":
      selectMenu.open();
      break;
    case "close":
      selectMenu.close();
      break;
    case "enable-animations":
      selectMenu.setAnimationOption(true);
      break;
    case "disable-animations":
      selectMenu.setAnimationOption(false);
      break;
    default:
      break;
  }
};

var showNewMenuOption = function(newMenuOption){
  optionNameNode.textContent = newMenuOption;
};


//private code block -----------------------------------------------------------

window.addEventListener("load", () => {

  const selectMenuConfigProperties = {
    rootNodeId: "select-menu-1",
    placeholderOption: "Select Option",
    animations: true,
  };
  selectMenu = NewSelectMenu(selectMenuConfigProperties);

  optionNameNode = document.getElementById("option-name");
  optionNameNode.textContent = "null";
  buttonListNode = document.getElementById("button-list");
  buttonListNode.addEventListener("click", clickHandler);

  selectMenu.addEventListener(["newMenuOptionSelected"], showNewMenuOption);

  for (let i = 0; i < 10; i += 1){
    selectMenu.addOption(i, `Option ${i}`);
  }

});
