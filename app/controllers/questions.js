export default Ember.ObjectController.extend({
  someProperty : '',
  actions : {
    start_test : function (){
        this.transitionToRoute('mainpage');
        //var timer = App.Timer.create();
    //  this.transitionToRoute('testpage');
  },
    go_back : function (){
      this.transitionToRoute('testpage');

  }
  }

});
