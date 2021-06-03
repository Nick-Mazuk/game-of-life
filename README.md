# Game of Life (new)

A take on [Conway's Game](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) of Life but with two "species" viewable at <https://nick-mazuk.github.io/game-of-life/>

## The Premise

Conway's Game of Life deals with one species that requires the correct population density to grow. To dense and it will die, to sparse and it can't reproduce. This version has a third concept, if it is surrounded too much by the other species, it will also die.

## The Original Rules

Each square of the grid (or pixel on the screen) represents one organism of the species. A colored square represents a living organism. A blank square represents a dead organism. Each setup determines the next setup according to the following rules:

1. Every square with less than 2 living neighbors dies from under-population
2. Any square with 2 or 3 living neighbors lives
3. Any square with 4 or more living neighbors dies from over-population
4. Any dead square with 3 living neighbors becomes alive

## The New Rules

Because of the addition of the second species, a new one is added:

- If a square has is surrounded by more of its opposing species than its own, then it will die

To make the final product have some aesthetic pleasure, some of the numbers for the other rules changed leaving the final rule set:

1. Every square with less than 2 living neighbors dies from under-population
2. Any square with 2 or 3 living neighbors lives
3. Any square with 4 or more living neighbors dies from over-population
4. Any dead square with 3 or living neighbors and less than 2 opposing neighbors becomes alive
5. If a square has is surrounded by more of its opposing species than its own, then it will die
