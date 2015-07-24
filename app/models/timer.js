
export default DS.Model.extend({
      total_time : DS.attr('integer',{defaultValue: 30 }),

      init_timer : function (){
        // start timer
        setTimeout(this.decrease_counter,100);

      },
      decrease_counter : function (){
        var cur = this.get('total_time');
        if (cur >0){
          this.set(total_time, cur -1);
          setTimeout(decrease_counter,1);
        }

      }.property('total_time'),
      current_value : function(){

      }.observes('decrease_counter') ,

      createdAt: DS.attr('string', {
          defaultValue: function() { return new Date(); }
      }),


  });
