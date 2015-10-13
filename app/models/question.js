import DS from 'ember-data';
export default DS.Model.extend({
  count:0,
  // correct: DS.attr('boolean'),
  qtype : DS.attr('string'),
  question : DS.attr('string'),
  randomProp : DS.attr(),
  answerChoice : DS.attr(),
  incorrect: DS.attr('boolean'),
  correctQuestionMarks: DS.attr(),
  wrongQuestionMarks: DS.attr(),
  inCorrectQuestionMarks:DS.attr(),
  previous : DS.attr('boolean', {defaultValue: false}),
  questionNum: DS.attr('string'),
  questionStatus :DS.attr('string', {defaultValue : 'unattempted'}),
  timeLeft:0,
  startTime: DS.attr('number', {defaultValue :0}),
  stopTime: DS.attr('number', {defaultValue : 0}),

    totalTimeSpent:function(){

        var newTimeSpent=0;
        var oldTimeSpent=this.get('timeSpent');
        for(var i=0;i<oldTimeSpent.length;i++){
        // console.log('in arr');
            newTimeSpent += oldTimeSpent[i];
        }
        return newTimeSpent;
    }.property('timeSpent'),

  timeSpent: Ember.computed('startTime','stopTime', function(){
      this.ts =  (typeof(this.ts)=== 'undefined') ? []: this.ts;
      this.ts.push(this.get('stopTime') - this.get('startTime')) ;
      return this.ts;
  }),

  /*timeSpent:  Ember.computed ('startTime','stopTime',function(){
      if (typeof(this.get('timeSpent')==='undefined')){
          return this.get('stopTime') - this.get('startTime');
      }else{
          return this.get('stopTime') - this.get('startTime')+this.get('timeSpent');
      }
  }),*/
  attempted : Ember.computed ('questionStatus', function (){
     return this.get('questionStatus') === 'attempted';
}),
   unattempted : Ember.computed ('questionStatus', function (){
       return this.get('questionStatus') === 'unattempted';
   }),
   skipped : Ember.computed ('questionStatus', function (){
        return this.get('questionStatus') === 'skipped';
   }),

  /*Possible values are 'unattempted', 'attempted', 'skipped', */
  selectedOnes: Ember.computed('answerChoice', function (){
      var t =[];
      this.get('answerChoice').forEach(function (item){
          if(item.selected){
              t.push(item.answer);
              console.log(t);
          }
      });
      return t;
  }),

   clickedOnes: Ember.computed('answerChoice', function (){
       var t =[];
       this.get('answerChoice').forEach(function (item){
           if(item.selected){
               t.push(item.answer);
               console.log(t);
           }
       });

       return t;
   }),
  wrongAnswer: DS.attr(),
  rightAnswer : DS.attr(),
  isClicked : DS.attr('boolean', {defaultValue: false}),
  isSelected: DS.attr('boolean', {defaultValue: false}),
  timeTaken : DS.attr(),

    correct : function (){
      var selectedOnes = this.get('selectedOnes');
      var rightAnswer = this.get('rightAnswer');
      if (selectedOnes.length!= rightAnswer.length){
          return false;
      }

       for (var i=0; i<selectedOnes.length;i++){
          if (selectedOnes [i] != rightAnswer[i]){
              return false;
          }
      }
      return true;

  }.property('selectedOnes','rightAnswer'),
     strike: function(){
         // console.log('in strike');
         var t =[];
         var selectedOnes = this.get('selectedOnes');
         var rightAnswer = this.get('rightAnswer');
         this.get('answerChoice').forEach(function (item){
                 t.push(item);
             });
            var wrongAnswer=this.get('wrongAnswer');
            for (var i=0; i<t.length;i++){
                if(t[i].selected ){
                    for( var j= 0; j<wrongAnswer.length;j++){
                    if (t[i].answer == wrongAnswer[j]){
                        t[i].correctstrike = true;
                        break;
                    }
                    else {
                        //t[i].correctstrike = false;
                    }
                }
            }

            }
        return t;
    }.property('wrongAnswer','answerChoice','selectedOnes')
}).reopenClass({

    FIXTURES: [
        {
            id: 1,
            questionNum:"Q1",
            question: "Which is the valid declarations within an interface definition?",
            answerChoice: [{answer : "A", selected: false,answerText:"public double methoda()"}, {answer : "B", selected: false,answerText:"public final double methoda()"}, {answer : "C", selected: false,answerText:"static void methoda(double d1)"} ],
            qtype:"mcma",
            isClicked:false,
            rightAnswer : ["A","B"],
            wrongAnswer : ["C"],
            correct : false,
            correctQuestionMarks:2,
            wrongQuestionMarks:0.5,
        },
       {
            id: 2,
            questionNum:"Q2",
            question: "What is the numerical range of a char?",
            answerChoice : [{answer : "A", selected: false,answerText:"-128 to 127"}, {answer : "B", selected: false,answerText:"0 to 32767"}, {answer : "C", selected: false,answerText:"0 to 65535"} ],
            qtype:"mcma",
            isClicked:false,
            rightAnswer :  ["A","C"],
            wrongAnswer : ["B"],
            correct : false,
            correctQuestionMarks:2,
            wrongQuestionMarks:0.5,
        },
       {
          id: 3,
          questionNum:"Q3",
          question : "Which three are valid declarations of a float?",
          answerChoice : [{answer : "A", selected: false,answerText:"float f1 = -343"}, {answer : "B", selected: false,answerText:"float f3 = 0x12345"}, {answer : "C", selected: false,answerText:"float f6 = 2.81F"}],
          qtype:"mcma",
          isClicked:false,
          rightAnswer : ["A","B","C"],
          wrongAnswer : ["D"],
          correct : false,
          correctQuestionMarks:2,
          wrongQuestionMarks:0.5,
        },
        {
          id: 4,
          questionNum:"Q4",
          question : "What will you do to treat the constant 3.14 as a long double?",
          answerChoice : [{answer : "A", selected: false,answerText:"use 3.14LD"}, {answer : "B", selected: false,answerText:"use 3.14L"}, {answer : "C", selected: false,answerText:"use 3.14DL"}],
          qtype:"mcma",
          isClicked: false,
          wrongAnswer : ["A","C"],
          rightAnswer : ["B"],
          correctQuestionMarks:2,
          wrongQuestionMarks:0.5,
        },
        {
          id: 5,
          questionNum:"Q5",
          question : "I do what I do ? is it true?",
          answerChoice : [{answer:"A", selected:false, answerText:"True"},{answer: "B", selected: false ,answerText:"False"}],
          qtype:"mcsa",
          isSelected:false,
          wrongAnswer : ["B"],
          rightAnswer : ["A"],
          correctQuestionMarks:2,
          wrongQuestionMarks:0.5,

      },
      {
        id: 6,
        questionNum:"Q6",
        question : " Which one of these lists contains only Java programming language keywords?",
        answerChoice : [{answer:"A", selected:false,answerText:"class, if, void, long, Int, continue"},{answer: "B", selected: false,answerText:"byte, break, assert, switch, include"},{answer: "C", selected: false,answerText:"strictfp, constant, super, implements, do"}],
        qtype:"mcma",
        isClicked: false,
        wrongAnswer : ["A","C"],
        rightAnswer : ["B"],
        correctQuestionMarks:2,
        wrongQuestionMarks:0.5,
    },
    {
      id: 7,
      questionNum:"Q7",
      question : "Which will legally declare, construct, and initialize an array?",
      answerChoice : [{answer:"A", selected:false,answerText:"int [] myList = {1, 2, 3};"},{answer: "B", selected: false,answerText:"int myList [] [] = {4,9,7,0};"},{answer: "C", selected: false,answerText:"int myList [] = {4, 3, 7};"}],
      qtype:"mcma",
      isClicked: false,
      wrongAnswer : ["A","B"],
      rightAnswer : ["C"],
      correctQuestionMarks:2,
      wrongQuestionMarks:0.5,

    },
    {
    id: 8,
    questionNum:"Q8",
    question : "Which is a reserved word in the Java programming language?",
    answerChoice : [{answer:"A", selected:false,answerText:"method"},{answer: "B", selected: false,answerText:"native"},{answer: "C", selected: false,answerText:"array"}],
    qtype:"mcma",
    isClicked: false,
    wrongAnswer : ["B","C"],
    rightAnswer : ["A"],
    correctQuestionMarks:2,
    wrongQuestionMarks:0.5,

    },
    {
      id: 9,
      questionNum:"Q9",
      question : "Which is a valid keyword in java?",
      answerChoice : [{answer:"A", selected:false,answerText:"interface"},{answer: "B", selected: false,answerText:"string"},{answer: "C", selected: false,answerText:"Float"}],
      qtype:"mcma",
      isClicked: false,
      wrongAnswer : ["A","B"],
      rightAnswer : ["C"],
      correctQuestionMarks:2,
      wrongQuestionMarks:0.5,
   },
   {
    id: 10,
    questionNum:"Q10",
    question : "What are the different types of real data type in C ?",
    answerChoice : [{answer:"A", selected:false,answerText:"float, double"},{answer: "B", selected: false,answerText:"short int, double, long int"},{answer: "C", selected: false,answerText:"float, double, long double"}],
    qtype:"mcma",
    isClicked: false,
    wrongAnswer : ["A","C"],
    rightAnswer : ["B"],
    correctQuestionMarks:2,
    wrongQuestionMarks:0.5,
   }
    ]
});
