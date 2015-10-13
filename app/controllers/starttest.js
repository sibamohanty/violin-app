import Ember from 'ember';
//import ember-truth-helpers;
export default Ember.ArrayController.extend({
    attemptedQuestion:0,
    count : 0,
    countQuestion:0,
    someproperty:"hello",
    skippedQuestion:0,
    reachedTimeLimit : false,
    timeTakenPerQuestion: 0,
    startTime:0,
    stopTime:0,
    timeOver:false,
    divHeight:200,
    divWidth:15,
    buttonSize:5,
    noOfRows:0,
    noOfColumns:0,
    testCompleted:false,

    questionList : function (){
        return this.store.find('questionList');
    },

    totalNumberOfQuestion: function (){
        return this.get('model').get('length');
    }.property('countQuestion'),

    questionStatus : function (){
        return this.get('questionText').questionStatus;
    }.property('questionText'),

    setQuestionStatus : function (value,id){
        this.set("questionStatus", value);
        this.store.findRecord('question', id).then(function(item){
            item.set('questionStatus', value);
        });
    },

    totalQuestionNumber:function(){
        return this.get('model').get('length');
    }.property('count'),


    qCount : function (){
        return this.get('count')+1;
    }.property('count'),

    mcma : function (){
      if (this.get('questionText').qtype === 'mcma'){
          return true;
      }
      else return false;
    }.property ('questionText'),

    /*subjective:function(){
        if (this.get('questionText').qtype === 'subjective'){
            return true;
        }
        else return false;
    }.property ('questionText'),*/


    mcsa : function (){
        if (this.get('questionText').qtype === 'mcsa')
            return true;
        else
            return false;
    }.property('questionText'),

    questionNumber : function(){
       return this.get('qCount');
   }.property('qCount'),

    questionText : function(){
      var q= [];
      this.get('model').forEach(function (item){
         var qText = {};
         qText.question = item.get('question');
         qText.ans = item.get('answerChoice');
         qText.qtype = item.get('qtype');
         qText.selectedOnes = item.get('selectedOnes');
         qText.clickedOnes=item.get('clickedOnes');
         qText.timeTaken = item.get('timeTaken');
         qText.correctQuestionMarks=item.get('correctQuestionMarks');
         qText.questionStatus = item.get('questionStatus');
         q.push(qText);
     });
     return q[this.get('count')];
  }.property('count'),
   onTimeComplete: function (){
       //console.log(this.get('timeTaken'));
       if (this.get('timeTaken')>= this.get('timeLimit')){
          this.onTestComplete();
       }
   }.observes('timeLeft'),

   onTestComplete : function (){
       this.set('testCompleted',true);
       this.saveData();
       this.set('timeOver',true);
   },

   timeLeft : function (){
       return this.get('timeLimit') ;
   }.property('timeLimit', 'timeLeft'),

   timeTaken : function (){
       return this.get('timeLimit')-this.get('timeLeft');
   }.property('timeLeft', 'timeLimit'),

   timeLimit :190,
    answerText : function(){
     if (this.get('questionText').qtype =='mcma'){
      }
     else {
       }
      return this.get('questionText').ans;
    }.property('questionText'),

   questionType:function(){
    return this.get('questionText').qtype;
    }.property('questionText'),

    prev : function (){
       var previous;
       this.get('model').forEach(function(item){
           if (item.get('previous') === true){
               previous = item;
           }
           //else previous = null;
       });
       return previous;
   }.property('count','testCompleted'),

    calculateTimeTakenPerQuestion : function(){
        var timeTaken = this.get('timeTaken');
        //console.log(this.get('prev').get('previous'));
        var prev = this.get('prev');
        prev.set('stopTime', timeTaken);

        console.log(prev.get('totalTimeSpent'))
        console.log(prev.get('timeSpent'));
        console.log(prev.get('id'))
        console.log(this.get('qCount'));
        prev.set('previous', false);
        /*if(this.get('qCount') !== this.get('totalQuestionNumber')){

        }*/
        this.store.findRecord('question',this.get('qCount')).then(function(item){
            item.set('startTime', timeTaken);
            item.set('previous',true);
        });
   }.observes('count'),
   updateTimeForLastQuestion : function (){
       console.log("LastQuestion");
       this.get('prev').set('stopTime',this.get('timeTaken'));
       console.log(this.get('prev').get('id'));
   }.observes('testCompleted'),

    saveData : function (){
       this.get('model').set('timeTaken',this.get('timeTaken'));
       this.get('model').forEach(function (item){
               item.save();
       });
   },

   onSubmitClick : function (){
       this.saveData();
       this.incrementProperty('attemptedQuestion');
       this.setQuestionStatus('attempted',this.get('qCount'));
   },
    init : function (){
       this._super.apply(this);
       this.store.findRecord('question',1).then( function(item){
          item.set('previous', true);
          item.set('startTime', 0 );
         // item.save();
      });
     },

     actions: {

       submit_answer : function (){

          // this.onSubmitClick();
          this.setQuestionStatus('attempted',this.get('qCount'));
          this.incrementProperty('attemptedQuestion');
           if(this.get('model').get('length') === this.get('qCount')){
                //this.set('testCompleted',true);
                //this.incrementProperty('attemptedQuestion');
                this.onTestComplete();
                //this.transitionToRoute('result');
           }else {

                this.incrementProperty('count');
           }
         },

         previous_back : function (){
           this.decrementProperty('count');
           this.decrementProperty('attemptedQuestion');
           this.decrementProperty('skip_question');
           if(this.get('qCount') === 0){
               this.transitionToRoute('testlaunch');
           }
         },
         skip_question : function (){
             if(this.get('model').get('length') === this.get('qCount')){
                  this.saveData();
                  this.incrementProperty('skippedQuestion');
                  //this.set('testCompleted',true);
                  this.transitionToRoute('result');
             }else {
                 this.setQuestionStatus('skipped',this.get('qCount'));
                 this.incrementProperty('skippedQuestion');
                 this.incrementProperty('count');
             }
         },
         jumpTo : function(num){
             //console.log("control " +num);
             let c = num-1;
             this.set('count',c);
         },
         Terminate_Test: function (){
           this.transitionToRoute('terminate');
         },
         show_test : function (){
          this.transitionToRoute('result');
         },
         exit_test : function (){
          this.transitionToRoute('login');
      }
     }
});
