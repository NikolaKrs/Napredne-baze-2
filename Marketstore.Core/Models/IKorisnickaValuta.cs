using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Marketstore.Models
{
    public class IKorisnickaValuta 
    {
        public string korisnik { get; set; }
        public string valuta { get; set; }
        public double kolicina { get; set; }
    }
}
