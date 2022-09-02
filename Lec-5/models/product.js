const databaseUtil = require('../utl/database');

exports.Product = class Product{
    constructor() {
        this._id = '';
        this.name = '';
        this.price = 0;
    }

    fetchAll() {
        const db = databaseUtil.getDb();
        return db.collection('product').find();
    }

    save() {
        const db = databaseUtil.getDb();
        return db.collection('product').insertOne(this);
    }
}