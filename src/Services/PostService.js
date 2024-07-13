import Post from '../Models/Post.js'

class PostService{
    async delete(id) {
        if(!id){
            throw new Error('Id empty!');
        }

        const post = await Post.findByIdAndDelete(req.params.id);

        if(!post){
            throw new Error('Post empty!');
        }

        return post;
    }

    async update(id, data){
        if(!id){
            throw new Error('Id empty!');
        }

        const post = await Post.findByIdAndUpdate(id, data);

        return post;
    }

    async getAll(){
        return await Post.find();
    }
}

export default new PostService();