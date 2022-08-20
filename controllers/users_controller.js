const User = require('../model/user');
const Balance = require('../model/balance');
let Verification = require('../model/verification');
const crypto = require('crypto');
const verificationMailer = require('../mailers/verify_account');
const resetPasswordMailer = require('../mailers/reset_password');
let Reset = require('../model/reset_password');
const passport = require('passport');
const url = require('url');

module.exports.signUp = async function(req, res){

    try{
        if(req.body.password != req.body.confirmPassword){
            return res.status(422).json({
                message: 'Password does not match'
            });
        }
        console.log('b')
        let user = await User.findOne({email: req.body.email});
        
        if(user){
            return res.status(422).json({
                message: 'Email already in use'
            });
        }
        
        user = await User.create(req.body);
        let newUserBalance = await Balance.create({
            balanceAmount: req.body.balance,
            user: user._id
        });
        let token = crypto.randomBytes(20).toString('hex');
        let verify = await Verification.create({
            user: user._id,
            token: token
        });
        const urlObject = url.parse(req.url, true);
        let link = `${req.protocol}://${req.get('host')}/verify-account/${token}`
        verificationMailer.verifyAccount(user, link);
        if(req.xhr){
            return res.status(200).json({
                data: {
                    user: user.name
                },
                message: 'user created'
            });
        }

        return res.redirect('/');
    }catch(err){
        console.log('error in sign up', err);
    }
}

module.exports.confirmVerification = async function(req, res){
    try{
        let token = req.params.token;

        let verify = await Verification.findOne({token: token});

        if(!verify){
            return res.render('verified', {layout: false, title: 'Expense Manager | Account verification', error: true})
        }

        let user = await User.findOneAndUpdate({_id: verify.user}, {verified: true});
        await Verification.findOneAndDelete({token: token})

        return res.render('verified', {layout: false, title: 'Expense Manager | Account verification', error: false})

    }catch(err){
        console.log(err);
    }
}

module.exports.forgotPassword = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(422).json({
                message: 'User not found'
            });
        }

        let oldToken = await Reset.findOne({user: user._id});
        if(oldToken){
            console.log(oldToken)
            return res.status(422).json({
                message: 'Link already sent'
            });
        }

        let token = crypto.randomBytes(20).toString('hex');
        let reset = await Reset.create({
            user: user._id,
            token: token
        });

        console.log(reset);
        let link = `${req.protocol}://${req.get('host')}/reset-password/${token}`
        resetPasswordMailer.resetPassword(user, link);

        if(req.xhr){
            return res.status(200).json({
                message: 'Link sent'
            });

        }
    }catch(err){
        console.log(err);
    }
}

module.exports.resetPasswordView = async function(req, res){
    try{
        let token = req.params.token;
        let reset = await Reset.findOne({token: token});
        
        if(!reset){
            return res.render('resetPassword', {layout: false, title: 'Expense Manager | Forgot password', error: true})
        }
        return res.render('resetPassword', {layout: false, title: 'Expense Manager | Forgot password', user: reset.user, error: false});
    }catch(err){
        console.log(err);
    }
}

module.exports.resetPassword = async function(req, res){

    try{
        if(req.body.password != req.body.confirmPassword){
            return res.status(422).json({
                message: 'Password does not match'
            });
        }
        let newUser = await User.findOneAndUpdate({_id: req.body.user}, {password: req.body.password});
        await Reset.findOneAndDelete({user: req.body.user});
        return res.status(200).json({
            message: 'password changed'
        })
    }catch(err){
        console.log(err);
    }

}

module.exports.login = function(req, res, next){
    passport.authenticate('local', function(error, user, info){
        if(error){
            return res.status(500).json(error);
        }
        if(!user){
            return res.status(401).json(info.message);
        }
        req.login(user, function(err){
            if(err){ return next(err); }
        })

        res.json(user);
    })(req, res, next);

}

module.exports.logout = function(req, res){
    req.logout();
    res.redirect('/');
}
