var NewListenEvent = function(subEventsNameList){


  //private variables ----------------------------------------------------------

  var listeners;
  var subEventsFiredLookup;


  //private code block ---------------------------------------------------------

  listeners = [];
  subEventsFiredLookup = {};
  subEventsNameList.forEach(function(name){
    subEventsFiredLookup[name] = false;
  });


  //public properties and methods ----------------------------------------------

  return {

    subEventsFiredLookup: subEventsFiredLookup,

    addListener: function(listener){
      listeners.push(listener);
    },

    broadcast: function(argList){
      listeners.forEach(function(listener){
        listener(...argList);
      });
    },

    clearSubEventsFiredLookup: function(){
      for (var subEventName in this.subEventsFiredLookup){
        this.subEventsFiredLookup[subEventName] = false;
      }
    },
  };
};


//==============================================================================

var NewEventDispatcher = function(){


  //private variables ----------------------------------------------------------

  var broadcastEventRegistry;
  var listenEventRegistry;


  //private functions ----------------------------------------------------------

  var recordBroadcastEventData = function(eventName, data){
    broadcastEventRegistry[eventName] = data;
  };

  var checkAllFired = function(listenEvent){
    var dataArray = [];
    for (var eventName in listenEvent.subEventsFiredLookup){
      if (listenEvent.subEventsFiredLookup[eventName]){
        dataArray = dataArray.concat(broadcastEventRegistry[eventName]);
      } else {
        return;
      }
    }
    listenEvent.broadcast(dataArray);
    listenEvent.clearSubEventsFiredLookup();
  };

  var lookupListenEvent = function(subEventsNameList){
    var lookupName = subEventsNameList.toString();
    if (!listenEventRegistry[lookupName]){
      listenEventRegistry[lookupName] = NewListenEvent(subEventsNameList);
    }
    return listenEventRegistry[lookupName];
  };

  var notifyListenEventRegistry = function(eventName){
    for (var listenEventKey in listenEventRegistry){
      var listenEvent = listenEventRegistry[listenEventKey];
      if (eventName in listenEvent.subEventsFiredLookup){
        listenEvent.subEventsFiredLookup[eventName] = true;
        checkAllFired(listenEvent);
      }
    }
  };


  //private code block ---------------------------------------------------------

  broadcastEventRegistry = {};
  listenEventRegistry = {};


  //public properties and methods ----------------------------------------------

  return {

    broadcast: function(eventName, ...otherArgs){
      recordBroadcastEventData(eventName, otherArgs);
      notifyListenEventRegistry(eventName);
    },

    listen: function(subEventsNameList, listener){
      var listenEvent = lookupListenEvent(subEventsNameList);
      listenEvent.addListener(listener);
    },

  };

};


//exports function -------------------------------------------------------------

export default NewEventDispatcher;
