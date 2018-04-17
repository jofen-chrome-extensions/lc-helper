// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var match_rules = {
  conditions: [
    //leetcode
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostContains: 'leetcode.com', pathContains: '/problems/' },
    }),
    //lintcode
    new chrome.declarativeContent.PageStateMatcher({
       pageUrl: { hostContains: 'lintcode.com', pathContains: '/problem/' },
    })
    ],
    actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

chrome.runtime.onInstalled.addListener(function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([match_rules]);
    });
});