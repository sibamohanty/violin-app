import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({

    actions :{
        show_test : function (){
         this.sendAction('show_test');
      },
        exit_test : function (){
         this.sendAction('exit_test');
       }
    }
});
