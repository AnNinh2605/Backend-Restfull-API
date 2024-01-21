const { json } = require('express');
const connection = require('../config/database')
const { get_all_users, getUserByID, updateUserByID, deleteUserById } = require('../services/CRUD_services')

const User = require('../models/users');

const homeController = async(req, res) => {
    let results = await User.find({});
    return res.render('homePage.ejs', {rows: results});
}
const abc = (req, res) => {
    res.send('ABC')
}
const staticfile = (req, res) => {
    res.render('view1.ejs')
}
const create = (req, res) => {
    res.render('createUsers.ejs')
}
const create_user = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;

    await User.create({
        email: email,
        name: name,
        city: city
    })
    res.redirect('/');

}

const update_user = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userID = req.body.id;
    await User.updateOne({_id: userID}, { email: email, name: name, city: city })

    res.redirect('/');
}

const edit_user = async(req, res) => {
    let getUserID = req.params.id;
    let result = await User.findById(getUserID).exec();
    res.render('editUsers.ejs', {user : result});
}

const delete_user = async(req, res) => {
    let getUserID = req.params.id;
    let result = await User.findById(getUserID).exec();
    res.render('deleteUser.ejs', {user : result})
}
const confirm_delete_user = async(req, res) => {
    let getUserByID = req.body.id;
    await User.deleteOne({_id: getUserByID});
    res.redirect('/');
}
module.exports = {
    homeController,
    abc,
    staticfile,
    create_user,
    create, 
    edit_user,
    update_user,
    delete_user, 
    confirm_delete_user
}
