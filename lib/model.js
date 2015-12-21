/**
 * @module js/TreeModel
 */
"use strict";

var $ = require('jquery'),
    _ = require('underscore');


/**
 * TreeModel holds all the logic and data (non-visual). It implements Observer pattern to let the view know about changes.
 * @param element
 * @class
 */

var TreeModel = function(element){
    this.nodes = null;
    this.element = element;
};

TreeModel.prototype = {
    /**
     * Getter of "nodes"
     * @returns {null|*}
     */
    getNodes: function(){
        return this.nodes;
    },

    /**
     * Return path slash-separated: "myobject/another/another_yet/..."
     * @param elem List item clicked on
     * @returns {Object[]}
     */
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

    /**
     * Return the piece of json located on the "path" specified
     * @param path
     * @returns {Object[]}
     */
    loadSingleNode: function(path){
        var nodes = path.trim().split('/');
        var aux = _.find(this.nodes, {name: nodes[0]});

        for(var i=1; i < nodes.length; i++)
            if(aux.children)
                aux = _.find(aux.children, {name: nodes[i]});

        return aux;
    },

    /**
     * Load nodes given a "url" and triggers init event
     * @param url
     */
    loadNodes: function(url){
        $.get(url, function(data){
            this.nodes = data;
            this.element.trigger('init');
        }.bind(this));
    }
}




module.exports = TreeModel;