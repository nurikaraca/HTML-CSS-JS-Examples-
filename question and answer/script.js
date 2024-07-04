// script.js
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    var dropTarget = event.target;

    if (dropTarget.tagName === "SPAN" && dropTarget.parentElement.className === "right") {
        // Doğru cevabı kontrol et
        if ((data === "q1" && dropTarget.id === "a1") || 
            (data === "q2" && dropTarget.id === "a2") || 
            (data === "q3" && dropTarget.id === "a3")) {
            dropTarget.style.backgroundColor = "green";
            showArrow(draggedElement, dropTarget);
        } else {
            dropTarget.style.backgroundColor = "red";
        }
    }
}

function showArrow(draggedElement, dropTarget) {
    var arrow = document.createElement("div");
    arrow.className = "arrow";
    arrow.innerHTML = "<span></span>";
    
    document.body.appendChild(arrow);

    var rect1 = draggedElement.getBoundingClientRect();
    var rect2 = dropTarget.getBoundingClientRect();

    arrow.style.left = rect1.right + "px";
    arrow.style.top = rect1.top + (rect1.height / 2) + "px";
    arrow.style.width = (rect2.left - rect1.right) + "px";

    arrow.style.display = "flex";
}

// Drag and drop olaylarını başlat
document.querySelectorAll(".left span").forEach(item => {
    item.setAttribute("draggable", "true");
    item.addEventListener("dragstart", drag);
});

document.querySelectorAll(".right span").forEach(item => {
    item.addEventListener("drop", drop);
    item.addEventListener("dragover", allowDrop);
});
