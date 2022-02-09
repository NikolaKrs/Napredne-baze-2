
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Marketstore.Models
{
    public class Korisnik: MongoModel
    {
        public string ime { get; set; }
        public string prezime { get; set; }
        public string korisnickoIme { get; set; }
        public string sifra { get; set; }
        public List<KorisnickaValuta> korisnickeValute { get; set; }

        public Korisnik()
        {
            korisnickeValute = new List<KorisnickaValuta>();
        }
    }
}
