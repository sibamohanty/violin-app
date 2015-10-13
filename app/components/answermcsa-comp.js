import Ember from 'ember';

export default Ember.Component.extend({
    isSelected:false,
    answer : '',
    //selectedOnes: selectedOnes,
    updateAnswerChoice : function(){
        // it will go thourgh the questionAnswerChoice
        // and update the selectedOnes based on the
        // current selected or unSleceted checkbox.
        //console.log(this.get('answer'));
        //this.sendAction("updateSelectedAnswer");
    },
    watchClick: function(){
        console.log('selected');
        this.updateAnswerChoice();
        //console.log(this.get('isClicked'));
        //console.log(this.get('selectedOnes'));
    }.observes('isSelected')
});
