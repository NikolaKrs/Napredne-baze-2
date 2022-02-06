using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Projekat3.Models
{
    public class Market
    {
        public ObjectId Id { get; set; }
        public String ime { get; set; }

        public List<MongoDBRef> values { get; set; }
        public List<MongoDBRef> users { get; set; }
        public Market()
        {
           values = new List<MongoDBRef>();
           users = new List<MongoDBRef>();
        }

    }
}
