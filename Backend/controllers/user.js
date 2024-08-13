import User from './../model/User.js'

const postSignup = async (req, res)=>{
    const {name, email, password, dob} = req.body;
    const user = new User({
        name, 
        email, 
        password,
        dob: new Date(dob)
    });

    try{                                       //try to save th api and if their is in error so send it to the catch block which displays the exact error message.
    const saveUser = await user.save()

    res.json({
        success: true,
        message: 'User created successfully',
        data: saveUser
    })
    }
    catch(e){
        res.json({
            success: false,
            message: e.message,
            data: null
        })
    }

}
const postLogin =async (req, res)=>{try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "Login successful", data: user });
} catch (err) {
    res.json({ success: false, message: "Failed to login", error: err.message });
}
}

export {postSignup, postLogin}