using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VoiceRecorderServer.Models
{
    public class HomeModel
    {
        public int ScriptId { get; set; }
        public string ScriptDes { get; set; }
        public string Email { get; set; }
        public int AreaId { get; set; }
        public int SexId { get; set; }
        public int AgeId { get; set; }
        public string Type { get; set; }
        public int RowId { get; set; }
    }
}