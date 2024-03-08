const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { name: params.name } })) {
        throw 'Name "' + params.name + '" is already registered';
    }

    const product = new db.User(params);

    // save user
    await product.save();
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const nameChanged = params.name && user.name !== params.name;
    if (nameChanged && await db.User.findOne({ where: {name: params.name } })) {
        throw 'Name "' + params.name + '" is already taken';
    }

    // copy params to user and save
    Object.assign(product, params);
    await product.save();
}

async function _delete(id) {
    const product = await getProducts(id);
    await product.destroy();
}

// helper functions

async function getProducts(id) {
    const product =  await db.User.findByPk(id);
    if (!product) throw 'Product not found';
    return products;
}