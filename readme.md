# Vérifier la route avec POSTMAN et TERMINAL

## POSTMAN

http://localhost:3000/fakedata

Méthode POST
Body 
raw
JSON

{
  "title": "Exemple",
  "body": "This is a fake description"
}

## VS CODE

### index.js

app.post('/fakedata', (req, res) => {
  console.log(req.body)
  res.json({ message: `Let's create a fake post !`, fakedata: req.body })
})

********************************************************************************

## POSTMAN

http://localhost:3000/users/fakedata

Méthode POST
Body 
raw
JSON

{
   "title": "Exemple",
   "body": "This is a fake description"
}

## VS CODE

### index.js

const authRoute = require('./routes/auth')
app.use('/users', authRoute)

### routes > auth.js

router.post('/fakedata', (req, res) => {
   console.log(req.body)
   res.json({ message: `Let's create a fake post !`, fakedata: req.body })
})
