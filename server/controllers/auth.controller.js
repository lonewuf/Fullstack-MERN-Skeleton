import User from '../../models/user.model';
import jwt from 'jsonwebtoken';
import expressJWT from 'express-jwt';
import config from '../../config/config';

const signin = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({
        error: `Email and password don't match`,
      });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    res.cookie('t', token, { expire: new Date() + 9999 });

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(401).json({
      error: 'Could not signin.',
    });
  }
};

const signout = (req, res, next) => {
  res.clearCookie('t');
  res.status(200).json({
    message: 'Signed out',
  });
};

const requireSignIn = expressJWT({
  secret: config.secret,
  userProperty: 'auth',
});

const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: 'User is not authorized.',
    });
  }
  next();
};

export default {
  signin,
  signout,
  requireSignIn,
  hasAuthorization,
};
