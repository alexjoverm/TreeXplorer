/**
 *  TreeXplorer
 *
 *  TreeXplorer is a File Explorer made using Observer, MVC and CommonJS patterns. It uses jQuery as
 *  a third-party library to help with DOM manipulation.
 *
 *  To work with, it uses a json structure as a directory structure (see randomFiles.js). It is supposed to be the actual
 *  readed directory structure.
 *
 *  @author Alex Jover Morales (alexjovermorales@gmail.com)
 */

"use strict";

// Vendor modules
var $ = require('jquery');

// Custom modules
var TreeModel = require('./../lib/model'),
    TreeView  = require('./../lib/view');



$(function(){

    // Create two trees
    var tree1 = {}, tree2 = {};

    tree1.model = new TreeModel($('#tree1'));
    tree1.view  = new TreeView(tree1.model);

    tree2.model = new TreeModel($('#tree2'));
    tree2.view  = new TreeView(tree2.model);


    // Load json on them
    tree1.model.loadNodes('js/randomFiles.json');
    tree2.model.loadNodes('js/randomFiles2.json');

});
