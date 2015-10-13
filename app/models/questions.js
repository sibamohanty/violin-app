import DS from 'ember-data';

export default DS.Model.extend({
  fullquestion : DS.attr('string'),
  qtype : DS.attr('string'),
  answersChoice : DS.attr(string),
  correctAnswer : DS.attr('string'),
  answersChoices : function(){
    if (this.qtype =='mcma'){
      return DS.hasMany('answerChoice');
     }
    else {
      return DS.hasOne('answerChoice');
      }
  },

  correctKey : function (){
    if (this.qtype =='mcma'){
      return DS.hasMany('correctAnswer');
    }
    else {
      return DS.hasOne('corectAnswer');
    }
  },
  isAnswered : DS.attr('boolean', {defaultValue: false}),
  selectedChoice : function (){
    if (this.qtype == 'mcma'){
      return DS.hasMany(answerChoice);
    }
    else {
      return DS.hasOne('correctAnswer');
    }
  },
  isCorrectlyAnswered : function ()
  {
    if (this.get('isAnswered') && this.get('selectedChoice') == this.get('correctKey')){
      return true;
    }
	else
	{
      return false;
    }

  }.property('isAnswered','selectedChoice','correctKey')

});
