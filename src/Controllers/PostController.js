import Post from '../Models/Post.js'
import PostService from '../Services/PostService.js'
import 'dotenv/config';
import jwt from 'jsonwebtoken';

class PostController{
    async createPost(req, res)
    {
        try{
            const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY);
            const post = await Post.create({title: req.body.title, content: req.body.content, author: decoded._id});

            return res.status(201).json(post)
        } catch(e){
            res.status(500).json(e.message)
        }
    }

    async getPostsByAuthorId(req, res) 
    {
        try{
            if(!req.params.userId){
                throw new Error('Id empty!')
            }

            const posts = await Post.find({ author: req.params.userId});

            return res.json(posts)
        }
        catch(e){
            res.status(500).json(e)
        }
    }

    
    async getPost(req, res) 
    {
        try{
            if(!req.params.id){
                throw new Error('Id empty!')
            }

            const post = await Post.findById(req.params.id);

            return res.json(post)
        }
        catch(e){
            res.status(500).json(e)
        }
    }

    async getPosts(req, res){
        try{
            return res.json(PostService.getAll())
        }
        catch(e){
            res.status(500).json(e)
        }
    }

    async updatePost(req, res){
        try{
            return res.json(PostService.update(req.params.id, req.body))
        }
        catch(e){
            res.status(500).json(e)
        }
    }

    async deletePost(req, res){
        try{
            return res.json(PostService.delete(req.params.id))
        }
        catch(e){
            res.status(500).json(e)
        }
    }
}

export default new PostController();