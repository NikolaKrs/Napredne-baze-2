using Marketstore.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MongoDB.Bson;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Marketstore.Core
{
    public class MarketService : IMarketService
    {
        #region Definitions and constructor
            private readonly IMongoCollection<Market> _market_collection;
            private readonly IMongoDatabase _db;
            private readonly Market _market;
            public MarketService(IDbClient dbClient)
            {
                _db = dbClient.GetDB();
                _market_collection = dbClient.GetMarketCollections();
                _market = _market_collection.Find(x => x.ime == "Binance").FirstOrDefault();
            }
            public T refToObject<T>(MongoDBRef reference) where T : MongoModel
            {
                return _db.GetCollection<T>(reference.CollectionName).Find(Builders<T>.Filter.Eq(x => x.Id, reference.Id)).FirstOrDefault();
            }
        #endregion

        #region Market
            /// <summary>
            ///
            /// </summary>
            /// <returns>Objekat klase Market</returns>
            public SResponse<Market> GetMarket()
            {
                _market.valuteList = _market.valute.Select(x => refToObject<Valuta>(x)).ToList().FindAll(x=> x != null);
                return new SResponse<Market>(true,"Uspesno pronadjen market.",_market);
            }
            public async Task<SResponse> AddValutaToMarket(string ime)
            {
                var collectionValute = _db.GetCollection<Valuta>("Valute");
                var valuta = collectionValute.Find(x => x.ime == ime).FirstOrDefault();

                if (valuta == null)
                    return new SResponse(false, $"Valuta pod imenom {ime} ne postoji.");

                _market.valute.Add(new MongoDBRef("Valute", valuta.Id));
                var f = Builders<Market>.Filter.Eq(x => x.Id, _market.Id);
                var u = Builders<Market>.Update.Set("valute", _market.valute);
            
                await _market_collection.UpdateOneAsync(f,u);
                return new SResponse(true, $"Uspesno dodata valuta {ime}.");

            }
        #endregion

        #region Valute
            /// <summary>
            /// 
            /// </summary>
            /// <returns>Lista objekata tima Valuta</returns>
            public SResponse<List<Valuta>> GetValute()
            {
                return new SResponse<List<Valuta>>(true,"Uspesno pribavljene valute.", _market.valute.Select(x => refToObject<Valuta>(x)).ToList());
            }
            public async Task<SResponse<Valuta>> InsertValuta(Valuta val)
            {
                var collectionValute = _db.GetCollection<Valuta>("Valute");
                var valuta = collectionValute.Find(x => x.ime == val.ime).FirstOrDefault();

                if (valuta != null)
                    return new SResponse<Valuta>(false, $"Valuta {val.ime} vec postoji u bazi.");

                await collectionValute.InsertOneAsync(val);
                await AddValutaToMarket(val.ime);
                valuta = collectionValute.Find(x => x.ime == val.ime).FirstOrDefault();
                return new SResponse<Valuta>(true, $"Valuta {val.ime} uspesno dodata.",valuta);
            }
            public async Task<SResponse> DeleteValuta(string val)
            {
                var collectionValute = _db.GetCollection<Valuta>("Valute");
                var valuta = collectionValute.Find(x => x.ime == val).FirstOrDefault();

                if (valuta == null)
                    return new SResponse(false, $"Valuta {val} ne postoji u bazi.");

                var f = Builders<Valuta>.Filter.Eq(x => x.Id, valuta.Id);
                await collectionValute.DeleteOneAsync(f);
                return new SResponse(true, $"Valuta {val} uspesno obrisana.");
            }
            public async Task<SResponse> UpdateCena(Valuta val) 
            {
                var collectionValute = _db.GetCollection<Valuta>("Valute");
                var valuta = collectionValute.Find(x => x.ime == val.ime || x.Id == val.Id).FirstOrDefault();

                if (valuta == null)
                    return new SResponse(false, $"Valuta {val} ne postoji.");

                var f = Builders<Valuta>.Filter.Eq(x => x.Id, valuta.Id);
                var u = Builders<Valuta>.Update.Set(x => x.cena, val.cena);
                await collectionValute.UpdateOneAsync(f, u);
                return new SResponse(true, "Uspesno azuriranje cene.");
            }
        #endregion

        #region Korisnici
            public async Task<SResponse<Korisnik>> GetKorisnik(string korisnickoIme, string sifra) 
            {
                var korisnik = (await _db.GetCollection<Korisnik>("Korisnici").FindAsync(x => x.korisnickoIme.Equals(korisnickoIme) && x.sifra.Equals(sifra))).FirstOrDefault();
                if(korisnik == null)
                    return new SResponse<Korisnik>(false, "Korisnik nije pronadjen.");
                else
                    return new SResponse<Korisnik>(true, $"Korisnik {korisnik.korisnickoIme} uspesno pronadjen.", korisnik);
            }
            public async Task<SResponse> InsertKorisnik(Korisnik korisnik)
            {
                var collectionKorisnik = _db.GetCollection<Korisnik>("Korisnici");
                var k = collectionKorisnik.Find(x => x.korisnickoIme == korisnik.korisnickoIme).FirstOrDefault() ?? null;
                if (k != null)
                    return new SResponse(false, $"Korisnicko ime {korisnik.korisnickoIme} je vec u upotrebi!");
                else
                {
                    await collectionKorisnik.InsertOneAsync(korisnik);
                    return new SResponse(true, $"Uspesno dadat korisnik: {korisnik.korisnickoIme}");
                }  
            }
            public async Task<SResponse<Korisnik>> InsertOrUpdateKorisnickeValute(IKorisnickaValuta k)
            {
                var collectionValute = _db.GetCollection<Valuta>("Valute");
                var collectionKorisnik = _db.GetCollection<Korisnik>("Korisnici");

                var korisnik = collectionKorisnik.Find(x => x.Id == k.Id || x.korisnickoIme == k.korisnickoIme ).FirstOrDefault();
                var valuta = collectionValute.Find(x => x.ime == k.valutaIme || x.Id == k.valutaRef).FirstOrDefault();

                if (korisnik == null)
                    return new SResponse<Korisnik>(false,"Korisnik nije pronadjen.");
                else if(valuta == null)
                    return new SResponse<Korisnik>(false, "Valuta nije pronadjena.");

                var kvalutaid = korisnik.korisnickeValute.FindIndex(x => x.valutaRef == valuta.Id);

                if (kvalutaid >= 0)//Valuta postoji 
                {
                    korisnik.korisnickeValute[kvalutaid].kolicina = k.kolicina;
                    if (k.kolicina == 0)
                        korisnik.korisnickeValute.RemoveAt(kvalutaid);
                }
                else
                {
                    KorisnickaValuta value = new KorisnickaValuta { valutaRef =  valuta.Id, kolicina = k.kolicina };
                    korisnik.korisnickeValute.Add(value);
                }
                var f = Builders<Korisnik>.Filter.Eq(x => x.Id, korisnik.Id);
                var u = Builders<Korisnik>.Update.Set("korisnickeValute", korisnik.korisnickeValute);
                await collectionKorisnik.UpdateOneAsync(f, u);
                return new SResponse<Korisnik>(true, $"Valuta uspesno dodata korisniku {korisnik.korisnickoIme}", korisnik);
            }
            public async Task<SResponse<Korisnik>> TransferValuta(IKorisnickaValuta k)
            {
                var collectionValute = _db.GetCollection<Valuta>("Valute");
                var collectionKorisnik = _db.GetCollection<Korisnik>("Korisnici");

                var korisnik = collectionKorisnik.Find(x => x.Id == k.Id || x.korisnickoIme == k.korisnickoIme).FirstOrDefault();
                var valuta = collectionValute.Find(x => x.ime == k.valutaIme || x.Id == k.valutaRef).FirstOrDefault();
                var valutaTransfer = collectionValute.Find(x => x.ime == k.valutaTransfer || x.Id == k.valutaTransferRef).FirstOrDefault();

            if (korisnik == null)
                    return new SResponse<Korisnik>(false, "Korisnik nije pronadjen.");
            else if (valuta == null)
                    return new SResponse<Korisnik>(false, "Valuta nije pronadjena.");
            else if (valutaTransfer == null)
                return new SResponse<Korisnik>(false, "Valuta za transfer nije pronadjena.");

             
            var kvalutaid = korisnik.korisnickeValute.FindIndex(x => x.valutaRef == valuta.Id);
            var kvalutaTransferid = korisnik.korisnickeValute.FindIndex(x => x.valutaRef == valutaTransfer.Id);

            if (kvalutaid >= 0)//Valuta postoji 
            {
                korisnik.korisnickeValute[kvalutaid].kolicina = k.kolicina;
                if (k.kolicina == 0)
                    korisnik.korisnickeValute.RemoveAt(kvalutaid);
            }
            if (kvalutaTransferid >= 0)//Valuta postoji 
            {
                korisnik.korisnickeValute[kvalutaTransferid].kolicina = korisnik.korisnickeValute[kvalutaTransferid].kolicina+ k.kolicinaTransfer;
            }
            else
            {
                KorisnickaValuta value = new KorisnickaValuta { valutaRef = valutaTransfer.Id, kolicina = k.kolicinaTransfer };
                korisnik.korisnickeValute.Add(value);
            }
            var f = Builders<Korisnik>.Filter.Eq(x => x.Id, korisnik.Id);
            var u = Builders<Korisnik>.Update.Set("korisnickeValute", korisnik.korisnickeValute);
            await collectionKorisnik.UpdateOneAsync(f, u);
            return new SResponse<Korisnik>(true, $"Valuta uspesno dodata korisniku {korisnik.korisnickoIme}", korisnik);
        }


            public async Task<SResponse> UpdateKorisnik(Korisnik k)
            {
                var collectionKorisnik = _db.GetCollection<Korisnik>("Korisnici");
                var korisnik = collectionKorisnik.Find(x => (x.Id == k.Id || x.korisnickoIme == k.korisnickoIme)).FirstOrDefault();
                if (korisnik == null)
                    return new SResponse(false, $"Korisnik {k.Id} nije pronadjen.");

                var update = Builders<Korisnik>.Update.Set(x=>x.Id,korisnik.Id);

                if (k.ime != string.Empty)
                    update.Set(x => x.ime, korisnik.ime);
                if (k.prezime != string.Empty)
                    update.Set(x => x.prezime, korisnik.prezime);
                if (k.sifra != string.Empty)
                    update.Set(x => x.sifra, korisnik.sifra);

                var filter = Builders<Korisnik>.Filter.Eq(x => x.Id, korisnik.Id);
                await collectionKorisnik.UpdateOneAsync(filter, update);

                return new SResponse(true, "Korisnik uspesno azuriran.");
            }
            public async Task<SResponse> DeleteKorisnik(string user)
            {
                var collectionKorisnik = _db.GetCollection<Korisnik>("Korisnici");
                var korisnik = collectionKorisnik.Find(x => x.korisnickoIme == user).FirstOrDefault();
                if (korisnik == null)
                    return new SResponse(false, $"Korisnik {user} nije pronadjen.");

                var f = Builders<Korisnik>.Filter.Eq(x => x.Id, korisnik.Id);
                await collectionKorisnik.DeleteOneAsync(f);
                return new SResponse(true, $"Korisnik {korisnik.korisnickoIme} uspesno obisan.");
            }

        #endregion

    }
}
