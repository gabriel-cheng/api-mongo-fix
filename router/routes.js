const router = require('express').Router();
const User = require('../models/index');

router.delete('/:id', async(req, res) => {
    const id = req.params.id;

    const user = await User.findOne({_id:id});

    if(!user) {
        res.status(404).json({message: 'O usuário não foi encontrado.'});
    } else {
        try {
            await User.deleteOne({_id:id});

            res.status(200).json({message: 'O usuário foi deletado com sucesso!'});
        } catch(err) {
            res.status(400).json({message: `Usuário não deletado: ${err}`});
        }
    }
});
router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const { name, cel, idade } = req.body;

    const user = {
        name,
        cel,
        idade
    };

    try {
        const updateUser = await User.updateOne({_id:id}, user);

        if(updateUser.matchedCount == 0) {
            res.status(404).json({message: 'O usuário não foi encontrado.'});
        } else {
            res.status(201).json({message: 'Usuário atualizado com sucesso!'});
        }

    } catch(err) {
        res.status(400).json({'Usuário não criado': err});
    }
});
router.post('/', async(req, res) => {
    const { name, cel, idade } = req.body;

    const user = {
        name,
        cel,
        idade
    };

    try {
        if(!user.name || !user.cel || !user.idade) {
            res.status(400).json({message: 'Algum dos campos não foram preenchidos, verifique e tente novamente.'});
        } else {
            await User.create(user);

            res.status(201).json({message: 'Usuário criado com sucesso!'});
        }
    } catch(err) {
        res.status(500).json({message: `Não foi possível criar o usuário. Erro: ${err}`});
    }
});
router.get('/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({
            _id:id
        });

        if(!user) {
            res.status(400).json({message: 'Usuário não encontrado.'});
        } else {
            res.status(200).json(user);
        }
    } catch(err) {
        console.log({findByIdErr: err});
    }
});
router.get('/', (req, res) => {
    User.find()
        .then(e => res.status(200).json(e))
        .catch(err => console.log({findItemsErr: err}));
});

module.exports = router;
