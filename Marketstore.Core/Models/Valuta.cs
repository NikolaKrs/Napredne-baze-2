using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;


namespace Marketstore.Models
{
    public class Valuta
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }

        public string ime { get; set; }

        public double cena { get; set; }

        public double rast { get; set; }
        public string slika { get; set; }
        //   public MongoDBRef market { get; set; }
        //  public List<MongoDBRef> users { get; set; }//moguce da je ovo potrebno u buducnosti, ali moze da se desi da stvori kruznu zavisnost
        public Valuta()
        {
        //    users = new List<MongoDBRef>();
        }
    }
}
