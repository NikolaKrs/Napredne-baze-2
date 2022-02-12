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
            CreateIndexes();
        }
        private void CreateIndexes() {
            var indexModel = new CreateIndexModel<Korisnik>(Builders<Korisnik>.IndexKeys.Ascending(x => x.korisnickoIme), new CreateIndexOptions { Unique = true });
            var collectionuser = db.GetCollection<Korisnik>("Korisnici");
            collectionuser.Indexes.CreateOne(indexModel);

            var indexModelVal = new CreateIndexModel<Valuta>(Builders<Valuta>.IndexKeys.Ascending(x => x.ime), new CreateIndexOptions { Unique = true });
            var collectionvalute = db.GetCollection<Valuta>("Valute");
            collectionvalute.Indexes.CreateOne(indexModelVal);
        }
        public IMongoDatabase GetDB() => db;
        /// <summary>
        /// Funkcija za dobijanje kolekcije marketa.
        /// </summary>
        /// <returns> IMongoCollection<Market> </returns>
        public IMongoCollection<Market> GetMarketCollections() => _market;
    }
}
