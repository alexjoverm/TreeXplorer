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
    this.dirElement = '<li class="tree-dir"><i class="tree-sprite tree-folder"></i> <span class="title">%s</span> </li>';
    this.fileElement = '<li class="tree-filetype"><i class="tree-sprite tree-file"></i> <span class="title">%s</span> </li>';

    this.element.on('init', this.initTree.bind(this));
};

TreeView.prototype = {

    insertNodes: function(nodes, container){

        var list = this.baseElement.clone();

        for(var i=0; i< nodes.length; i++){
            if(nodes[i].children) { // is directory
                var elem = $(sprintf(this.dirElement, nodes[i].name));
                elem.children('.tree-folder').on('click', this.openCloseFolder.bind(this));
            }
            else{ // is a file
                var elem = $(sprintf(this.fileElement, nodes[i].name));
            }

            list.append(elem);
        }
        container.append(list);
    },

    initTree: function(){
        var nodes = this.model.getNodes();
        this.insertNodes(nodes, this.element);
    },

    openCloseFolder: function(ev){
        ev.stopPropagation();
        var elem = $(ev.target);
        var elem = elem.closest('li.tree-dir'); // Get closest li parent
        console.log(elem.closest('li.tree-dir'))

        elem.toggleClass('open');
        if(elem.children('.tree-folder').length > 0){
            elem.children('.tree-folder').removeClass('tree-folder').addClass('tree-folder-open');
            var path = this.model.getPath(elem);
            console.log(path)
            var node = this.model.loadSingleNode.call(this.model, path);
            if(node && node.children)
                this.insertNodes(node.children, elem);
        }
        else{
            elem.children('ul').remove();
            elem.children('.tree-folder-open').removeClass('tree-folder-open').addClass('tree-folder');
        }

    }


};

module.exports = TreeView;