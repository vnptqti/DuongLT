using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.DataModel
{
    public class FileDAL : IDisposable
    {
        public VoiceRecorderEntities db;
        public FileDAL()
        {
            db = new VoiceRecorderEntities();
        }
        public void Dispose()
        {
            db.Dispose();
        }

        public int InsertFile(TB_FILE record)
        {
            try
            {
                db.TB_FILE.Add(record);
                db.SaveChanges();
                return record.FILE_ID;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        public TB_FILE GetFileById(int id)
        {
            return (from p in db.TB_FILE where p.FILE_ID == id select p).FirstOrDefault();
        }

        public int DeleteFile(TB_FILE data)
        {
            try
            {
                db.TB_FILE.Remove(data);
                db.SaveChanges();
                return 1;
            }
            catch (Exception e)
            {
                return 0;
            }

        }

        public int UpdateIsRead(TB_USER_SCRIPT data)
        {
            try
            {
                data.IS_READ = 0;
                db.Entry(data).State = EntityState.Modified;
                db.SaveChanges();
                return data.ID;
            }
            catch(Exception e)
            {
                return -1;
            }
           
        }

        public TB_USER_SCRIPT GetUserScriptByEmail(string email, int scriptId)
        {
            return (from p in db.TB_USER_SCRIPT where p.USER_NAME == email && p.SCRIPT_ID == scriptId select p).FirstOrDefault();
        }

        public IQueryable<V_File> GetAllFileByEmail(string email)
        {
            if (email == "-1")
            {
                return from p in db.V_File select p;
            }
            else
            {
                return from p in db.V_File where p.USER_NAME == email select p;
            }
        }
    }
}
