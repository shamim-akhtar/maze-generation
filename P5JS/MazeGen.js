var Directions = Object.freeze({
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
  NONE: 4,
});


let CELL_WIDTH = 15;
let CELL_HEIGHT = 15;
let GAP = 3;
let OFFSET = 20;

class Cell {
  constructor(x, y) {
    this._x = x;
    this._y = y;
    this._visited = false;
    this._flag = [true, true, true, true];
  }

  setColor(color) {
    stroke(color);
  }

  // draw the cell
  draw() {

    var offset = [OFFSET + this._x * (CELL_WIDTH + GAP), 
                  OFFSET + this._y * (CELL_HEIGHT + GAP)];

    if (this._flag[Directions.UP]) {
      line(
        offset[0], offset[1],
        offset[0] + CELL_WIDTH, offset[1]);
    }
    if (this._flag[Directions.RIGHT]) {
      line(
        offset[0] + CELL_WIDTH, offset[1],
        offset[0] + CELL_WIDTH, offset[1] + CELL_HEIGHT);
    }
    if (this._flag[Directions.DOWN]) {
      line(
        offset[0] + CELL_WIDTH, offset[1] + CELL_HEIGHT,
        offset[0], offset[1] + CELL_HEIGHT);
    }
    if (this._flag[Directions.LEFT]) {
      line(
        offset[0], offset[1] + CELL_HEIGHT,
        offset[0], offset[1]);
    }
  }
}

class Mouse {
  constructor() {
    this._x = 0;
    this._y = 0;
  }

  setPosition(x, y) {
    this._x = x;
    this._y = y;
  }

  setColor(color) {
    fill(color);
  }

  draw() {
    var offset = [OFFSET + this._x * (CELL_WIDTH + GAP), 
                  OFFSET + this._y * (CELL_HEIGHT + GAP)];
    
    rect(offset[0] + 3, offset[1] + 3, 
         CELL_WIDTH - 6, CELL_HEIGHT - 6);
  }
}

class Maze {
  constructor(cols, rows) {
    this._cols = cols;
    this._rows = rows;

    this._cells = [];
    for (var i = 0; i < this._cols; i++) {
      this._cells[i] = [];
      for (var j = 0; j < this._rows; j++) {
        this._cells[i][j] = new Cell(i, j);
      }
    }
  }

  setLineColor(color) {
    stroke(color);
  }

  getCell(x, y) {
    return this._cells[x][y];
  }

  draw() {
    for (var i = 0; i < this._cols; i++) {
      for (var j = 0; j < this._rows; j++) {
        this._cells[i][j].draw(1.0);
      }
    }
  }

  removeCellWall(x, y, dir) {
    if (dir != Directions.NONE) {
      var cell = this.getCell(x, y);
      cell._flag[dir] = false;
    }

    var opp = Directions.NONE;
    switch (dir) {
      case Directions.UP:
        if (y > 0) {
          opp = Directions.DOWN;
          --y;
        }
        break;
      case Directions.RIGHT:
        if (x < this._cols - 1) {
          opp = Directions.LEFT;
          ++x;
        }
        break;
      case Directions.DOWN:
        if (y < this._rows - 1) {
          opp = Directions.UP;
          ++y;
        }
        break;
      case Directions.LEFT:
        if (x > 0) {
          opp = Directions.RIGHT;
          --x;
        }
        break;
    }

    if (opp != Directions.NONE) {
      var cell1 = this.getCell(x, y);
      cell1._flag[opp] = false;
    }
  }

  getNeighbours(cx, cy) {
    var neighbours = [];
    for (var dir = Directions.UP; dir < Directions.NONE; dir++) {
      var x = cx;
      var y = cy;
      switch (dir) {
        case Directions.DOWN:
          if (y < this._rows - 1) {
            ++y;
            if (!this._cells[x][y]._visited)
              neighbours.push([
                Directions.DOWN,
                this._cells[x][y]
              ]);
          }
          break;
        case Directions.RIGHT:
          if (x < this._cols - 1) {
            ++x;
            if (!this._cells[x][y]._visited)
              neighbours.push([
                Directions.RIGHT,
                this._cells[x][y]
              ]);
          }
          break;
        case Directions.UP:
          if (y > 0) {
            --y;
            if (!this._cells[x][y]._visited)
              neighbours.push([
                Directions.UP,
                this._cells[x][y]
              ]);
          }
          break;
        case Directions.LEFT:
          if (x > 0) {
            --x;
            if (!this._cells[x][y]._visited)
              neighbours.push([
                Directions.LEFT,
                this._cells[x][y]
              ]);
          }
          break;
      }
    }
    return neighbours;
  }
}

class MazeGenerator {
  constructor(maze, mouse) {
    this._maze = maze;
    this._mouse = mouse;
    this._stack = [];
    this._stack.push(this._maze.getCell(this._mouse._x, this._mouse._y));
  }

  generateStep() {

    if (this._stack.length == 0) return;

    var c = this._stack[this._stack.length - 1];
    this._mouse.setPosition(c._x, c._y);

    var neighbours = this._maze.getNeighbours(c._x, c._y);

    if (neighbours.length != 0) {
      var index = 0;
      if (neighbours.length > 1) {
        index = Math.floor(Math.random() * neighbours.length);
      }
      var item = neighbours[index];
      var neighbour = item[1];
      neighbour._visited = true;
      this._maze.removeCellWall(c._x, c._y, item[0]);

      this._stack.push(neighbour);
      this._mouse.setPosition(neighbour._x, neighbour._y);
    } else {
      this._stack.pop();
    }
  }
}

//The main app.
class MyApp {
  constructor(rows, cols) {
    var mpos = {
      x: 0,
      y: 0
    };

    this.maze = new Maze(cols, rows);
    this.maze.setLineColor(color(0, 0, 255));
    this.mouse = new Mouse();
    this.mouse.setPosition(mpos.x, mpos.y);
    this.mouse.setColor(color(255, 0, 0));
    this.maze_generator = new MazeGenerator(this.maze, this.mouse);
  }

  draw() {
    this.maze.draw();
    this.mouse.draw();
  }
}

let app;
let timer;

function keyPressed() {
  if (keyCode === ENTER) {
    //app.maze_generator.generateStep();
  }
}

function setup() {
  createCanvas(450, 450);
  timer = 100;
  app = new MyApp(20, 20);
}

function draw() {
  background(color(200, 200, 200));
  if (millis() > timer) {
    app.maze_generator.generateStep();
    timer += 100;
  }
  app.draw();
}