import Router from 'express';
import PostController  from '../Controllers/PostController.js'
import AuthMiddlewareHelper from '../Services/AuthMiddlewareHelper.js';


const postRouter = new Router();

postRouter.post('/post', [AuthMiddlewareHelper.roleCheck("USER"), AuthMiddlewareHelper.authCheck], PostController.createPost); //Create
postRouter.get('/posts', PostController.getPosts); //Read
postRouter.get('/posts/:userId', PostController.getPostsByAuthorId);
postRouter.get('/post/:id', PostController.getPost); //Read
postRouter.put('/post/:id', PostController.updatePost); //Update
postRouter.delete('/post/:id', AuthMiddlewareHelper.roleCheck("ADMIN"),  PostController.deletePost); //Delete

export default postRouter;