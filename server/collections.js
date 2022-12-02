import { Mongo } from 'meteor/mongo'
/** Collection of tables that are stored in Mongo */
export const History = new Mongo.Collection("history")
