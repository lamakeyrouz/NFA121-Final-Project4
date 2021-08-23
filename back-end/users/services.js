const User = require("./models");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");

require("dotenv/config");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.sendGridTransportAPIKey,
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
    return user;
  } catch (err) {
    throw Error("Could not add User");
  }
};

exports.sendWelcomeMail = async (body) => {
  return transporter.sendMail({
    to: body.email,
    from: process.env.transporterEmail,
    subject: "Signup succeeded!",
    html: `<p>Welcome ${body.name}, please click on the following link to complete your registration <br> ${body.registrationLink}</p>`,
  });
};

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
