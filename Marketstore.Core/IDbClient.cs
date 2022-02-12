using Marketstore.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Marketstore.Core
{
    public interface IDbClient
    {
       IMongoDatabase GetDB();
       IMongoCollection<Market> GetMarketCollections();
    }
}
