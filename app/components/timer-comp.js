import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  secondsElapsed : 1,
  maxTime : 10,

  timeLeft: computed('secondsElapsed', function() {
      return this.get('secondsElapsed');
  }),
  maxTimeReached : function (){
    if (this.get('timeLeft') == this.get('maxTime')) {
      return true;
    }
    else{
      return false;
    }
  },
  stopTimer : function (){
    if (this.maxTimeReached()){
      clearInterval(this.smallTimer);
    }
  },
  resetTimer : function (){
    if (this.maxTimeReached()){
      this.set('timeLeft', 0);
    }

  },
  smallTimer : {},
  didInsertElement : function() {
    var that = this;
    this.smallTimer = setInterval(function(){ that.incrementProperty('timeLeft');
                                              //that.stopTimer();
                                              that.resetTimer();
                                              }, 1000,that);
  }


});
