using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.DataModel
{
    public class HomeDAL : IDisposable
    {
        public VoiceRecorderEntities db;
        public HomeDAL()
        {
            db = new VoiceRecorderEntities();
        }
        public void Dispose()
        {
            db.Dispose();
        }

        public List<DropdownModel> GetAreaDropdown()
        {
            var kq = from p in db.TB_AREA
                     select p;
            return kq.Select(p => new DropdownModel { Id = p.AREA_ID, Name = p.AREA_DESCRIPTION }).ToList();
        }

        public List<DropdownModel> GetAgeDropdown()
        {
            var kq = from p in db.TB_AGE_GROUP
                     select p;
            return kq.Select(p => new DropdownModel { Id = p.AGE_GROUP_ID, Name = p.AGE_GROUP_DESCRIPTION }).ToList();
        }

        public List<DropdownModel> GetSexDropdown()
        {
            var kq = from p in db.TB_SEX
                     select p;
            return kq.Select(p => new DropdownModel { Id = p.SEX_ID, Name = p.SEX_DESCRIPTION }).ToList();
        }

    }
}
