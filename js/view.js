/**
 * Created by alejandrojovermorales on 20/12/15.
 */

var $ = require('jquery')
    sprintf = require('sprintf-js').sprintf;

var TreeModel = require('./model');


var TreeView = function(model){
    this.model = model;
    this.element = model.element;
    this.baseElement = $('<ul class="tree-view"></ul>');
    this.dirElement = '<li class="tree-dir"><i class="tree-sprite tree-folder"></i> %s </li>';
    this.fileElement = '<li class="tree-file"><i class="tree-sprite tree-file"></i> %s </li>';

    this.element.on('init', this.initTree.bind(this));
};

TreeView.prototype = {

    initTree: function(){

        var nodes = this.model.getNodes();
        for(var i=0; i< nodes.length; i++){
            if(nodes[i].children) { // is directory
                var elem = $(sprintf(this.dirElement, nodes[i].name));
                elem.on('click', this.openFolder.bind(this));
            }
            else{ // is a file
                var elem = $(sprintf(this.fileElement, nodes[i].name));
            }

            this.baseElement.append(elem);
        }
        this.element.append(this.baseElement);
    },

    openFolder: function(ev){
        var path = this.model.getPath($(ev.currentTarget));
        this.model.loadSingleNode.call(this.model, path);
    }
};

module.exports = TreeView;