import Ember from 'ember';
const { computed } = Ember;
export default Ember.Component.extend({
    count:0,
    displayButtons:function(){
           var q=[];
           for(var i=0;i<10;i++){
            if(i % 3==0)
            {
              var linebreak = document.createElement("br");
            }
            var button = document.createElement("input");
            button.name= "Blah"
            button.type = "button";
            button.value = "question";
            button.width= "100px";
            return button;
        }

    }.property('count'),
    
    actions :{
        jumpTo : function (id){

            // There is a jumpTo action in the primary controller named starttest
            this.sendAction('action',id);

        }
    }
});
