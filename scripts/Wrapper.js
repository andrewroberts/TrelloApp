var Wrapper_ = {
  
  wrapObjects: function(app, wrapper, wrappeds) {
  
    var newObjects = new Array();
    
    if (wrappeds != null) {
      
      for (var i = 0; i < wrappeds.length; i++) {
      
        var newObject = this.wrapObject(app, wrapper, wrappeds[i]);
        newObjects.push(newObject);
      }
    }
    
    return newObjects;
  },
  
  wrapObject: function(app, wrapper, wrapped) {
  
    if (wrapped == null) {
      wrapped = new Object();
    }
    
    var w = Object.create(wrapper);
    w.wrapped = wrapped;
    w.app = app;
    return w;
  },
 
} // Wrapper_

