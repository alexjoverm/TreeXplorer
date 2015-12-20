/**
 * Created by alejandrojovermorales on 28/03/15.
 */

"use strict";

// Vendor modules
var $ = require('jquery'),
    sprintf = require('sprintf-js').sprintf;

// Custom modules
var TreeModel = require('./model'),
    TreeView  = require('./view');




// Main app
$(function(){

    var treeModel = new TreeModel($('#tree'));
    var treeView = new TreeView(treeModel);

    treeModel.loadNodes();

});
