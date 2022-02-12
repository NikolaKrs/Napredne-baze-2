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
        SResponse<Market> GetMarket();
        SResponse<List<Valuta>> GetValute();
        Task<SResponse<Valuta>> InsertValuta(Valuta val);
        Task<SResponse<Korisnik>> GetKorisnik(string korisnickoIme, string sifra);
        Task<SResponse> InsertKorisnik(Korisnik korisnik);
        Task<SResponse> DeleteKorisnik(string user);
        Task<SResponse<Korisnik>> InsertOrUpdateKorisnickeValute(IKorisnickaValuta k);
        Task<SResponse<Korisnik>> TransferValuta(IKorisnickaValuta k);
        Task<SResponse> AddValutaToMarket(string ime);
        Task<SResponse> UpdateCena(Valuta val);
        Task<SResponse> UpdateKorisnik(Korisnik k);
        Task<SResponse> DeleteValuta(string valuta);
        T refToObject<T>(MongoDBRef reference) where T : MongoModel;
    }
}
