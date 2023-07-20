extern crate pathfinding;

use pathfinding::prelude::bfs;

#[derive(Clone, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
struct Pos(i32, i32);

impl Pos {
  fn successors(&self) -> Vec<Pos> {
    let &Pos(x, y) = self;
    vec![Pos(x+1,y+2), Pos(x+1,y-2), Pos(x-1,y+2), Pos(x-1,y-2),
         Pos(x+2,y+1), Pos(x+2,y-1), Pos(x-2,y+1), Pos(x-2,y-1)]
  }
}

pub fn find() {
    static GOAL: Pos = Pos(4, 6);
    let result = bfs(&Pos(1, 1), |p| p.successors(), |p| *p == GOAL);
    assert_eq!(result.expect("no path found").len(), 5);
}
// Looks like we will need to use A* Algorithm, maybe build our own.
