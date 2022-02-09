using Marketstore.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Marketstore.Core
{
    public class DbClient:IDbClient
    {
        private readonly IMongoCollection<Market> _market;
        private readonly IMongoDatabase db;
        public DbClient()
        {
            var client = new MongoClient("mongodb+srv://anjebza:nikola99@cluster0.4eozs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            db = client.GetDatabase("CryptoBase");
            _market = db.GetCollection<Market>("Market");
            
        }

        public IMongoCollection<Market> GetMarketCollections()
        {
            return _market;
        }
        public IMongoCollection<Valuta> GetValutaCollections()
        {
            return db.GetCollection<Valuta>("Valute");
        }
    }
}
