import DS from 'ember-data';

export default DS.Model.extend({
      username: DS.attr('string'),
      email: DS.attr('string'),
      password: DS.attr('string'),
      group: DS.belongsTo('group'),
      verified: DS.attr('boolean', {defaultValue: false}),
      createdAt: DS.attr('string', {
          defaultValue: function() { return new Date(); }
      })
  });
