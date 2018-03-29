var NewAnimation = function(duration){


  //private variables ----------------------------------------------------------

  var startTimeStamp;


  //private functions ----------------------------------------------------------

  var cycle = function(){
    var currentTimeStamp = new Date().getTime();
    var currentRunTime = currentTimeStamp - startTimeStamp;
    var totalProgress = currentRunTime / duration;
    totalProgress = Math.min(totalProgress, 1);
    this.cycleFunction(totalProgress);

    if (currentRunTime < duration){
      requestAnimationFrame( () => {
        cycle.call(this);
      });
    } else {
      if (this.callbackFunction){
        this.callbackFunction();
      }
    }
  };


  //public properties and methods ----------------------------------------------

  return {

    cycleFunction: null,

    callbackFunction: null,

    run: function(){
      if (this.cycleFunction){
        startTimeStamp = new Date().getTime();
        requestAnimationFrame( () => {
          cycle.call(this);
        });
      }
    },

  };

};


//exports function -------------------------------------------------------------

export default NewAnimation;
