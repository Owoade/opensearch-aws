const { Client } = require("@opensearch-project/opensearch");

const utils = require("util");

const {client} = require("./client");

class OpenSearchService {

    constructor( service_url ){

        this.ingestData = this.ingestData.bind(this);

        this.search = this.search.bind(this);

    }


    async ingestData(data, index){

        const parsedData = this.#parseData(data, index);

        return new Promise( (res, rej) => {

            client.bulk({
                refresh: true,
                body: parsedData
            }, function(err, value){
                
                if(err){
                    return rej(err)
                }

                res(value.body);

            })

        })

    }

    async search( query, index, field ){

        const queryBody = this.#generrateQueryBody(query, field);

         return new Promise( (res, rej) => {

            client.search({
                index,
                body: queryBody
            }, function(err, value){
                
                if(err){
                    return rej(err)
                }

                res(value.body);

            })

        })

    }

    async delete( query, index, field ){

        const queryBody = this.#generrateQueryBody(query, field);

         return new Promise( (res, rej) => {

            client.delete_by_query({
                index,
                body: queryBody
            }, function(err, value){
                
                if(err){
                    return rej(err)
                }

                res(value.body);

            })

        })

    }

    async deleteIndex( index ){

        return new Promise( (res, rej) => {

            client.indices.delete({index}, function(err, value){
                
                if(err){
                    return rej(err)
                }

                res(value.body);

            })

        })

    }

    async getMappings(index){

        return new Promise( (res, rej) => {

            client.indices.getMapping({index}, function(err, value){
                
                if(err){
                    return rej(err)
                }

                res(value.body);

            })

        })
    
    }


    #parseData( data, index ){

      return data.flatMap(doc => [
        { index: { _index: index, _id: Date.now().toString() } },
        doc
     ] )

    }

    #generrateQueryBody(query, field){
        return {
            query: {
               match: {
                [field]: {
                    query
                }
               }
            }
         }
    }
}

module.exports = OpenSearchService;