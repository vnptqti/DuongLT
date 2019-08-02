# Voice Recognition Project

## 1. Cấu trúc dự án
  - MobileApp: App di động sử dụng React Native dùng để ghi âm giọng nói và đánh giá chất lượng gióng nói.
  - SNRServer: Server phân tích SNR của file ghi âm được gửi từ MobileApp
  - WebApp: Website quản lý các file ghi âm

## 2. Cài đặt SNRServer

  ###### 2.1 Cài đặt Python
    - Download Python bản mới nhất tại: https://www.python.org/downloads/
    - Cài đặt theo hướng dẫn chi tiết tại : https://phoenixnap.com/kb/how-to-install-python-3-windows
    
  ###### 2.2 Cài đặt Django REST framework
   - Sau khi cài đặt thành công Python, mở cửa sổ CMD và chạy lần lượt các lệnh sau để cài đặt Django
      ```
      $ pip install django
      $ pip install djangorestframework 
      $ pip install markdown
      $ pip install django-filter
      ```
   - Sau khi cài đặt thành công Django, trỏ đến thư mục của project SNRServer và chạy lệnh sau để start server
      ```
      $ python manage.py runserver
      ```
   - Trường hợp muốn public thông qua IP và Port thì chạy lệnh:
    
      ```
      $ python manage.py runserver [IP]:[PORT]
      ```
      Ví dụ: 
      ```
      $ python manage.py runserver 192.168.43.55:8080
      ```
## 3. Cài đặt môi trường React Native
  - Các bước cài đặt bên dưới thực hiện theo hướng dẫn tại:
    ```
    https://medium.com/@devmrin/complete-how-to-create-react-native-app-with-genymotion-android-emulator-on-windows-10-in-10-3834fd90b074
    ```
  ###### 3.1 Cài đặt Nodejs
    - Donwload vài cài đặt bản mới nhất cả Nodejs tại: https://nodejs.org/en/download/
  ###### 3.2 Cài đặt Android Studio
    - Download vài cài đặt bản mới nhất của Androdi studio tại : https://developer.android.com/studio
  ###### 3.3 Cài đặt Genymotion để làm máy ảo Android
    - Download genymotion bản Persional Edtion tại: https://www.genymotion.com/fun-zone/
    - Lưu ý chọn bản đi kèm với Virtual Box.
  ###### 3.4 Cài đặt Visual Code sử dụng làm IDE.
    - Download bản mới nhất của Visual Code tại : https://code.visualstudio.com/download
  ###### 3.5 Build app
   - Sau khi đã cài đặt theo thứ tự các công cụ ở trên thực hiện các bước sau:
   - Mở Visual code và open thư mục MobileApp
   - Ấn tổ hợp phím Ctrl + ~ để mở cửa sổ terminal trong Visual code
   - Tiến hành chạy lệnh sau để cài đặt các package modules.
      ```
      npm install
      ```
   - Sau khi cài cài đặt xong các pakages tiến hành mở Genymotion và start máy ảo.
   - Sau khi máy ảo start xong. Quay trở lại terminal của Visual code và chạy lệnh
      ```
      react-native run-android
      ```
   - Quá trình build app có thể gặp một số lỗi, trong trường hợp đó hãy thử chạy lại câu lệnh ở trên
   
 ## 4. Cài đặt môi trường WebApp
  ###### 4.1 Cài đặt Visual Studio 2017
    - Download và cài đặt Visual Studio 2017 tại : https://visualstudio.microsoft.com/vs/older-downloads/
  ###### 4.2 Cài đặt MS SQL Server 2014
    - Download và cài đặt MS SQL Server 2014 tại: https://www.microsoft.com/en-us/download/details.aspx?id=42299
  ###### 4.2 Import database
    - Tạo database có tên VoiceRecorder
    - Tiến hành run file VoiceRecorder_DB_Scirpt.sql trong thư mục WebApp để import database
  ###### 4.3 Deploy WebApp
    - Mở Visual Studio và open solution VoiceRecorderServer trong thư mục WebApp
    - Tiến hành publish Web site.
    - Mở IIS và add new một website, trỏ Path vào thư mục Publish website ở trên.
