//counts the words in the tab and displays the count.
function countWords() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs && tabs[0]) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: function () {
                    return document.body.innerText.split(/\s+/).filter(Boolean).length;
                },
            },
            function (result) {
                if (chrome.runtime.lastError) {
                    // Handle the error
                    console.error(chrome.runtime.lastError);
                    return;
                }
                
                const wordCount = result[0].result;
                document.getElementById('wordCount').textContent = wordCount;
            });
        } else {
            // Handle the case where there are no active tabs
            console.error("No active tabs found.");
        }
    });
}

document.addEventListener('DOMContentLoaded', countWords);
