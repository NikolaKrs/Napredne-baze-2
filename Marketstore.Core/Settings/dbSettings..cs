using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;

namespace Marketstore.Core.Settings
{
    public sealed class dbSettings
    {
        private static string connection_string;
        private static string db_name;
        private static string main_collection;

        private static readonly dbSettings instance = new dbSettings();
        public static string Connection_String { get => connection_string; }
        public static string DB_Name { get => db_name; }
        public static string Main_Collection { get => main_collection; }
        
        static dbSettings() {}

        private dbSettings() {
            //cita podatke iz _dbsettings.json fajla koji je kreiran u plikaciji
            JObject data = JObject.Parse(File.ReadAllText("_dbsettings.json"));
            connection_string = data.Value<string>("CONNECTION_STRING");
            db_name = data.Value<string>("DB_NAME");
            main_collection = data.Value<string>("MAIN_COLLECTION");
        }

        public static dbSettings Instance
        {
            get => instance;
        }
    }
}
