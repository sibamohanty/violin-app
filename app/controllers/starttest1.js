export default Ember.ObjectController.extend({
  someProperty : '',
  time_left : "30",
  startTimer: function (){
    var secTimer = new Timer();
    return secTimer;
  },
  actions : {
    submit_answer : function (){
      console.log("update the current quesion model and show next question");
        //this.transitionToRoute('mainpage');

    //  this.transitionToRoute('testpage');
    },
    Previous_back : function (){
      //this.transitionToRoute('testpage');
      console.log("Will go to the next quesiton");

    },
    skip_question : function (){
      //this.transitionToRoute('testpage');
      console.log("Will go to the next quesiton");

    },
    Terminate_Test: function (){
      this.transitionToRoute('terminate');

    }
  }
  //onstartTimer()
  });
