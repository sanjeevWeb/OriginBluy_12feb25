>Project Title: Media Capture and Storage Web Application

In this application a user can upload images, pdf and videos (not exceeding 10 MB in size)
and view that in his dashboard.This is a part of assignment for MERN developer given by 
OriginBluy.

As my AWS free tier has expired long ago, I chose to store files on backend server in a 
'uploads' folder.

>Backend folder structure (tech stack- Node.js, Express, Mongodb)

*used multer to handle files*

>Frontend folder structure (react with vite)

When a user register and then login, he can upload files by choosing from his device
and it will get saved to backend "uploads" folder and the file details will be saved 
to the database for reference.

>uploads folder backend

>file info in database (mongodb atlas)


>Future Scope

As i got busy and got little time to work, its UI is not that promising, this needs to 
be work on .Also viewing and downloading functionality can be added like google drives.
For storing files some third party open-source options also there e.g. Appwrite. But due
to time constraint i will work these soon i believe.