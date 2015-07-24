export default Ember.ObjectController.extend({
  someProperty : '',
  actions : {
    go_to_test : function (){
        this.transitionToRoute('questions');
        
    //  this.transitionToRoute('testpage');
  }

  }

});
