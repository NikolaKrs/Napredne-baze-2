using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marketstore.Models
{
    public class Korisnik
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string id { get; set; }
        public string korisnickoIme { get; set; }
        public string ime { get; set; }
        public string prezime { get; set; }
        public string sifra { get; set; }
        public List<MongoDBRef> valute { get; set; }
       // public MongoDBRef market { get; set; }
        public Korisnik()
        {
            valute = new List<MongoDBRef>();
        }
    }
}
