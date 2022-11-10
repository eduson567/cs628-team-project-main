const constants = require('./constants');
const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require('mongodb');
const { UserInputError } = require('apollo-server-express');


async function login(db, login_name, password) {

    let result = await db.collection(constants.dbName).findOne({ login_name: login_name, password: password });

    console.log('query', login_name, password, result);
    if (result)
        return result.login_id;
    else
        return "";
}

async function register(db, login_name, password, student_name, date_of_birth, major) {

    let queryRes = await db.collection(constants.dbName).findOne({ login_name: login_name });

    if (queryRes) {
        throw new UserInputError('User already exists', { errors: ["User name is already taken."] });
    }

    let student_login = {
        login_id: uuidv4(),
        login_name,
        password,
        student_name,
        date_of_birth,
        major
    }
    let result = await db.collection(constants.dbName).insertOne(student_login);
    let item = await db.collection(constants.dbName).findOne({ _id: result.insertedId });
    return item.login_id;
}

async function student_profile(db, login_id) {
    console.log('login_id', login_id);
    let queryRes = await db.collection(constants.dbName).findOne({ login_id: login_id });
    console.log(queryRes);
    return queryRes;
}

async function update_details(db, login_id, first_name, last_name, data_of_birth, email, major) {
    let res = await db.collection(constants.dbName).findOne({ login_id: login_id });
    if (res) {
        let updates = { ...res, first_name: first_name, last_name: last_name, data_of_birth: data_of_birth, email: email, major: major };
        console.log('all_updates', updates);
        delete (updates['_id'])
        delete (updates['password'])
        updates['student_name'] = updates['login_name'];
        console.log('after_updates', updates);

        await db.collection(constants.dbName).updateOne({ login_id: login_id }, { $set: updates });
        return true;
    }
    return false;
}

async function search(db, name) {
    console.log('search_name', name);
    var search_str = '.*' + name + '.*'
    let res = await db.collection(constants.dbName).find(
        {
            $or: [
                { login_name: { '$regex': search_str } },
                { first_name: { '$regex': search_str } },
                { last_name: { '$regex': search_str } },
                { email: { '$regex': search_str } }
            ]
        }).toArray();
    console.log('search_res', res);
    if (res) {
        var lst = res.map(x => { return { login_id: x.login_id, login_name: x.login_name } });
        console.log('search_array', lst)
        return lst;
    }
    return []
}

module.exports = { login, register, student_profile, update_details, search };
