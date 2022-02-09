using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace Marketstore.Models
{
    public class Market
    {

        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        public string ime { get; set; }
        
        [JsonIgnore]
        public List<MongoDBRef> valute { get; set; }
        [JsonIgnore]
        public List<MongoDBRef> korisnici { get; set; }
        public Market()
        {
            valute = new List<MongoDBRef>();
            korisnici = new List<MongoDBRef>();
        }

    }
}
