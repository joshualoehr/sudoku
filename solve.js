var solve = function() {
    var sudoku = readSudoku();
    var status = $("p#solutionStatus");
    if (solveSudoku(sudoku, 0, 0)) {
        displaySolution(sudoku);
        status.css("color", "#288c24");
        status.text("Puzzle solved!");
    } else {
        status.css("color", "#ca2929");
        status.text("No solution found.");
    }
};

var readSudoku = function() {
    var sudoku = [];
    for (var r = 1; r <= 9; r++) {
        sudoku.push([]);
        for (var c = 1; c <= 9; c++) {
            var text = $("td.row" + r + ".col" + c).text();
            if (text === "" || text === " ") {
                text = "0";
            }
            sudoku[r-1][c-1] = parseInt(text);
        }
    }
    return sudoku;
};

var solveSudoku = function(sudoku, r, c) {
    if (c === 9) {
        c = 0;
        r++;
    }
    if (r === 9) {
        return true;
    } else {
        if (sudoku[r][c] !== 0) {
            return solveSudoku(sudoku, r, c+1);
        } else {
            for (var i = 1; i <= 9; i++) {
                if (validNum(sudoku, r, c, i)) {
                    sudoku[r][c] = i;
                    if (solveSudoku(sudoku, r, c+1)) {
                        return true;
                    }
                }
            }
            sudoku[r][c] = 0;
            return false;
        }
    }
};

var validNum = function(sudoku, r, c, num) {
    for (var i = 0; i < 9; i++) {
        if (sudoku[r][i] === num) {
            return false;
        }
        if (sudoku[i][c] === num) {
            return false;
        }
    }

    var blockRow = Math.floor(r / 3) * 3;
    var blockCol = Math.floor(c / 3) * 3;

    for (var i = blockRow; i < blockRow+3; i++) {
        for (var j = blockCol; j < blockCol+3; j++) {
            if (sudoku[i][j] === num) {
                return false;
            }
        }
    }

    return true;
};

var displaySolution = function(sudoku) {
    for (var r = 1; r <= 9; r++) {
        for (var c = 1; c <= 9; c++) {
            var value = sudoku[r-1][c-1];
            $("td.row" + r + ".col" + c).text(value.toString());
        }
    }
};
