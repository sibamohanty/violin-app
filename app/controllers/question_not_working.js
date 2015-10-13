import Ember from 'ember';
export default Ember.ObjectController.extend({
  count : 0,
  currentCount : 0,
  questionText : function(){
     var q= [];
     this.get('model').forEach(function (item){
    q.push(item.get('question'));
    });
    return q[this.get('count')];
  }.property('count'),

    actions: {
      submit_answer : function (){
          this.incrementProperty('count');
        },
        Previous_back : function (){
          //this.transitionToRoute('testpage');
          this.decrementProperty('count');
          console.log("Will go to the next quesiton");
        },
        skip_question : function (){
          //this.transitionToRoute('testpage');
          this.incrementProperty('count');
          console.log("Will go to the next quesiton");

        },
        Terminate_Test: function (){
          this.transitionToRoute('terminate');
        }
    }
});
