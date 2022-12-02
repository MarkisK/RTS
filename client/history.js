import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './history.html';

export const HistoryLocal = new Mongo.Collection('history')

Template.history.onCreated(function helloOnCreated() {
  
});

Template.history.helpers({
  //Method to get history results
  getHistory() {
    return HistoryLocal.find().fetch()
  },
});

Template.history.events({
  'click button'(event, instance) {
    
  },
});