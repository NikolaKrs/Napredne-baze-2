using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Marketstore.Models
{
    public class SResponse<T> where T: class
    {
        [JsonIgnore]
        public bool valid { get; set; }
        public string message { get; set; }
        public int statuscode { get; set; }
        public T obj { get; set; }
        public SResponse(bool valid, string message)
        {
            this.valid = valid;
            this.message = message;
            if (valid)
                statuscode = 200;
            else
                statuscode = 404;
            this.obj = null;
        }

        public SResponse(bool valid, string message, T obj) : this(valid,message)
        {
            this.obj = obj;
        }
    }

    public class SResponse : SResponse<object>
    { 
        public SResponse(bool valid, string message) : base(valid, message) { }
    }
}
