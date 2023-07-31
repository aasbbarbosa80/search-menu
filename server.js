const app = require('./config/express')();
const port = app.get('port');

function getMenuTree() {
    return [
        {
            id: 'home',
            label: 'Página Inicial',
            link: '/',
            menuSupId: null
        },
        {
            id: 'register',
            label: 'Cadastros',
            link: '/register',
            menuSupId: null
        },
        {
            id: 'people',
            label: 'Pessoa',
            link: '/register/people',
            menuSupId: 'register'
        },
        {
            id: 'car',
            label: 'Carro',
            link: '/register/car',
            menuSupId: 'register'
        },
        {
            id: 'store',
            label: 'Loja',
            link: '/register/store',
            menuSupId: 'register'
        },
        {
            id: 'internalStore',
            label: 'Loja Interna',
            link: '/register/store/internal',
            menuSupId: 'store'
        },
        {
            id: 'externalStore',
            label: 'Loja Externa',
            link: '/register/store/external',
            menuSupId: 'store'
        },
        {
            id: 'report',
            label: 'Relatórios',
            link: '/report',
            menuSupId: null
        },
    ]
}

function  searchMenu(menuId) {

    const result = [];
    const menuTree = getMenuTree();
    const stack = [menuId];

    while (stack.length > 0) {
        const currentId = stack.pop();

        const menuItem = menuTree.find((item) => item.id === currentId);
        if (menuItem) {
            result.push(menuItem);
            const submenus = menuTree.filter((item) => item.menuSupId === currentId);
            stack.push(...submenus.map((item) => item.id));
        }
    }

    return result;
}

app.get('/menu/:id', async (req, res) =>  {
    const { id } = req.params;
    const result = searchMenu(id);

    if (result.length === 0) {
        res.status(404).json({ message: 'Menu not found' });
    } else {
        res.json(result);
    }
});

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});