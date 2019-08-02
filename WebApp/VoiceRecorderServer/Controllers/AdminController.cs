using DAL;
using DAL.DataModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http.Results;
using System.Web.Mvc;
using VoiceRecorderServer.Models;

namespace VoiceRecorderServer.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        // GET: Admin/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Admin/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Admin/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Admin/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Admin/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Admin/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        public FileResult PlayFile(string fileName)
        {
            string filePath = Server.MapPath("~/Upload/" + fileName);
            return new FilePathResult(filePath, "audio/wav");
        }

        public ActionResult Download(string fileName)
        {
            return File(Server.MapPath("~/Upload/" + fileName), "audio/x-wav", fileName);
        }

        public ActionResult DownloadZip(string email)
        {
            FileDAL fileDal = new FileDAL();
            var lst = fileDal.GetAllFileByEmail(email).OrderBy(p=>p.SCRIPT_ID).ToList();

            if(email == "-1")
            {
                email = "All";
            }

            string uploadFolder = Server.MapPath("~/Upload/");

            bool exists = Directory.Exists(uploadFolder + "\\" + email);

            if (!exists)
            {
               Directory.CreateDirectory(uploadFolder + "\\" + email);
            } else
            {
                Directory.Delete(uploadFolder + "\\" + email, true);
                Directory.CreateDirectory(uploadFolder + "\\" + email);
            }
            int fileNum = 1;
            int dupNum = 1;
            for(int i = 0; i<lst.Count; i++)
            {
                if (System.IO.File.Exists(Server.MapPath("~/Upload/" + lst[i].FILE_NAME)))
                {
                    // vd: nếu đã tồn tại file Câu_1
                    if (System.IO.File.Exists(Server.MapPath("~/Upload/" + email + "/" + "Câu_" + fileNum.ToString() + ".wav")))
                    {
                        // thì kiểm tra tiếp xem có tồn tại file Câu_1_1
                        if (System.IO.File.Exists(Server.MapPath("~/Upload/" + email + "/" + "Câu_" + fileNum.ToString() + "_" + dupNum.ToString() + ".wav")))
                        {
                            System.IO.File.Copy(Server.MapPath("~/Upload/" + lst[i].FILE_NAME), Server.MapPath("~/Upload/" + email + "/" + "Câu_" + fileNum.ToString() + "_" + (dupNum + 1).ToString() + ".wav"), true);
                            dupNum++;
                        } else
                        {
                            System.IO.File.Copy(Server.MapPath("~/Upload/" + lst[i].FILE_NAME), Server.MapPath("~/Upload/" + email + "/" + "Câu_" + fileNum.ToString() + "_" + dupNum.ToString() + ".wav"), true);
                            dupNum++;
                        }
                    } else
                    {
                        System.IO.File.Copy(Server.MapPath("~/Upload/" + lst[i].FILE_NAME), Server.MapPath("~/Upload/" + email + "/" + "Câu_" + fileNum.ToString() + ".wav"), true);
                        dupNum = 1;
                    }
                    // kiểm tra phần tử tiếp theo có trùng script id với phần tử hiện tại
                    if(i + 1 < lst.Count)
                    {
                        if(lst[i+1].SCRIPT_ID != lst[i].SCRIPT_ID)
                        {
                            fileNum++;
                            dupNum = 1;
                        }
                    }
                }
            }

            if ((System.IO.File.Exists(uploadFolder + "\\" + email + ".zip")))
            {
                System.IO.File.Delete(Server.MapPath("~/Upload/" + email + ".zip"));
            }

            ZipFile.CreateFromDirectory(Server.MapPath("~/Upload/" + email), Server.MapPath("~/Upload/" + email + ".zip"));

            return File(Server.MapPath("~/Upload/" + email + ".zip"), "application/zip", email + ".zip");
        }
    }
    public class AdminManaController : System.Web.Http.ApiController
    {
        [System.Web.Http.Route("api/Admin/GetEmailDropdown")]
        [System.Web.Http.HttpGet]
        public JsonResult<List<DropdownModel>> GetEmailDropdown()
        {
            AdminDAL dal = new AdminDAL();
            List<DropdownModel> data = dal.GetEmailDropdown();
            return Json(data);

        }

        [System.Web.Http.Route("api/Admin/GetDanhSachFile")]
        [System.Web.Http.HttpPost]
        public JsonResult<ResponseGrid<V_File>> GetDanhSachFile(AdminModel model)
        {
            var response = new ResponseGrid<V_File>
            {
                current = model.Current,
                rowCount = model.RowCount,
                total = model.TotalItems,
                rows = new List<V_File>()
            };
            FileDAL fileDal = new FileDAL();
            List<V_File> lst = fileDal.GetAllFileByEmail(model.Email).OrderBy(p=>p.SCRIPT_ID).ToList();
            response.rows = lst.Skip(model.RowCount * (model.Current - 1)).Take(model.RowCount).ToList();
            response.total = lst.Count();
            return Json(response);
        }

        [System.Web.Http.Route("api/Admin/DeleteRecord/{id}")]
        [System.Web.Http.HttpGet]
        public int DeleteRecord(int id)
        {
            var result = 0;
            FileDAL fileDal = new FileDAL();
            var data = fileDal.GetFileById(id);

            var fileName = data.FILE_NAME;
            var email = data.EMAIL;
            var scriptId = data.SCRIPT_ID;

            var userScript = fileDal.GetUserScriptByEmail(email, scriptId);

            result = fileDal.UpdateIsRead(userScript);
            result = fileDal.DeleteFile(data);

            if(result == 1)
            {
                string filePath = HttpContext.Current.Server.MapPath("~/Upload");
                if ((System.IO.File.Exists(filePath + "\\" + fileName)))
                {
                    System.IO.File.Delete(filePath + "\\" + fileName);
                }
            }

            return result;
        }

        [System.Web.Http.Route("api/Admin/Download")]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage Download(DownloadModel model)
        {
            string filePath = HttpContext.Current.Server.MapPath("~/Upload");

            var stream = new MemoryStream();
            // processing the stream.

            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(StoreFile(filePath + "\\" + model.FileName))
            };
            result.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = model.FileName
                };
            result.Content.Headers.ContentType =
                new MediaTypeHeaderValue("application/media");

            return result;

            ////FileInfo file = new FileInfo(filePath + "/" + model.FileName);
            ////if (file.Exists)
            ////{
            //HttpContext context = HttpContext.Current;
            //    //context.Response.Clear();
            //    //context.Response.ClearHeaders();
            //    //context.Response.ClearContent();
            //    //context.Response.AddHeader("content-disposition", "attachment; filename=" + HttpUtility.UrlEncode(model.FileName));
            //    //context.Response.AddHeader("Content-Type", "application");
            //    //context.Response.ContentType = "application/audio";
            //    //context.Response.AddHeader("Content-Length", file.Length.ToString());
            //    //context.Response.WriteFile(file.FullName);
            //    //context.Response.End();
            //    byte[] content = StoreFile(filePath + "\\" + model.FileName);
            //    context.Response.Clear();
            //    context.Response.ContentType = "Application/" + "text/csv";
            //    context.Response.AddHeader("content-disposition", "attachment;filename=" + model.FileName);//+ fileName.Replace("+", " ") + fileExt);
            //    context.Response.BinaryWrite(content);
            //    context.Response.End();
            //return context;
            ////}
        }

        public byte[] StoreFile(String sFileName)
        {
            if (!File.Exists(sFileName)) return null;
            FileStream fs = new FileStream(sFileName, FileMode.Open, FileAccess.Read);
            // Create a byte array of file stream length
            byte[] ImageData = new byte[fs.Length];
            //Read block of bytes from stream into the byte array
            fs.Read(ImageData, 0, System.Convert.ToInt32(fs.Length));
            //Close the File Stream
            fs.Close();
            //para.Size=sizeof (ImageData); 
            // Set command to create Anonymous PL/SQL Block
            return ImageData;
        }
    }
}

