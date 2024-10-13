//src/middleware/checkRequiredFields.js
import emptyFieldsError from '../error/emptyFieldsError.js';

const checkRequiredFields = requiredFields => {
    return function (req, res, next) {
        const emptyFields = requiredFields.filter(
            field => !Object.keys(req.body).includes(field)
        );

        if (emptyFields.length > 0) {
            throw new emptyFieldsError("emptyFields");
        }

        next();
    };
};

export default checkRequiredFields;