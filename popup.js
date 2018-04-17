// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function getCurrentTab(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    callback(tab);
  });
}


function searchSolution() {
  $('.btn').hide();
  getCurrentTab((tab) => {
    var url = tab.url;
    var regx = /problems?\/(.*?)\//i;
    var result = url.match(regx);
    if (result) {
      var problemName = result[1];
      $('#search-result').text('Looking for a solution for '+problemName+'...');
      $.ajax({
        type: 'GET',
        url: 'http://www.jiuzhang.com/api/solution/get_solution/?unique_name=' + problemName,
        success: function(data) {
          if(data.url) {
            $('#search-result').text('Found a solution for '+problemName);
            $('#btn-go').attr('href', data.url).show();
            $('#btn-go').after('<a>\t or</a>');
            //$('#btn-link').text('Or');
            $('#btn-search').attr('href', 'https://google.com/search?q=leetcode solution ' + problemName)
            .text('Search for other Solutions').show();
          
          } else {
            $('#search-result').text('Could not find a solution!');
            $('#btn-search').attr('href', 'https://google.com/search?q=leetcode solution ' + problemName).show();
          }
        },
        error: function() {
          $('#search-result').text('Could not find a solution!');
          $('#btn-search').attr('href', 'https://google.com/search?q=leetcode solution ' + problemName).show();
          //$('#search-result').text('Could not search, check your network please!');
        }
      })
    }
  });
}

searchSolution();

// document.getElementById('btn-search').onclick = function() {
//   console.log("btn-search");
//   googleSearch(searchText, curTab);
//   window.close();
// }

