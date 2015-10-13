import Ember from 'ember';
//import ember-truth-helpers;
export default Ember.ArrayController.extend({
    count : 0,
    noOfQuestionAttempted:0,
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
         q.push(qText);
     });
     return q[this.get('count')];
  }.property('count'),

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

   saveData : function (){
       this.get('model').forEach(function (item){
               item.save();
       });
   },
     actions: {
       submit_answer : function (){
           if(this.get('model').get('length') === this.get('qCount')){
                this.saveData();
                //console.log(this.get('noOfQuestionAttempted'));
                this.transitionToRoute('result');
           }else {
               
               this.incrementProperty('count');
           }
         },
         previous_back : function (){
           this.decrementProperty('count');
           if(this.get('qCount') === 0){
               this.transitionToRoute('testlaunch');
           }
         },
         skip_question : function (){
             if(this.get('model').get('length') === this.get('qCount')){
                  this.transitionToRoute('result');
             }else {
                 this.incrementProperty('count');
             }
         },
         jumpTo : function(num){
             let c = num-1;
             this.set('count',c);
         },
         Terminate_Test: function (){
           this.transitionToRoute('terminate');
         }
     }
});
