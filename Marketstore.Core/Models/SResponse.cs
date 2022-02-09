using System;
using System.Collections.Generic;
using System.Text;

namespace Marketstore.Models
{
    public class SResponse
    {
        public bool valid { get; set; }
        public string message { get; set; }

        public SResponse(bool valid, string message)
        {
            this.valid = valid;
            this.message = message;
        }

    }
}
