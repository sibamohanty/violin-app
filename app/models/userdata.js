import DS from 'ember-data';

export default DS.Model.extend({
username:DS.attr('string'),
password:DS.attr('string'),
role : DS.attr('string'),
adminType: DS.attr('string'),
enable: DS.attr('string')

}).reopenClass({
  FIXTURES: [
      {
          id:1,
          role: "user",
          username:"ravi",
          password:"ravi",
          enable:"false",
      },
      {
        id:2,
        role: "user",
        username:"ankush",
        password:"ankush",
        enable:"true",
      },
      {
        id:3,
        role: "user",
        username:"nitesh",
        password:"nitesh",
        enable:"true",
      },
      {
        id:4,
        role: "admin",
        adminType:"useradmin",
        username:"surjit",
        password:"surjit",
        enable:"true",
      },
      {
        id:5,
        role: "admin",
        adminType:"contentadmin",
        username:"siba",
        password:"siba",
        enable:"true",
      }

  ]
});
