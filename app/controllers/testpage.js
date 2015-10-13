export default Ember.ObjectController.extend({
  someProperty : '',
  actions : {
  TestLaunch : function (){
        this.transitionToRoute('testlaunch');
    //  this.transitionToRoute('testpage');
  //  this.transitionToRoute('Check1');

},
TestRepeat: function(){

    this.transitionToRoute('starttest');
}
  }

});
