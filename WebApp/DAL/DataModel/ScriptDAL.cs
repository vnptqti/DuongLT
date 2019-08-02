using System;
using System.Data;
using System.Linq;

namespace DAL.DataModel
{
    public class ScriptDAL : IDisposable
    {
        public VoiceRecorderEntities db;
        public ScriptDAL()
        {
            db = new VoiceRecorderEntities();
        }
        public void Dispose()
        {
            db.Dispose();
        }

        public IQueryable<TB_SCRIPT> GetRandomScript()
        {
            try
            {
                return from p in db.TB_SCRIPT select p;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public IQueryable<TB_USER_SCRIPT> GetRandomScript(string username)
        {
            try
            {
                return from p in db.TB_USER_SCRIPT where p.USER_NAME == username && p.IS_READ == 0 orderby p.STT select p;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public IQueryable<V_File> GetRandomScriptDanhGia()
        {
            try
            {
                var query = from p in db.V_File orderby Guid.NewGuid() select p;
                return query;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public int UpdateVote(string type, int fileId)
        {
            var data = (from p in db.TB_FILE where p.FILE_ID == fileId select p).FirstOrDefault();
            if (type == "like")
            {
                data.VOTE_GOOD = data.VOTE_GOOD + 1;
            }
            else
            {
                data.VOTE_BAD = data.VOTE_BAD + 1;
            }
            try
            {

                db.Entry(data).State = EntityState.Modified;
                db.SaveChanges();
                return data.FILE_ID;
            }
            catch (Exception e)
            {
                return 0;
            }

        }
    }
}
