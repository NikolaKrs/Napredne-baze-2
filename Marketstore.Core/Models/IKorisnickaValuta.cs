using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Marketstore.Models
{
    public class IKorisnickaValuta : MongoModel
    {
        public string korisnickoIme { get; set; }
        public string valutaIme { get; set; }
        public string valutaTransfer { get; set; }
        public string valutaRef { get; set; }
        public double kolicina { get; set; }
        public double kolicinaTransfer { get; set; }
        public string valutaTransferRef { get; set; }

    }
}
