using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projekat3.Models
{
    public class pom
    {
        public String ime { get; set; }
        public List<MongoDBRef> valute { get; set; }
        public List<MongoDBRef> korisnici { get; set; }
    }
}
