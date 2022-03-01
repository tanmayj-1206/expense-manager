const User = require('../model/user');
const Balance = require('../model/balance');

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('sign-in', {title: 'Sign In'});
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('sign-up', {title: 'Sign Up'});
}

module.exports.createNewUser = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(user){
            return res.redirect('back');
        }

        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }

        let newUser = await User.create(req.body);
        let newUserBalance = await Balance.create({
            balanceAmount: req.body.balance,
            user: newUser._id
        });
        return res.redirect('/users/sign-in');
    }
    catch(err){
        console.log('error', err);
    }
}

module.exports.createSession = function(req, res){
    res.redirect('/');
}

module.exports.profile = function(req, res){
    return res.render('profile', {title: 'profile'})
}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id)
    {
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}