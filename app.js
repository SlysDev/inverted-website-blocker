console.log("Exstention loaded");

const blockwall = document.createElement("div");
blockwall.style.top = "0px";
blockwall.style.bottom = "0px";
blockwall.style.left = "0px";
blockwall.style.right = "0px";
blockwall.style.position = "absolute";
blockwall.style.backgroundColor = "red";
blockwall.style.border = "solid 10px black";
blockwall.style.zIndex = "10";
document.querySelector("html").appendChild(blockwall);
