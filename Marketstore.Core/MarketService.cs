using Marketstore.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Marketstore.Core
{
    public class MarketService : IMarketService
    {
        private readonly IMongoCollection<Market> _market;
        private readonly IMongoCollection<Valuta> _valute;
        public MarketService(IDbClient dbClient)
        {
            _market = dbClient.GetMarketCollections();
            _valute = dbClient.GetValutaCollections();
        }

        public Market GetMarket()
        {
            return  _market.Find(x => x.ime == "Binance").FirstOrDefault();
        }
        public List<Valuta> GetValute()
        {
            return _valute.Find(x=> true).ToList();
        }
    }
}
