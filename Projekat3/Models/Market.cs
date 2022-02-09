using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Projekat3.Models
{
    public class Market
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        public String ime { get; set; }

        public List<MongoDBRef> valute { get; set; }
        public List<MongoDBRef> korisnici { get; set; }


    }
}
