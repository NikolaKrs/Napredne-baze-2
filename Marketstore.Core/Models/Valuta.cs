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
    public class Valuta : MongoModel
    {
        public string ime { get; set; }
        public string punoime { get; set; }
        public double cena { get; set; }
        public double rast { get; set; }
        public string slika { get; set; }

        public Valuta()
        {
        //    users = new List<MongoDBRef>();
        }
    }
}
