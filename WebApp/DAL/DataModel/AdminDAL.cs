using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.DataModel
{
    public class AdminDAL : IDisposable
    {
        public VoiceRecorderEntities db;
        public AdminDAL()
        {
            db = new VoiceRecorderEntities();
        }
        public void Dispose()
        {
            db.Dispose();
        }

        public List<DropdownModel> GetEmailDropdown()
        {
            var kq = from p in db.TB_USER
                     select p;
            return kq.Select(p => new DropdownModel { Id = p.USER_ID, Name = p.USER_NAME,Value = p.USER_NAME }).ToList();
        }
    }
}
