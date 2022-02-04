using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace Projekat3
{
    public class Values
    {
        public ObjectId Id { get; set; }

        public String ime { get; set; }

        public Double cena { get; set; }

        public Double rast { get; set; }
        public MongoDBRef market { get; set; }
        public List<MongoDBRef> users { get; set; }//moguce da je ovo potrebno u buducnosti, ali moze da se desi da stvori kruznu zavisnost
        public Values()
        {
            users = new List<MongoDBRef>();
        }
    }
}