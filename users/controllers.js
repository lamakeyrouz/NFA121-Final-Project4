const UserService = require("./services");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res, next) => {
  try {
    await UserService.signup(req.body);
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.tokencode,
      { expiresIn: "1h" }
    );
    res.send({ token: token, userId: user._id.toString(), email: user.email });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

exports.signupEmail = async (req, res, next) =>{
  try{
    await UserService.findUserWithEmail(req.body);
    UserService.sendWelcomeMail(req.body);
    res.end()
  }catch(err){
    res.status(500).send({ success: false, message: err.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    await UserService.findUserWithoutEmail(req.body);
    const user = await UserService.confirmPassword(req.body);
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.tokencode,
      { expiresIn: "1h" }
    );
    res.send({success: true, token: token, userId: user._id.toString(), email: user.email });
  } catch (err) {
    return res.send({ success: false, message: err.message });
  }
};


