import DS from 'ember-data';

export default DS.Model.extend({
  tests : DS.attr('string'),
  isCompleted : DS.attr('boolean', {defaultValue: false}),
  correctlyAnswered :DS.attr('boolean', {defaultValue: false})
});
