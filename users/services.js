const User = require("./models");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);
exports.signup = async (body) => {
  try {
    const user = new User({
      email: body.email,
      password: body.password,
      name: body.name,
      registrationDate: new Date(),
    });
    await user.save();
  } catch (err) {
    throw Error("Could not add User");
  }
};

exports.sendWelcomeMail = async (body) => {
  return transporter.sendMail({
    to: body.email,
    from: "sendmailstesteurisko@gmail.com",
    subject: "Signup succeeded!",
    html: `<p>Welcome ${body.name}</p>`,
  });
};

exports.login = async (body) => {};

exports.findUserWithEmail = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });
    if (user) {
      throw Error("Email already taken.");
    }
  } catch (err) {
    throw err;
  }
};

exports.findUserWithoutEmail = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      throw Error("No user with this email found.");
    }
  } catch (err) {
    throw err;
  }
};

exports.confirmPassword = async (body) => {
  try {
    const user = await User.findOne({
      email: body.email,
      password: body.password,
    });
    if (!user) {
      throw new Error("Wrong password.");
    }
    return user;
  } catch (err) {
    throw err;
  }
};
