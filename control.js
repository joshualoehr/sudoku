$(document).ready(function() {
    for (var r = 1; r <= 9; r++) {
        for (var c = 1; c <= 9; c++) {
            addSelectionEvent(r, c);
        }
    }

    $(document).bind('keypress', function(event) {
        var numPressed = event.keyCode - 48;
        if (numPressed >= 0 && numPressed <= 9) {
            var selected = $("td#selected");
            if (selected.length) {
                selected.text(numPressed === 0 ? "" : numPressed);
                unselect();
            }
        }
    });
});

var addSelectionEvent = function(r, c) {
    var cell = $("td.row" + r + ".col" + c);
    cell.click(function(event){
        unselect();
        cell.attr({id: "selected"});
    });
};

var unselect = function() {
    var selected = $("td#selected");
    if (selected.length) {
        selected.attr({id: ""});
    }
};
