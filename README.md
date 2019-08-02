# Voice Recognition Project

1. Cấu trúc dự án
  - MobileApp: App di động sử dụng React Native dùng để ghi âm giọng nói và đánh giá chất lượng gióng nói.
  - SNRServer: Server phân tích SNR của file ghi âm được gửi từ MobileApp
  - WebApp: Website quản lý các file ghi âm

2. Cài đặt SNRServer

  2.1 Cài đặt Python
    - Download Python bản mới nhất tại: https://www.python.org/downloads/
    - Cài đặt theo hướng dẫn chi tiết tại : https://phoenixnap.com/kb/how-to-install-python-3-windows
    
  2.2 Cài đặt Django REST framework
    - Sau khi cài đặt thành công Python, mở cửa sổ CMD và chạy lần lượt các lệnh sau để cài đặt Django
      $ pip install django
      $ pip install djangorestframework 
      $ pip install markdown
      $ pip install django-filter
      
    - Sau khi cài đặt thành công Django, trỏ đến thư mục của project SNRServer và chạy lệnh sau để start server

      $ python manage.py runserver
      
      * Trường hợp muốn public thông qua IP và Port thì chạy lệnh:
      
      $ python manage.py runserver [IP]:[PORT]
      
      Vd: $ python manage.py runserver 192.168.43.55:8080
