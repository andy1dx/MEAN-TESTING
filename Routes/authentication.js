//importing models 
const User = require('../Models/users');


module.exports = (router) =>{
	//adding register
	router.post('/register', (req , res) => {
		// req.body.email;
		// req.body.username;
		// req.body.password;
		if(!req.body.email){
			res.json({ success: false, message: 'You must providde email'});
		}else{
			if(!req.body.username){
				res.json({ success: false, message: 'You must providde username'});
			}else{
				if(!req.body.password){
					res.json({ success: false, message: 'You must providde password'});
				}else{
					//set new data from modal for adding
					let newUser = new User({
						email :  req.body.email.toLowerCase(),
						username :  req.body.username.toLowerCase(),
						password :  req.body.password
					});
					//console.log(newUser);
					newUser.save((err) => {
						if(err){
							if(err.code === 11000){
								res.json({ success: false, message: 'Username Or Password Duplicate' });
							}else{
				                // Check if error is a validation rror
				                if (err.errors) {
				                  // Check if validation error is in the email field
				                  if (err.errors.email) {
				                    res.json({ success: false, message: err.errors.email.message }); // Return error
				                  } else {
				                    // Check if validation error is in the username field
				                    if (err.errors.username) {
				                      res.json({ success: false, message: err.errors.username.message }); // Return error
				                    } else {
				                      // Check if validation error is in the password field
				                      if (err.errors.password) {
				                        res.json({ success: false, message: err.errors.password.message }); // Return error
				                      } else {
				                        res.json({ success: false, message: err }); // Return any other error not already covered
				                      }
				                    }
				                  }
				                } else {
				                  res.json({ success: false, message: 'Could not save user. Error: ', err }); // Return error if not related to validation
				                }							}
						}else{
							res.json({ success: true, message: 'This record added'  });
						}
					});
				}
			}
		}
	});

	//checking email duplicate router
	router.get('/checkemail/:email', (req, res) => {
		if(!req.params.email) {
			res.json({ success: false, message: 'E-mail was not provided' });
		}else{
			User.findOne({ email: req.params.email } , (err, user) => {
				if(err) {
					res.json({ success:false, message: err });
				}else{
					if(user) {
						res.json({ success:false, message:'E-mail is already taken'});
					}else{
						res.json({ success:true, message:'E-mail is available'});
					}
				}
			})

		}
	});


	//checking username duplicate router
	router.get('/checkusername/:username', (req, res) => {
		if(!req.params.username) {
			res.json({ success: false, message: 'Username was not provided' });
		}else{
			User.findOne({ username: req.params.username } , (err, user) => {
				if(err) {
					res.json({ success:false, message: err });
				}else{
					if(user) {
						res.json({ success:false, message:'Username is already taken'});
					}else{
						res.json({ success:true, message:'Username is available'});
					}
				}
			})

		}
	});
	return router;
};