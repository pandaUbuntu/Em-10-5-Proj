import User from '../Models/User.js';
import Role from '../Models/Role.js';
import { validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';
import JwtCreator from '../Services/JwtCreator.js';


class AuthController{
    async registration(req, res)
    {
        try{
            const errors = validationResult(req);

            if(!errors.isEmpty())
                throw new Error('Помилка валідації!');

            const {name, email, password} = req.body;
            const user = await User.findOne({'email': email});
            console.log(user);
            if (user)
                throw new Error('Цей імейл вже зареєстрований!');

            const passwordHash = bcryptjs.hashSync(password, 10);
            const role = await Role.findOne({'name': 'USER'});

            if(!role)
                throw new Error('Помилка в БД!');
            
            const newUser = await User.create({name: name, email: email, password: passwordHash, roles: [role.name]});

            const token = JwtCreator.createToken({_id: newUser._id, email: newUser.email, roles: newUser.roles});

            await User.findByIdAndUpdate(newUser._id, {token: token});

            return res.status(201).json({
                'token': token,
                'message': 'Ви успішно зареєстровані!'
            });

        } catch(e){
            console.log(e);
            return res.status(500).json("Error reg " + e.message)
        }
    }
    
    async login(req, res) 
    {
        try{
            const { email, password } = req.body;
            const user = await User.findOne({email});

            if(!user)
                throw new Error('Такого користувача не існує'); 

            const passwordValid = bcryptjs.compareSync(password, user.password);

            if (!passwordValid)
                throw new Error('Пароль невірний');

            const newToken = JwtCreator.createToken({_id: user._id, email: user.email, roles: user.roles});

            await User.findByIdAndUpdate(user._id, {token: newToken});

            return res.status(200).json({
                'token': newToken,
                'message': 'Ви успішно залогінені!',
                'data': user
            });

        }
        catch(e){
            return res.status(500).json("Error login " + e.message)
        }
    }
}

export default new AuthController();