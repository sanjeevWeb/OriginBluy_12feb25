## Project Title: Media Capture and Storage Web Application

In this application a user can upload images, pdf and videos (not exceeding 10 MB in size)
and view that in his dashboard.This is a part of assignment for MERN developer given by 
OriginBluy.

As my AWS free tier has expired long ago, I chose to store files on backend server in a 
'uploads' folder.

>Backend folder structure (tech stack- Node.js, Express, Mongodb)

*used multer to handle files*

![backend_fs](https://github.com/user-attachments/assets/13a9773a-cc75-4b6b-846d-ae94bd7755c0)

>Frontend folder structure (react with vite)

![frontend_fs](https://github.com/user-attachments/assets/2491a03e-226e-43a3-8d37-8948d36faffb)

When a user register and then login, he can upload files by choosing from his device
and it will get saved to backend "uploads" folder and the file details will be saved 
to the database for reference.

![front_file_upload](https://github.com/user-attachments/assets/fe042065-2618-4881-b395-72e0a25202da)

>uploads folder backend

![uploads](https://github.com/user-attachments/assets/5eeb5b91-6dd6-4175-b1e4-da3f1f291cfc)

>file info in database (mongodb atlas)

![saved_filesINDB](https://github.com/user-attachments/assets/e832e922-fc10-4bf3-920e-a54704e60aca)

>Future Scope

As i got busy and got little time to work, its UI is not that promising, this needs to 
be work on .Also viewing and downloading functionality can be added like google drives.
For storing files some third party open-source options also there e.g. Appwrite. But due
to time constraint i will work these soon i believe.
