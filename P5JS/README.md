# How to Generate Mazes Using Depth-First Algorithm

![Image of Maze in P5](https://faramira.com/wp-content/uploads/2019/11/maze-1-930x620.jpg)

## Introduction to Maze Generation
A maze is a path or collection of paths, typically from an entrance to a goal. Maze generation is the process of designing the layout of passages and walls within a maze by using a computer program. 

Before continuing with the tutorial take a look at the final implementation below using P5js. (Note: Although I have used pre tag, yet the formatting is not retained. Not sure how to solve the formatting issue). Click on the Play button to see the maze generation in action.

### [Play](https://editor.p5js.org/shamim/sketches/FHhb3jwST)

In this repository, we will concentrate on 
#### 1. the generation of the maze and not on solving how to traverse a maze.

## How to Generate Mazes
The goal is to create a layout of passages and walls within a maze using Javascript.

Before we can solve the problem we will need to model the problem. But what is meant by Modelling the Problem?

In generic terms, modelling a problem is the art of formulating the problem at hand in terms of precisely described, well-understood building blocks and logic to reach a solution. In computer science, proper modelling is the key to applying algorithmic design techniques to any real-world problems. Real-world applications involve real-world problems.

You might be working on a system that simulates air traffic in and around an airport, you might be working on optimizing the dispatch of delivery vans for an e-commerce application, or you might be working to search through patterns in a large image set. To solve such problems you will use some sort of modelling techniques to reduce the problem in terms of rigorously defined abstract structures such as graphs, trees, permutations, sets and so on.

## Depth-First Algorithm
We will generate Mazes Using Depth-First Algorithm.

We will implement the depth-first algorithm with a stack. This approach is one of the simplest ways to generate a maze using a computer program. To do this we will first create a grid of cells to represent the room structure. For our problem we will only have 4 sided cells, each cell starting with four walls.

The program will start from a random cell, then selects a random neighbour cell that has not yet been visited. The program then removes the wall between the two cells and marks the new cell as visited. It also adds it to the stack to facilitate backtracking. When a cell is found to have no unvisited neighbours the program backtracks through the path by popping cells from the stack until it reaches a cell that has an unvisited neighbour. This process continues until every cell has been visited, causing the program to backtrack all the way back to the starting cell.
