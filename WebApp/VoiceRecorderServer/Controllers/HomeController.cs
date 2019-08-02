using DAL;
using DAL.DataModel;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Mvc;
using VoiceRecorderServer.Models;

namespace VoiceRecorderServer.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
    public class UploadAudioController : ApiController
    {
        [System.Web.Http.Route("api/Home/UploadAudio")]
        [System.Web.Http.HttpPost]
        public string DongBo()
        {
            string fileSavePath = null;
            string nameFile1 = null;
            string nameFile2 = null;
            string nameFile3 = null;
            try
            {
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    FileDAL fileDal = new FileDAL();
                    TB_FILE fileData1 = new TB_FILE();
                    TB_FILE fileData2 = new TB_FILE();
                    TB_FILE fileData3 = new TB_FILE();

                    // Get the uploaded from the Files collection
                    var httpPostedFile1 = HttpContext.Current.Request.Files["audio_data1"];
                    var httpPostedFile2 = HttpContext.Current.Request.Files["audio_data2"];
                    var httpPostedFile3 = HttpContext.Current.Request.Files["audio_data3"];

                    var homeModel = HttpContext.Current.Request.Params["model"];
                    JObject jsonModel = JObject.Parse(homeModel);

                    nameFile1 = DateTime.Now.ToFileTime().ToString();
                    nameFile2 = DateTime.Now.AddSeconds(1).ToFileTime().ToString();
                    nameFile3 = DateTime.Now.AddSeconds(3).ToFileTime().ToString();

                    fileData1.FILE_LOCATION = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Upload"), nameFile1 + ".wav");
                    fileData1.FILE_NAME = nameFile1 + ".wav";
                    fileData1.SCRIPT_ID = (int)jsonModel["ScriptId"];
                    fileData1.USER_ID = 1; //harcode admin :))
                    fileData1.AGE_GROUP_ID = (int)jsonModel["AgeId"];
                    fileData1.AREA_ID = (int)jsonModel["AreaId"];
                    fileData1.SEX_ID = (int)jsonModel["SexId"];
                    fileData1.EMAIL = (string)jsonModel["Email"];

                    fileData2.FILE_LOCATION = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Upload"), nameFile2 + ".wav");
                    fileData2.FILE_NAME = nameFile2 + ".wav";
                    fileData2.SCRIPT_ID = (int)jsonModel["ScriptId"];
                    fileData2.USER_ID = 1; //harcode admin :))
                    fileData2.AGE_GROUP_ID = (int)jsonModel["AgeId"];
                    fileData2.AREA_ID = (int)jsonModel["AreaId"];
                    fileData2.SEX_ID = (int)jsonModel["SexId"];
                    fileData2.EMAIL = (string)jsonModel["Email"];

                    fileData3.FILE_LOCATION = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Upload"), nameFile3 + ".wav");
                    fileData3.FILE_NAME = nameFile3 + ".wav";
                    fileData3.SCRIPT_ID = (int)jsonModel["ScriptId"];
                    fileData3.USER_ID = 1; //harcode admin :))
                    fileData3.AGE_GROUP_ID = (int)jsonModel["AgeId"];
                    fileData3.AREA_ID = (int)jsonModel["AreaId"];
                    fileData3.SEX_ID = (int)jsonModel["SexId"];
                    fileData3.EMAIL = (string)jsonModel["Email"];

                    var validateStr = Validate(fileData1);
                    if (validateStr != "ok")
                    {
                        return validateStr;
                    }

                    fileDal.InsertFile(fileData1);
                    fileDal.InsertFile(fileData2);
                    fileDal.InsertFile(fileData3);

                    if (httpPostedFile1 != null)
                    {
                        // Validate the uploaded image(optional)

                        // Get the complete file path

                        fileSavePath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Upload"), nameFile1 + ".wav");

                        if (File.Exists(fileSavePath))
                        {
                            File.Delete(fileSavePath);
                        }

                        // Save the uploaded file to "UploadedFiles" folder
                        httpPostedFile1.SaveAs(fileSavePath);
                    }
                    if (httpPostedFile2 != null)
                    {
                        // Validate the uploaded image(optional)

                        // Get the complete file path

                        fileSavePath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Upload"), nameFile2 + ".wav");

                        if (File.Exists(fileSavePath))
                        {
                            File.Delete(fileSavePath);
                        }

                        // Save the uploaded file to "UploadedFiles" folder
                        httpPostedFile2.SaveAs(fileSavePath);
                    }
                    if (httpPostedFile3 != null)
                    {
                        // Validate the uploaded image(optional)

                        // Get the complete file path

                        fileSavePath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Upload"), nameFile3 + ".wav");

                        if (File.Exists(fileSavePath))
                        {
                            File.Delete(fileSavePath);
                        }

                        // Save the uploaded file to "UploadedFiles" folder
                        httpPostedFile3.SaveAs(fileSavePath);
                    }
                }
                return "ok";
            }
            catch (Exception e)
            {
                return e.Message + " = " + Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Upload"), nameFile1);
            }
        }

        [System.Web.Http.Route("api/Home/UploadAudio2")]
        [System.Web.Http.HttpPost]
        public string DongBo2()
        {
            string fileSavePath = null;
            string nameFile1 = null;

            try
            {
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    FileDAL fileDal = new FileDAL();
                    TB_FILE fileData1 = new TB_FILE();


                    // Get the uploaded from the Files collection
                    var httpPostedFile1 = HttpContext.Current.Request.Files["audio_data1"];

                    var homeModel = HttpContext.Current.Request.Params["model"];
                    JObject jsonModel = JObject.Parse(homeModel);

                    nameFile1 = DateTime.Now.ToFileTime().ToString();

                    fileData1.FILE_LOCATION = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Upload"), nameFile1 + ".wav");
                    fileData1.FILE_NAME = nameFile1 + ".wav";
                    fileData1.SCRIPT_ID = (int)jsonModel["ScriptId"];
                    fileData1.USER_ID = 1; //harcode admin :))
                    fileData1.AGE_GROUP_ID = (int)jsonModel["AgeId"];
                    fileData1.AREA_ID = (int)jsonModel["AreaId"];
                    fileData1.SEX_ID = (int)jsonModel["SexId"];
                    fileData1.EMAIL = (string)jsonModel["Email"];
                    fileData1.SNR = (string)jsonModel["Snr"];

                    var validateStr = Validate(fileData1);
                    if (validateStr != "ok")
                    {
                        return validateStr;
                    }

                    fileDal.InsertFile(fileData1);

                    if (httpPostedFile1 != null)
                    {
                        // Validate the uploaded image(optional)

                        // Get the complete file path

                        fileSavePath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Upload"), nameFile1 + ".wav");

                        if (File.Exists(fileSavePath))
                        {
                            File.Delete(fileSavePath);
                        }

                        // Save the uploaded file to "UploadedFiles" folder
                        httpPostedFile1.SaveAs(fileSavePath);
                    }
                    UserDAL userDal = new UserDAL();
                    userDal.UpdateRead((string)jsonModel["Email"], (int)jsonModel["ScriptId"]);
                }

                return "ok";
            }
            catch (Exception e)
            {
                return e.Message + " = " + Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Upload"), nameFile1);
            }
        }

        [System.Web.Http.Route("api/Home/KiemTraThongTinNguoiDung")]
        [System.Web.Http.HttpPost]
        public string KiemTraThongTinNguoiDung(HomeModel model)
        {
            string res = Validate(model);
            if (res == "ok")
            {
                UserDAL dal = new UserDAL();
                if (dal.getUserByEmail(model.Email) == null)
                {
                    TB_USER user = new TB_USER();
                    user.EMAIL = model.Email;
                    user.PASSWORD = "";
                    user.USER_NAME = model.Email;
                    dal.InsertUser(user);
                    dal.InsertUserScript(model.Email);
                }
            }
            return res;
        }

        [System.Web.Http.Route("api/Home/UpdateVote")]
        [System.Web.Http.HttpPost]
        public string UpdateVode(HomeModel model)
        {
            ScriptDAL dal = new ScriptDAL();
            var result = dal.UpdateVote(model.Type, model.RowId);
            if (result > 0)
            {
                return "ok";
            }
            else
            {
                return "nok";
            };
        }

        [System.Web.Http.Route("api/Home/GetRandomScript")]
        [System.Web.Http.HttpPost]
        public JsonResult<TB_USER_SCRIPT> GetRanDomScript(AdminModel model)
        {
            ScriptDAL dal = new ScriptDAL();
            TB_USER_SCRIPT script = dal.GetRandomScript(model.Email).FirstOrDefault();
            return Json(script);
        }

        [System.Web.Http.Route("api/Home/GetRandomScriptDanhGia")]
        [System.Web.Http.HttpPost]
        public JsonResult<ResponseFileModel> GetRanDomScriptDanhGia(AdminModel model)
        {
            ScriptDAL dal = new ScriptDAL();
            V_File script = dal.GetRandomScriptDanhGia().FirstOrDefault();
            string filePath = HttpContext.Current.Server.MapPath("~/Upload/" + script.FILE_NAME);


            ResponseFileModel res = new ResponseFileModel();
            res.AudioContent = StoreFile(filePath);
            res.AGE_GROUP_DESCRIPTION = script.AGE_GROUP_DESCRIPTION;
            res.AREA_DESCRIPTION = script.AREA_DESCRIPTION;
            res.FILE_ID = script.FILE_ID;
            res.SCRIPT_DESCRITPTION = script.SCRIPT_DESCRITPTION;
            res.SCRIPT_ID = script.SCRIPT_ID;
            res.FILE_NAME = script.FILE_NAME;
            return Json(res);
        }

        [System.Web.Http.Route("api/Home/GetAreaDropdown")]
        [System.Web.Http.HttpGet]
        public JsonResult<List<DropdownModel>> GetAreaDropdown()
        {
            HomeDAL dal = new HomeDAL();
            List<DropdownModel> data = dal.GetAreaDropdown();
            return Json(data);
        }

        [System.Web.Http.Route("api/Home/GetAgeDropdown")]
        [System.Web.Http.HttpGet]
        public JsonResult<List<DropdownModel>> GetAgeDropdown()
        {
            HomeDAL dal = new HomeDAL();
            List<DropdownModel> data = dal.GetAgeDropdown();
            return Json(data);
        }

        [System.Web.Http.Route("api/Home/GetSexDropdown")]
        [System.Web.Http.HttpGet]
        public JsonResult<List<DropdownModel>> GetSexDropdown()
        {
            HomeDAL dal = new HomeDAL();
            List<DropdownModel> data = dal.GetSexDropdown();
            return Json(data);
        }

        public string Validate(TB_FILE data)
        {
            if (!isEmail(data.EMAIL))
            {
                return "Email không đúng định dạng.";
            }
            if (data.AGE_GROUP_ID < 1)
            {
                return "Vui lòng chọn độ tuổi.";
            }
            if (data.AREA_ID < 1)
            {
                return "Vui lòng chọn vùng miền.";
            }
            if (data.SEX_ID < 1)
            {
                return "Vui lòng chọn giới tính.";
            }

            return "ok";
        }

        public string Validate(HomeModel data)
        {
            if (!isEmail(data.Email))
            {
                return "Email không đúng định dạng.";
            }
            if (data.AgeId < 1)
            {
                return "Vui lòng chọn độ tuổi.";
            }
            if (data.AreaId < 1)
            {
                return "Vui lòng chọn vùng miền.";
            }
            if (data.SexId < 1)
            {
                return "Vui lòng chọn giới tính.";
            }

            return "ok";
        }

        public static bool isEmail(string inputEmail)
        {
            inputEmail = inputEmail ?? string.Empty;
            string strRegex = @"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                  @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                  @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
            Regex re = new Regex(strRegex);
            if (re.IsMatch(inputEmail))
                return (true);
            else
                return (false);
        }

        public byte[] StoreFile(String sFileName)
        {
            if (!File.Exists(sFileName)) return null;
            FileStream fs = new FileStream(sFileName, FileMode.Open, FileAccess.Read);
            // Create a byte array of file stream length
            byte[] fielData = new byte[fs.Length];
            //Read block of bytes from stream into the byte array
            fs.Read(fielData, 0, System.Convert.ToInt32(fs.Length));
            //Close the File Stream
            fs.Close();
            //para.Size=sizeof (ImageData); 
            // Set command to create Anonymous PL/SQL Block
            return fielData;
        }
    }
}