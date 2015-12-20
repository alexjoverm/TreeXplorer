/**
 * Created by alejandrojovermorales on 20/12/15.
 */
"use strict";

var $ = require('jquery'),
    _ = require('underscore');


/**
 * TreeModel
 * @desc TreeModel is in charge of the logic behind the Tree. It will let the View know about changes.
 * @constructor
 */

var TreeModel = function(element){
    this.nodes = null;
    this.element = element;
};

TreeModel.prototype = {
    getNodes: function(){
        return this.nodes;
    },
    getPath: function(elem){
        var path = elem.text();
        var elem = elem.parent();

        while(!elem.hasClass('tree-view')){
            path = elem.text() + '/' + path;
            elem = elem.parent();
        }

        return path;
    },
    loadSingleNode: function(nodeStr){
        var nodes = nodeStr.trim().split('/');
        var aux;
        for(var i=0; i < nodes.length; i++)
            aux = _.find(this.nodes, {name: nodes[i]});
    },

    loadNodes: function(){
        $.get('js/randomFiles.json', function(data){
            this.nodes = data;
            this.element.trigger('init');
        }.bind(this));
    },
}




module.exports = TreeModel;