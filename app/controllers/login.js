export default Ember.ObjectController.extend({
  needs: ['login'],
  username : '',
  password : '',
  loginFailed : false,
  isProcessing: false,
  actions : {
    login : function (user){
      this.setProperties({
      loginFailed: false,
      isProcessing: true
    });

      var username = this.get('username');
      var password = this.get('password');
      if (username == 'jon' && password== 'doe'){
        this.set("isProcessing", false);
        //this.set('controllers.login.user', user);
          //this.set("loginFailed", false);
        this.transitionToRoute('testpage');
      }
      else
      {
        this.set("isProcessing", false);
        this.set("loginFailed", true);
      }

    //  this.transitionToRoute('testpage');
    }
  }


});
