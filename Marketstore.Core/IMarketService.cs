using System;
using System.Collections.Generic;
using System.Text;
using Marketstore.Models;

namespace Marketstore.Core
{
    public interface IMarketService
    {
       Market GetMarket();
        List<Valuta> GetValute();
    }
}
