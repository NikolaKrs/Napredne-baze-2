using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Marketstore.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using Marketstore.Models;
using MongoDB.Driver;

namespace Crypto_Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CryptoController : ControllerBase
    {
        public class User
        {
            //public ObjectId Id { get; set; }
            public String korisnickoIme { get; set; }
            public String ime { get; set; }
            public String prezime { get; set; }
            public String sifra { get; set; }
           
           
        }


        public class pom
        {
           public string password { get; set; }
           public string username { get; set; }
        }
        private readonly IMarketService _marketService;
        public CryptoController(IMarketService marketService)
        {
            _marketService = marketService;
        }

        [HttpGet]
        [Route("GetMarket")]
        public IActionResult GetMarket() 
        {
            /*Market m = _marketService.GetMarket();
            m.valute = null;
            m.korisnici = null;

            return Ok( _marketService.GetValute());*/

   
            return Ok(_marketService.GetMarket());
        }
        [HttpGet]
        [Route("GetValute")]
        public IActionResult GetValute()
        {
            /*Market m = _marketService.GetMarket();
            m.valute = null;
            m.korisnici = null;

            return Ok( _marketService.GetValute());*/


            return Ok(_marketService.GetValute());
        }
        [HttpPost]
        [Route("GetUser")]
        public IActionResult GetUser([FromBody] pom name)
        {
            /*Market m = _marketService.GetMarket();
            m.valute = null;
            m.korisnici = null;
            
            return Ok( _marketService.GetValute());*/
            //new Korisnik { ime = "sasa", password = "aaa", prezime = "aaa", username = "", values = null ,id=""}
            
            return Ok(new Korisnik { ime = name.username, sifra = name.password, prezime = "aaa", korisnickoIme = "", valute = null });
        }

        [HttpPost]
        [Route("PostUser")]
        public IActionResult PostUser([FromBody] User u)
        {
            Console.Write("nnnnnjndndfjnjdfnfdn");
            var client = new MongoClient("mongodb+srv://anjebza:nikola99@cluster0.4eozs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("CryptoBase");
            var collection = db.GetCollection<User>("Korisnici");
            var collectionmarket = db.GetCollection<Market>("Market");



            var market = collectionmarket.Find(x => x.ime == "Binance").FirstOrDefault();



            //User user = new User { username = "hh", ime ="user", prezime="Petrovic", password="nikola99"/*, market= new MongoDBRef("Market", market.Id)*/ };
            collection.InsertOne(u);



            //market.korisnici.Add(new MongoDBRef("Korisnici", u.Id));
            //var filter = Builders<Market>.Filter.Eq(x => x.Id, market.Id);
            //var update = Builders<Market>.Update.Set("korisnici", market.korisnici);
            //collectionmarket.UpdateOneAsync(filter, update);



            return Ok(null);
        }

    }
}
