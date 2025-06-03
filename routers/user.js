const express = require('express');
// 라우터 객체생성
const router = express.Router();
// 사용자 요청 컨트롤러
const userController = require('../controllers/userController');

const {validateSignUp} = require('../middleware/ValidateUser');

router.post('/signup',validateSignUp,userController.signUp);
router.get('/',userController.getAllUsers);
router.get('/:id',userController.getUserById);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);

module.exports = router;