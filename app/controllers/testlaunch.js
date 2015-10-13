import Ember from 'ember';
export default Ember.ObjectController.extend({
  someProperty : '',
  actions : {
    next_test : function (){
      this.transitionToRoute('starttest');
    }
}
});
