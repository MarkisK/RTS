import {FlowRouter} from 'meteor/ostrio:flow-router-extra'

FlowRouter.route('/history', {
    name: 'history',
    action() {
        BlazeLayout.render('history',{main:'history'})
    }
  });

  FlowRouter.route('/search', {
    name: 'search',
    action() {
      BlazeLayout.render('search',{main:'search'})
    }
  });