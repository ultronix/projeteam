Annonces = new Mongo.Collection("annonces");
EasySearch.createSearchIndex('projets', {
  field: 'titre',
  collection: Annonces,
  props : {
        'tags' : []
    },
  use: 'mongo-db',
  query: function (searchString) {
    // Default query that is used for searching

    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
    // Make the emails searchable
    query.$or.push({
      'tags': 
        { $all : searchString.split(",") }  
  		
    });
    console.log(searchString.split(","));
    return query;
  }

});
