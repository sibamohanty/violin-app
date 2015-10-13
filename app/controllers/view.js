import Ember from 'ember';
export default Ember.ObjectController.extend({
  someProperty : '',
  actions : {
    show_test : function (){
      this.transitionToRoute('result');
  },
  exit_test : function (){
    this.transitionToRoute('login');
   }
}
});
