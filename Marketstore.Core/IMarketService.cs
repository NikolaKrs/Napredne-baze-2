using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Marketstore.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Marketstore.Core
{
    public interface IMarketService
    {
        Market GetMarket();
        List<Valuta> GetValute();
        Task<SResponse> InsertValuta(Valuta val);
        Korisnik GetKorisnik(string korisnickoIme, string sifra);
        Task<SResponse> InsertKorisnik(Korisnik korisnik);
        Task<SResponse> InsertOrUpdateKorisnickeValute(IKorisnickaValuta k);
        Task<SResponse> AddValutaToMarket(string ime);
        Task<SResponse> UpdateCena(Valuta val);
        Task<SResponse> UpdateKorisnik(Korisnik k);
        T refToObject<T>(MongoDBRef reference) where T : MongoModel;
    }
}
