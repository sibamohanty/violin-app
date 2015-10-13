import Ember from 'ember';
//import ember-truth-helpers;
export default Ember.ArrayController.extend({
    count:0,
    correctAnswer:[],
    needs:['starttest'],
    attemptedQuestion:Ember.computed.alias('controllers.starttest.attemptedQuestion'),
    skippedQuestion:Ember.computed.alias('controllers.starttest.skippedQuestion'),
    resultStatus:false,

    totalQuestionNumber:function(){
        return this.get('model').get('length');
    }.property('count'),

    CorrectAnswer : function (){
        return this.get('model').filterBy('correct', true).get('length');
    }.property('count'),

    incorrectAnswer:function(){
        console.log(this.get('attemptQuestion') -this.get('CorrectAnswer'));
    return (this.get('attemptQuestion') -this.get('CorrectAnswer'));

    }.property('attemptQuestion','CorrectAnswer'),

    percentage:function(){
    //var totalMarks=this.get('attemptQuestion') *2;
    var totalMarks=20;
    var percentageGet=(this.get('totalMarksGet')*100)/totalMarks;
    console.log(percentageGet);
    return percentageGet;
}.property('totalMarksGet','attemptQuestion'),

    resultStatus:function(){
        if(this.get('percentage')>=30){
           var status=this.set('resultStatus',true);
           return status;
        }
    }.property('percentage'),

    questionMarks : function(){
      var q= [];
      this.get('model').forEach(function (item){
         var qText = {};
         qText.correctQuestionMarks=item.get('correctQuestionMarks');
         qText.wrongQuestionMarks=item.get('wrongQuestionMarks');
         q.push(qText);
     });
     return q[this.get('count')];
    }.property('count'),

    wrongQuestionMarks:function(){
        //console.log(this.get('questionMarks').wrongQuestionMarks);
        return this.get('questionMarks').wrongQuestionMarks;
    }.property('questionMarks'),

    correctquestionMarks:function(){
        //console.log(this.get('questionMarks').correctQuestionMarks);
        return this.get('questionMarks').correctQuestionMarks;
    }.property('questionMarks'),

    corectAnswerMarks:function(){
        var noOfCorrectAnswer=this.get('CorrectAnswer');
        var totalCorrectMarks= noOfCorrectAnswer * this.get('correctquestionMarks');
        return totalCorrectMarks;
    }.property('CorrectAnswer','correctquestionMarks'),

    inCorrectAnswerMarks:function(){
        var noOfIncorrectAnswer=this.get('incorrectAnswer');
        var totalIncorrectMarks=noOfIncorrectAnswer * this.get('wrongQuestionMarks');
        return totalIncorrectMarks;
    }.property('incorrectAnswer','wrongQuestionMarks'),

    totalMarksGet:function(){
      var totalMarks=this.get('corectAnswerMarks') - this.get('inCorrectAnswerMarks');
      return totalMarks;
    }.property('corectAnswerMarks','inCorrectAnswerMarks'),

    attemptQuestion: function (){
        return this.get('attemptedQuestion');
   }.property('count'),

   skipQuestion:function(){
     return this.get('skippedQuestion');
 }.property('count'),
});
