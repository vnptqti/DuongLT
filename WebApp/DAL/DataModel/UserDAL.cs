using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.DataModel
{
    public class UserDAL : IDisposable
    {
        public VoiceRecorderEntities db;
        public UserDAL()
        {
            db = new VoiceRecorderEntities();
        }
        public void Dispose()
        {
            db.Dispose();
        }

        public TB_USER getUserByEmail(string email)
        {
            return (from p in db.TB_USER where p.EMAIL == email select p).FirstOrDefault();
        }

        public IQueryable<TB_USER> GetAllUser()
        {
            try
            {
                return from p in db.TB_USER select p;
            }
            catch(Exception e)
            {
                return null;
            }
        }


        public int UpdateRead(string username, int scriptId)
        {
            try
            {
                TB_USER_SCRIPT data = (from p in db.TB_USER_SCRIPT where p.USER_NAME == username && p.SCRIPT_ID == scriptId select p).FirstOrDefault();
                data.IS_READ = 1;
                db.Entry(data).State = EntityState.Modified;
                db.SaveChanges();
                return data.ID;
            }
            catch
            {
                return -1;
            }
        }

        public string InsertUser(TB_USER record)
        {
            try
            {
                db.TB_USER.Add(record);
                db.SaveChanges();
                return record.EMAIL;
            }
            catch (Exception e)
            {
                return "err";
            }
        }

        public int InsertUserScript(string username)
        {
            try
            {
                var lstScript = (from p in db.TB_SCRIPT select p).ToList();
                TB_USER_SCRIPT re;
                int i = 0;
                foreach (var item in lstScript)
                {
                    re = new TB_USER_SCRIPT();
                    re.SCRIPT_ID = item.SCRIPT_ID;
                    re.USER_NAME = username;
                    re.IS_READ = 0;
                    re.SCRIPT_DESCRITPTION = item.SCRIPT_DESCRITPTION;
                    re.STT = i++;
                    db.TB_USER_SCRIPT.Add(re);
                    db.SaveChanges();
                }
                return 1;
            }
            catch (Exception e)
            {
                return 0;
            }
        }
    }
}
