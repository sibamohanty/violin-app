export default Ember.ObjectController.extend({
  actions : {
    Confirm_Terminate : function (){
      this.transitionToRoute('login');
    },
    Back_Test : function (){
      this.transitionToRoute('starttest');
    }
  }
  });
