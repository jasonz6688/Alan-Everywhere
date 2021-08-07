// Change every imaage source to Alan
var images = document.getElementsByTagName('img');
for (image of images) {
    image.src = "https://avatars.githubusercontent.com/u/24768574?v=4";
    image.srcset = "https://avatars.githubusercontent.com/u/24768574?v=4";
}

// Get a list of common names
getNames()
  .then((namesList) => {
    const names = new Set(namesList);
    // Then change every occurence of the names to Alan
    walkText(document.body, names);
  });



// This function replaces every occurence of an string in names with Alan
function walkText(node, names) {
    if (node.nodeType == 3) {
      var words = node.data.split(" ");
      for (var i = 0; i < words.length; i++) {
        if (names && names.has(words[i])) {
          words[i] = "Alan";
        }
      }

      node.data = words.join(" ");
    } else if (node.nodeType == 1 && node.nodeName != "SCRIPT") {
      for (childNode of node.childNodes) {
        walkText(childNode, names);
      }
    }
}

// This function returns a list of names stored in the names.txt file
async function getNames() {
  const url = chrome.runtime.getURL("names.txt");
  const text = await fetch(url)
        .then((response) => response.text());
  return text.split("\n");
}