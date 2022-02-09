using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Marketstore.Models
{
    public class KorisnickaValuta
    {
        //[JsonIgnore]
        public string valutaRef { get; set; }
        public double kolicina { get; set; }
    }
}
