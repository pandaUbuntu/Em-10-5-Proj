import 'dotenv/config';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

class AuthMiddlewareHelper{
    async authCheck(req, res, next){
        try {
            const token = req.headers.authorization.split(' ')[1];

            if(!token)
                throw new Error("Токен відсутній!");

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            const user = await User.findOne({_id: decoded._id})

            if(!user)
                throw new Error("Такого юзера не існує!");

            if(user.token !== token)
                throw new Error("Токен не відповідає дійсності!");

            next();

        } catch(err) {
            return res.status(400).json(err.message);
        } 
    }

    roleCheck(role)
    {
        return function(req, res, next){
            try{
                const token = req.headers.authorization.split(' ')[1];

                const {roles: userRoles} = jwt.verify(token, process.env.JWT_SECRET_KEY);

                if (!userRoles.includes(role)){
                    throw new Error('До цієї функції у вас немає доступу!');
                }

                next();
            }
            catch(e){
                return res.status(400).json(e.message);
            }
        }
    }
}

export default new AuthMiddlewareHelper();