import { Meteor } from 'meteor/meteor';
import {fetch} from 'meteor/fetch'
import { History } from './collections';
import {check} from 'meteor/check'

Meteor.startup(() => {
  // code to run on server at startup
});

//Methods that will be called to search
Meteor.methods({
  /**Method to search api endpoint
   * @query - the query string
   * @tags - tags that can be queried
   * @numeric - numerical filters that can be sen with conditions
   * @page - the page number
   * @searchByDate - Used to check if value should be search by date
   */
  searchApi(query,tags,numeric,page,searchByDate){
    check(query,String)
    check(tags,String)
    check(numeric,String)
    page = Number(page)
    
    let urlData = "";
    let fullQuery = `query=${query}&tags=${tags}&numericFilters=${numeric}&page=${page}`
    let queryParts = fullQuery.split('&')
    fullQuery = cleanQuery(queryParts);
    let url = searchByDate === "0" ? `http://hn.algolia.com/api/v1/search?${fullQuery}` : `http://hn.algolia.com/api/v1/search_by_date?${fullQuery}`;
    
    try {
      urlData = getData(url)
      History.insert({url})
      
    } catch (error) {
      throw new Meteor.Error(error);
    }
    return urlData; 
  }
})

/**Method used to clean up the query if data is not sent */
function cleanQuery(data){
  let newQuery = ""
  data.forEach(element => {
    let param = element.split('=')
    if(param[1].trim()!=="" || ((param[1]!=="0" && param[0]==="page"))){
      newQuery += `${element}&`
    }
  });
  newQuery = newQuery.slice(0,newQuery.length-1)
  return newQuery
}

/**Async function to call out to the REST Api */
async function getData(urlString){
    let url = await fetch(urlString).then(res => res.json())
    return url
}