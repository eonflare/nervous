/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
function DefinitionService() {};

DefinitionService.prototype.definitions = {
    "gangs": "Group of suspicious members of the community ",
    "loitering": "Aimlessly hanging around private property"
};

DefinitionService.prototype.search = function(term) {
    var results = [];
    if (!term.length) return;
    for (definition in this.definitions) {
        if (definition.match(new RegExp(term, 'i'))) {
            results.push([definition, this.definitions[definition]])
        }
    }
    return results;
}

$(function() {
    // Store the div with id searchResults
    var $searchResults = $("#searchResults");
    $("#search-tips").submit(function (eventData) {
        eventData.preventDefault();
        $searchResults.empty();
        var searchTerm = $("#search-tips > input").val();
        var results = new DefinitionService().search(searchTerm);
        for (var result_index in results) {
            var result = results[result_index];
            var $result = $("<div class=\"search-term-result\"><b>"
                + result[0] + "</b>: " + result[1] + "</div>");
            $searchResults.append($result);
        }
        return false;
    });
    $("#search-tips > input").blur(function() {
        $searchResults.empty();
    });
    $('.media-body').click(function() {
        $(this).toggleClass('open');
    });
});

