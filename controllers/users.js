const { buildCheckFunction, body, validationResult } = require('express-validator')
const checkBodyAndQuery = buildCheckFunction(['body', 'query']);
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users')
var express = require('express');
var router = express.Router();
const csrf = require('csurf')
const csrfProtection = csrf()
router.use(csrfProtection)



exports.getregistration = (req, res)=>{
	const messages = req.flash('error')
	res.render('user/signup', {csrfToken: req.csrfToken()})
}


exports.postregistration = async (req, res)=>{
	const messages = req.flash('error')
	//Get values from form
	const username = req.body.username
	const email = req.body.email
	const password = req.body.password
	const password2 = req.body.password2

	errors = validationResult(req)
	if(!errors.isEmpty()){
		mess = errors.errors
		
		res.render('user/signup', {
			errors: errors,
			username: username,
			email: email,
			username: username,
			password: password,
			password2: password2,
			csrfToken: req.csrfToken(),
			messages: messages,
			mess : mess
		})
	}else{
		try{
			const newUser = new User()

			newUser.username = req.body.username
			newUser.email = req.body.email
			newUser.password = req.body.password

			await User.createUser(newUser, (err, docs)=>{
				if(err){
					throw err
				}else{
					console.log(newUser)
				}
			})
		}catch(err){
			console.log(err)
		}
	

		//success redirect	
		req.flash('info', 'User created successfully')
		// const messages = req.flash('message', 'Success!!')
		res.redirect('/users/login')
	}
}

exports.getlogin = (req, res)=>{

	const messages = req.flash('info')
	const errorMessages = req.flash('error')
	const logoutMessage = req.flash('info')
	console.log(errorMessages, 'xxxxxxxxxxxxxx')
	res.render('user/login', {csrfToken: req.csrfToken(), 
		messages: messages, 
		errorMessages: errorMessages,
		logoutMessage: logoutMessage
	})
}


exports.getLogout = (req, res)=>{
	req.logout()
	req.flash('info', 'You are logged out')
	res.redirect('/users/login')
}


exports.getProfile = (req, res)=>{
	res.render('user/profile')
}