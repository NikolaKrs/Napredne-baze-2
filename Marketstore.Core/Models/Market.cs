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
    public class Market:MongoModel
    {
        public string ime { get; set; }

        [JsonPropertyName("coins")]
        public List<Valuta> valuteList { get; set; }
        
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
