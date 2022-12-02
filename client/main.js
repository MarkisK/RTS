import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Tracker} from 'meteor/tracker'
import {Meteor} from 'meteor/meteor'
import './routes/routes'
import './templates/navbar'
import './history'
import './main.html';



Template.search.onCreated(function() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);

  Tracker.autorun(()=>{
    this.searchRes = new ReactiveVar([]);
  })
  
});

Template.search.helpers({
  searchResults(){
    return Template.instance().searchRes.get()
  },
  getResultSize(){
    return Template.instance().searchRes.get().length > 0
  }
});

Template.search.events({
  'click #searchBtn'(event, instance){
    let searchByDate = document.forms['queryForm'].searchByDateOption.value
    let queryText = document.forms['queryForm'].queryText.value
    let tagsText = document.forms['queryForm'].tagsText.value
    let numText = document.forms['queryForm'].numText.value
    let pageText = document.forms['queryForm'].pageNum.value
    try {
      Meteor.call('searchApi',queryText,tagsText,numText,pageText,searchByDate,(err,res)=>{
        if(err){
          throw err
        } else {
          instance.searchRes.set(res.hits)
        } 
    })
    } catch (error) {
      console.log(error)
      document.getElementById('error').removeAttribute('hidden');
    }
    
    console.log(instance.searchRes.get())
  }
});

