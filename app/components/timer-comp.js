import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  // define maxTestDuration in sec
  //maxTestDuration : 600,
  secondsElapsed : 600,
  dummySeconds : 1,
  maxTime : 1000,
  resetT : null,
  restarted : false,
  killTimer: false,
  minutesLeft : function (){
      return this.my_floor(this.get('secondsElapsed')/60)+" mins : "+ this.get('secondsElapsed')%60+" s";
  }.property('secondsElapsed'),
  my_floor : function (num){
      return Math.floor(num);
  },

  timeLeft: computed('minutesLeft', function() {
      return this.get('minutesLeft');
  }),
  stopTimer : function (){
      clearInterval(this.smallTimer);
      }.observes('killTimer'),
  forceReset : function (){
      //console.log(this.get('secondsElapsed'));
      //this.set('secondsElapsed',0);
      //this.set('restarted',true);
  }.observes('resetT'),

  smallTimer : {},
  didInsertElement : function() {
    var that = this;
    this.smallTimer = setInterval(function(){ that.decrementProperty('secondsElapsed');
                                              //that.resetTimer();
                                              }, 1000,that);
  }
});
