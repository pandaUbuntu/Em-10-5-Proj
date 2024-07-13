import Router from 'express';

const commentRouter = new Router();

commentRouter.post('/comment'); //Create
commentRouter.get('/comments', (req, res) => {
    res.send('Повернулись всі коменти')
  }); //Read
commentRouter.get('/comment/:id', (req, res) => {
    res.send('Повернувся комент з id: ' + req.params.id)
  }); //Read
commentRouter.delete('/comment/:id', (req, res) => {
    res.send('Видалили комент з id: ' + req.params.id)
  }); //Delete
//router.put(''); //Update
 
commentRouter.get('/comments/count', (req, res) => {
    res.send('Кількість коментів')
  });

export default commentRouter;