const { body, validationResult } = require('express-validator');
const { PW_REGEX } = require('../constants/regex');

exports.validateSignUp = [
    body('email').isEmail().withMessage('유효한 이메일 입력'),
    body('password').matches(PW_REGEX).withMessage('비밀번호 형식이 올바르지 않음'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];