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
        var path = elem.children('.title').text();
        var elem = elem.parent();

        while(!elem.is(this.element)){
            if(elem.is('li.tree-dir')){
                path = elem.children('.title').text() + '/' + path;
            }
            elem = elem.parent();
        }

        return path;
    },
    loadSingleNode: function(nodeStr){
        var nodes = nodeStr.trim().split('/');
        var aux = _.find(this.nodes, {name: nodes[0]});

        console.log(aux)
        console.log(nodes)
        for(var i=1; i < nodes.length; i++)
            if(aux.children)
                aux = _.find(aux.children, {name: nodes[i]});

        return aux;
    },

    loadNodes: function(){
        $.get('js/randomFiles.json', function(data){
            this.nodes = data;
            this.element.trigger('init');
        }.bind(this));
    },
}




module.exports = TreeModel;