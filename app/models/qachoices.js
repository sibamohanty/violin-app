import DS from 'ember-data';

 export default DS.Model.extend({
  answerchoice: DS.hasMany('answers', { async: true }),
  answerselected:DS.attr('boolean', {defaultValue: false})
}).reopenClass({
    FIXTURES: [
        {
            id: 1,
        },

        {
            id: 2,    
        }
    ]
});
