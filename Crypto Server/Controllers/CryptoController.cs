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
        private readonly IMarketService _marketService;
        public CryptoController(IMarketService marketService)
        {
            _marketService = marketService;
        }

        [HttpGet]
        [Route("GetMarket")]
        public IActionResult GetMarket() => Ok(_marketService.GetMarket());

        [HttpGet]
        [Route("GetValute")]
        public IActionResult GetValute() => Ok(_marketService.GetValute());

        [HttpPost]
        [Route("GetUser")]
        public IActionResult GetKorisnik([FromBody] IKorisnik korisnik) =>
            Ok(_marketService.GetKorisnik(korisnik.korisnickoIme,korisnik.sifra));

        [HttpPost]
        [Route("InsertOrUpdateUserValute")]
        public async Task<IActionResult> InsertOrUpdateUserValute([FromBody] IKorisnickaValuta k) => Ok(await _marketService.InsertOrUpdateKorisnickeValute(k));

        [HttpPost]
        [Route("InsertUser")]
        public async Task<IActionResult> InesrtKorisnik([FromBody] Korisnik k) =>
            ParseResponse(await _marketService.InsertKorisnik(k));

        [HttpPost]
        [Route("InsertValute")]
        public async Task<IActionResult> InsertValuta([FromBody] Valuta val) => ParseResponse(await _marketService.InsertValuta(val));

        [HttpPut]
        [Route("AddValuteToMarket/{valuta}")]
        public async Task<IActionResult> AddValutaToMarket(string valuta) => ParseResponse(await _marketService.AddValutaToMarket(valuta));

        [HttpPut]
        [Route("UpdatePrice")]
        public async Task<IActionResult> UpdateCena([FromBody] Valuta val) => ParseResponse(await _marketService.UpdateCena(val));

        [HttpPut]
        [Route("UpdateUser")]
        public async Task<IActionResult> UpdateKorisnik([FromBody] Korisnik korisnik) => ParseResponse(await _marketService.UpdateKorisnik(korisnik));

        /// <summary>
        /// Stara funkcija, ne koristi se 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("PostValue")]
        public async Task<IActionResult> PostUser2()
        {
            var client = new MongoClient("mongodb+srv://anjebza:nikola99@cluster0.4eozs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("CryptoBase");
            var collection = db.GetCollection<Valuta>("Valute");
            var collectionmarket = db.GetCollection<Market>("Market");

            var market = collectionmarket.Find(x => x.ime == "Binance").FirstOrDefault();

            Valuta value = new Valuta { ime = "nova", cena = 20, rast = 2.22, slika = "Nema"/*, market= new MongoDBRef("Market", market.Id)*/ };
            collection.InsertOne(value);

            market.valute.Add(new MongoDBRef("Valute", value.Id));
            var filter = Builders<Market>.Filter.Eq(x => x.Id, market.Id);
            var update = Builders<Market>.Update.Set("valute", market.valute);
            await collectionmarket.UpdateOneAsync(filter, update);

            return Ok();
        }

        private IActionResult ParseResponse(SResponse sr) => sr.valid ? Ok(sr.message) : BadRequest(sr.message);

    }
}
