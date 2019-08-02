using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VoiceRecorderServer.Models
{
    public class ResponseFileModel : V_File
    {
        public byte[] AudioContent { get; set; }
        
    }
}