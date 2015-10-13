import Ember from 'ember';

export function hourMinSec(seconds) {
    // it take number of secs and
    // returns formatted time
    let mins = Math.floor(seconds/60);
    return mins+" mins : "+ seconds%60+" s";;
}

export default Ember.Helper.helper(hourMinSec);
