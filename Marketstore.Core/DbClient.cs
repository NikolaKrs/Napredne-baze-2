using Marketstore.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using Marketstore.Core.Settings;

namespace Marketstore.Core
{
    public class DbClient:IDbClient
    {
        private readonly IMongoCollection<Market> _market;
        private readonly IMongoDatabase db;
        public DbClient()
        {
            var client = new MongoClient(dbSettings.Connection_String);
            db = client.GetDatabase(dbSettings.DB_Name);
            _market = db.GetCollection<Market>(dbSettings.Main_Collection);
        }
        public IMongoDatabase GetDB() 
        {
            return db;
        }
        /// <summary>
        /// Funkcija za dobijanje kolekcije marketa.
        /// </summary>
        /// <returns> IMongoCollection<Market> </returns>
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
