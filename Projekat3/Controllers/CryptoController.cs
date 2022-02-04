using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using Projekat3.Models;

namespace Projekat3.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CryptoController : ControllerBase
    {
       
        [HttpGet]
        [Route("Values")]
        public async Task<List<String>> GetValues()
        {
            /*var client = new MongoClient("mongodb+srv://anjebza:nikola99@cluster0.4eozs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("CryptoBase");
            var collection = db.GetCollection<Values>("Valute");
            
            List<Values> firstDocument = collection.Find(new BsonDocument()).ToList();

            return firstDocument;*/
            return null;
        }
        //dodavanje usera
        [HttpPost]
        [Route("PostUser")]
        public async Task<IActionResult> PostUser([FromBody] User u)
        {
            var client = new MongoClient("mongodb+srv://anjebza:nikola99@cluster0.4eozs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("CryptoBase");
            var collection = db.GetCollection<User>("Korisnici");
            var collectionmarket = db.GetCollection<Market>("Market");

            var market = collectionmarket.Find(x => x.ime == "Binance").FirstOrDefault();

            //User user = new User { username = "hh", ime ="user", prezime="Petrovic", password="nikola99"/*, market= new MongoDBRef("Market", market.Id)*/ };
            collection.InsertOne(u);

            market.users.Add(new MongoDBRef("Korisnici", u.Id));
            var filter = Builders<Market>.Filter.Eq(x => x.Id, market.Id);
            var update = Builders<Market>.Update.Set("users", market.users);
            await collectionmarket.UpdateOneAsync(filter, update);

            return Ok();
        }

        //dodavanje value u market
        [HttpPost]
        [Route("PostValue")]
        public async Task<IActionResult> PostUser2()
        {
            var client = new MongoClient("mongodb+srv://anjebza:nikola99@cluster0.4eozs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("CryptoBase");
            var collection = db.GetCollection<Values>("Valute");
            var collectionmarket = db.GetCollection<Market>("Market");

            var market = collectionmarket.Find(x => x.ime == "Binance").FirstOrDefault();

            Values value = new Values { ime = "hh", cena = 20, rast = 2.22/*, market= new MongoDBRef("Market", market.Id)*/ };
            collection.InsertOne(value);

            market.values.Add(new MongoDBRef("Valute", value.Id));
            var filter = Builders<Market>.Filter.Eq(x => x.Id, market.Id);
            var update = Builders<Market>.Update.Set("values", market.values);
            await collectionmarket.UpdateOneAsync(filter, update);

            return Ok();
        }
        [HttpPut]
        [Route("UserAddValuta/ime/username")]
        public ActionResult PutValutaToUser(String ime, String username)
        {
            var client = new MongoClient("mongodb+srv://anjebza:nikola99@cluster0.4eozs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("CryptoBase");
            var collection = db.GetCollection<User>("Korisnici");
            var collectionv = db.GetCollection<Values>("Valute");

            var user = collection.Find(x => x.username == username).FirstOrDefault();
            var value = collectionv.Find(x => x.ime == ime).FirstOrDefault();

            user.values.Add(new MongoDBRef("Valute", value.Id/*v.Id*/));

            var filter = Builders<User>.Filter.Eq(x => x.Id, user.Id);
            var update = Builders<User>.Update.Set("values", user.values);
            collection.UpdateOneAsync(filter, update);

            return Ok();
        }
        [HttpPut]
        [Route("UserUpdate/username/ime/prezime/password")]
        public ActionResult PutValuta(String username, String ime, String prezime,String password/*, String noviusername*/ )//ovde nema smisla frombody, jer je poenta da se izmeni objekat, a i nisam sig da put ima frombody to treba da se proveri
        {
            var client = new MongoClient("mongodb+srv://anjebza:nikola99@cluster0.4eozs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("CryptoBase");
            var collection = db.GetCollection<User>("Korisnici");
            var collectionv = db.GetCollection<Values>("Valute");

            var filter = Builders<User>.Filter.Eq("username", username);
            var update = Builders<User>.Update.Set( "ime", ime).Set("prezime", prezime).Set("password", password)/*.Set("username", noviusername)*/;//username politikom kuce(google) se ne menja
            collection.UpdateOneAsync(filter, update);

            return Ok();
        }
        [HttpDelete]
        [Route("DeleteValue/ime")]
        public ActionResult DeleteValuta(String ime)
        {
            var client = new MongoClient("mongodb+srv://anjebza:nikola99@cluster0.4eozs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("CryptoBase");
            var collectionv = db.GetCollection<Values>("Valute");

            var deleteFilter = Builders<Values>.Filter.Eq("ime", ime);
            collectionv.DeleteOne(deleteFilter);//ako hocemo vise onda DeleteMany

            return Ok();
        }

    }
}
