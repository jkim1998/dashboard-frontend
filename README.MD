### deployment

## client 
url: https://dashboard-frontend-git-main-jkim1998.vercel.app | http://localhost:3000 (npm run dev)

## server
url: https://dashboard-server-aq1z.onrender.com | http://localhost:8080 (npm start)
/* server is a little slow */



### steps 

1. client/app.tsx 
    edit url (2)

2. server/index.tsx
    edit url (1) /* console.log print. not necessary */

3. in client dir, `npm run dev`
4. in server dir, `npm start`


### to do 

## client
# must

    -home
        users by role
        tickets pie graph
        tickets bar graph
        analytics

    -login
        sign in with github, other SSO
        google sign doesn't create account
        customize AuthPage or make new 
            name
            role= user
            phone
            avatar
            location

    -tickets 
        sort by id
        search bar by category

    -employee
        Delete

    -projects    
        Create/Update
            member not being passed

    -admin previleges 
        -admin
            -all previllege 
            -change other users' role 
            -delete user
        -project manager
            -developer
            -Create, Update, Delete projects 
        -developer
            -submitter 
            -Update, Delete tickets assigned to them
            -Create, Update, Delete their own projects 
        -submitter
            -Create, Update(Edit, completion status), Delete their own tickets 

    -test accounts 
        1. admin
        2. PM
        3. developer
        4. User

# extra
    Three.js
    contact me page


## server
    queries clean up
    password hashing 

# must 
    CRUD for each pages 
    Authcontext
    protected routes?
    
# extra
    chat between employees 
    chat with AI 
    send email to other employees
    undo delete?
        -mark hidden and hidden data will be deleted after x hrs
