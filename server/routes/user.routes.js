import express from 'express';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/users').get(userCtrl.read).post(userCtrl.post);

router
  .route('/api/users/:userId')
  .get(authCtrl.requireSignIn, userCtrl.read)
  .put(authCtrl.requireSignIn, authCtrl.hasAuthorization, userCtrl.updated)
  .delete(authCtrl.requireSignIn, authCtrl.hasAuthorization, userCtrl.remove);

router.param('userId', userCtrl.userId);

export default router;
