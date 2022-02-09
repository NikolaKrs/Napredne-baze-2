using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projekat3.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        public String username { get; set; }
        public String ime { get; set; }
        public String prezime { get; set; }
        public String password { get; set; }
        public List<MongoDBRef> values { get; set; }
        public MongoDBRef market { get; set; }
        public User()
        {
            values = new List<MongoDBRef>();
        }
    }
}
