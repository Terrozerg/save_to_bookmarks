window.addEventListener("beforeunload", function (e) {  
    browser.runtime.sendMessage("hello");
});

/*
window.addEventListener("visibilitychange", function (e) {
    console.log(e.type);
    browser.runtime.sendMessage("hello");
});*/