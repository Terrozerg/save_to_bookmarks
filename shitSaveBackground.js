//TEst db class???
//global variables not working? class instance working?
/*class TabsClass {
    constructor(tabs) {
        this.Tabs = tabs;
    }

    get getTabs() {
        console.log("getTabs: ", this.Tabs);
        return this.Tabs;
    }
}

//class instance
var tabsOpened = new TabsClass("");*/

/*function handleMessage(request) {
    console.log("transfered request: ", request);
}*/

function logDebug(data) {
    console.log("DEBUUUUUUUUUG: ", data);
    return data;
}

function onRejected(error) {
    console.log("An error: ", error);
}

//TODO different variables for different windows
//add all tabs in window
/*
browser.windows.onRemoved.addListener((windowId) => {
    
    if (tabsOpened) {
        console.log("Closed window: ", windowId);
        addBookmarks(tabsOpened);
    }
    else {
        console.log("window onRemoved executed but tabsOpened is null");
    }
});
*/

//retrive saved windows
browser.browserAction.onClicked.addListener(() => {
    console.log("icon clicked");

    let data = browser.storage.local.get();
    data.then(restoreSavedSession)
        .then(browser.storage.local.clear())
        .then(test);
});

function test() {
    console.log("Cleared storage.");
}

//get closed window
browser.sessions.onChanged.addListener(() => {
    //recieving sessions array

    //TODO bug triggers when sessions are restored for each window
    //TODO get tab data by sessions but restore it by opening a new windows/tabs

    console.log("onChanged");
    var currSession = browser.sessions.getRecentlyClosed({maxResults: 1});//only need recently closed window
    currSession.then(saveSession, onRejected);
});

//save closed window
function saveSession(data) {
    if (!data.length) {
        console.log("No sessions found.");
        return;
    }
    
    if (data[0].window) {
        console.log("window closed.", data);
        var key = data[0].window.sessionId.toString();//session id?
        setStorageValue(key, data[0].window);//what data needed to restore the window??
    }
    else {
        console.log("tab closed.", data);
    }
}

function setStorageValue(k, item) {
    console.log("key and value: ", k, item);
    browser.storage.local.set({ [k]: item });
}

async function restoreSavedSession(items) {
    if (items) {
        console.log("Restoring items:", items);
        for (item in items) {
            console.log("item...", items[item]);
            await browser.sessions.restore(items[item].sessionId);
        }
    }
}

/*
//get current tabs before any closing happens
browser.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
    //only to work when new tab opens

    if (changeInfo.favIconUrl) {
        let currentTabsOpened = browser.tabs.query({ currentWindow: true });

        //save tabs in temp class???
        currentTabsOpened.then((tabb) => {
            tabsOpened = new TabsClass(tabb);
            console.log("onUpdated in promise:", tabsOpened);
            return;
        })
        
    }
});

//main trigger
browser.tabs.onRemoved.addListener(() => {
    var currtabs = tabsOpened.getTabs;
    if (currtabs) {
        console.log("OnRemoved executing");
        console.log("current tabs: ", currtabs);
        //get onremoved tabs and comapre them
        //
        //if adding all tabs, just put saved tabs to addBookmarks
        //
        browser.tabs.query({ currentWindow: true })
            .then(compareTabs)
            .then(addBookmarks);
    }
    else {
        console.log("tabs onRemoved executed but tabsOpened is null");
    }
});

//comapre current tabs vs tabs after onRemove executed
function compareTabs(right) {
    var currtabs = tabsOpened.getTabs;
    console.log("comparing tabs... saved tabs: ", currtabs);
    console.log("tabs after onRemoved: ", right);
    var testTabs = new Array();
    currtabs.forEach(el => {
        var flag = 0;
        right.forEach(el2 => {
            if (el.title == el2.title) { flag = 1; }
        })
        if (flag == 0) {
            testTabs.push(el);
        }
    });

    console.log("filtered tabs:", testTabs);
    return testTabs;
}
*/

/*function compareTabs(right) {
    var currtabs = tabsOpened.getTabs;
    console.log("comparing tabs... saved tabs: ", currtabs);
    console.log("tabs after onRemoved: ", right);

    return currtabs.filter(d => !right.includes(d));
}*/

/*
//wraper
function addBookmarks(tabs) {
    //all bookmarks are stored in the "Other Bookmarks" folder
    var subTreeID = "unfiled_____"

    //chain start
    var bookmarksTree = browser.bookmarks.getSubTree(subTreeID);

    var start = bookmarksTree.then(recursion, onRejected);

    function recursion(bkmrks) {
        console.log("recursion");

        var chain = traverse(bkmrks);
        return (chain);
    }

    start.then(manageFolder, onRejected);

    function manageFolder(result) {
        console.log("managing traverse result: ", result);
            
        //no folder
        if (result == undefined) {
            browser.bookmarks.create({ title: "saved pages" }).then(addBookmark, onRejected);
        }
        else {
            addBookmark(result);
        }
    }

    //search for folder named "saved pages" and return its children
    function traverse(bookmarkItems) {
        console.log("START",bookmarkItems);
            for (node of bookmarkItems) {
                console.log("current node: ", node);
                if (node.title == "saved pages") {
                    console.log("existing folder node: ", node);
                    return (node);
                }
                else if (node.children) {

                    //wraping result in a promise
                    var recursivePromiseBranch = Promise.resolve().then(
                        function () {
                            console.log("traversing to next child")
                            return (traverse(node.children));
                        }
                    );
                    return (recursivePromiseBranch);
                }
        }
    }

    async function addBookmark(folder) {
        console.log("Listing Tabs: ", tabs);

        //comparing tabs in searched folder with tabs currently open
        async function compare() {        
            //adding tabs
            tabs.forEach(async (tab) => {
                //adding tab value to promise on result func
                var advancedCheck = check.bind(null, tab);
                var foundTab = browser.bookmarks.search({ title: tab.title });
         
                foundTab.then(advancedCheck, onRejected);
            });
        }

        //checking of one single tab
        async function check(data, item) {
            console.log("checking tabs... ");
            if (!item.length && data.title != 'New Tab') {
                console.log("adding tab title: ", data.title);
                browser.bookmarks.create({ parentId: folder.id, title: data.title, url: data.url });
            }
            else if (item) {
                console.log("tab already exists: ", item);
            }
        }

        //TODO
        //set 2 listeners: one for tab closing and another for window closing

        //execute comparasion
        compare();
    }
}
*/
//browser.runtime.onMessage.addListener(handleMessage);