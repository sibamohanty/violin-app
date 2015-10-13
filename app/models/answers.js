import DS from 'ember-data';

export default DS.Model.extend({
  choice:DS.attr('string')
}).reopenClass({

    FIXTURES: [
        {
            id: 1,
            choice: "A",
        },
        {
            id: 1,
            question: "B",
        },
        {
          id: 2,
          question : "C",
        },

        {
          id: 2,
          question : "D",
        }
    ]
});
