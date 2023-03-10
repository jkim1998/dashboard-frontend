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
        design

    -login
        create account
            email password (how to pass email from request not auth)
        sign in with github, other SSO

    -tickets 
        sort
            by id
        pagination
            works but not displaying more than 10
        search bar 
            by category
        design

    -employee
        Create
        Update
        Delete
        design 

    -projects    
        Create/Update
            member
                not being passed

    -user profile 
        Update
        design
    
    -admin previleges 
        -admin
            -all previllege 
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
