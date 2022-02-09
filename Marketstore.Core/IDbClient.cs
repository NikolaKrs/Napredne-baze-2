using Marketstore.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Marketstore.Core
{
    public interface IDbClient
    {
       IMongoCollection<Market> GetMarketCollections();
       IMongoCollection<Valuta> GetValutaCollections();
    }
}
