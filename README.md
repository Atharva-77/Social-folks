# [Social-folks](https://social-folks.vercel.app/)
This website is in **MERN(MongoDB Express, Reactjs, Nodejs)** stack like twitter:- https://social-folks.vercel.app/

You can  **Create a Post**, **Retweet** Post, **Comment** on a Post.   
**Unique Feature** (which isn't on twitter):- User can also **Edit** a Post. Also other users can see the **original post that was edited**.   

Users can **Follow, Unfollow** a user.   
Users can **Update their description** part too.   

**Searching of Post , Users** can also be done.   

## Features:-
1. Create a Posts   
2. Retweet a Post   
3. Comment on a Post.   
4. **Edit a Post.** **Unique Feature** (which isn't on twitter)   
5. Follow, Unfollow a user.   
6. Update User description.   
7. Upload a Proifile & Cover Picture.   
8. Searching of Posts, Users.   

## Techstack:-  
**MERN(MongoDB Express, Reactjs, Nodejs)** Stack is used to build the website.

Frontend is made in **Reactjs**. **Redux** is used for login part.   
Backend is made in **Nodejs, express** and **Mongodb** is the database used.   

**Firebase** is used to host Profile & Cover Pictures of a user.


## How to run project locally?:- 
1. Go to ```backend``` directory
2. Do ```npm run install```. Server gets started.
3. Come out of ```backend``` directory. i.e. come in same level where src folder is.
4. Do ```npm run install```. Frontend gets started.
5. In ```backend/config_folder``` create ```config.env```
6. In ```config.env``` file, put:-   
&ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp; &ensp;&ensp; &ensp;&ensp; &ensp;   a. PORT &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;(Port number where server is to be run)   
&ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp; &ensp;&ensp; &ensp;&ensp; &ensp;   b. MONGO_URI        &ensp; &ensp; &ensp;&ensp; &ensp; &ensp;&ensp;&ensp;  (MongoDb url of database to connect)   
&ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp; &ensp;&ensp; &ensp;&ensp; &ensp;   c. JWT_SECRET_TOKEN &ensp; &ensp; &ensp;  (Can put any string as the token)   

7. Come to root level. (where ```src```, ```package.json``` is)
8. Create ```.env``` file, and put all firebase credentials. In ```env``` file, the variables should start with REACT_APP (e.g. REACT_APP_NameOfVariable). 
    ```env``` file should have  :-   
&ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp; &ensp;&ensp; &ensp;&ensp; &ensp; a. REACT_APP_APIKEY   
&ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp; &ensp;&ensp; &ensp;&ensp; &ensp; b. REACT_APP_AUTHDOMAIN   
&ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp; &ensp;&ensp; &ensp;&ensp; &ensp; c. REACT_APP_PROJECTID   
&ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp; &ensp;&ensp; &ensp;&ensp; &ensp; d. REACT_APP_STORAGEBUCKET      
&ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp; &ensp;&ensp; &ensp;&ensp; &ensp; e. REACT_APP_MESSAGINGSENDERID   
&ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp; &ensp;&ensp; &ensp;&ensp; &ensp; f. REACT_APP_APPID   
&ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp; &ensp;&ensp; &ensp;&ensp; &ensp; g. REACT_APP_MEASUREMENTID   
