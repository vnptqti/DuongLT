using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VoiceRecorderServer.Models
{
    public class AdminModel
    {
        public string Email { get; set; }
        public string Search { get; set; }
        public int Current { get; set; }
        public int RowCount { get; set; }
        public int TotalItems { get; set; }
    }

    public class DownloadModel
    {
        public string FileName { get; set; }
    }
    public class ResponseGrid<T>
    {
        public int current { get; set; }
        public int rowCount { get; set; }
        public int total { get; set; }
        public List<T> rows { get; set; }
        public int nguoinhan_id { get; set; }
        public int loai { get; set; }
        public int sapxep { get; set; }
        public string timkiem { get; set; }
        public int phanloaicanhan { get; set; }
    }
}