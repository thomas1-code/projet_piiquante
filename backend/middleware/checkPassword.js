const passwordValidator = require("password-validator");

const schema = new passwordValidator();

schema
.is().min(8)                                    
.is().max(100)                                  
.has().uppercase()                              
.has().lowercase()                              
.has().digits()                                
.has().not().spaces()                           
.is().not().oneOf(['Passw0rd', 'Password123']); 

module.exports = (req, res, next) =>{
    if(!schema.validate(req.body.password)){
        return res.status(400).json({ error: `Mot de passe invalide : ${ schema.validate(`${req.body.password}`, { list: true }) }` })
    }else{
        next();
    }
}