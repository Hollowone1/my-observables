import { interval, merge, combineLatest, fromEvent } from 'rxjs';
import { tap, scan, takeWhile } from 'rxjs/operators';

const gamePipe =(x: number,y: any) =>({x,y,checked:false});
const gameSize= 10;
const createPipes = (y: any) =>(random =>Array.from(Array(gameSize).keys())
.map(e => gamePipe(e,y)) //Créer un observable a partir des valeurs données par l'observable source
.filter(e => e.x < random || e.x > random + 2))
( //Filtre les objets emis par l'observable source en émettant ceux satisfaisant un certain préddicat
    Math.floor(Math.random() * Math.floor(gameSize))
);

const gamePipes$ = interval(500).pipe(
    scan < any,
    any > ( acc => (acc.length < 2? [...acc, createPipes(gameSize)] : acc)
    .filter((c: any[]) => c.some((e: { y: number; }) => e.y > 0))
    .map((cols: any[]) => cols.map((e: { x: number; y: number; }) => gamePipe(e.x,e.y - 1))),
    [createPipes(gameSize / 2), createPipes(gameSize)]),
);

const fly = (xPos: number) => (xPos > 0 ? (xPos -= 1) : xPos);
const fall = (xPos: number) => (xPos < gameSize - 1 ? (xPos += 1) : gameSize - 1);
const bird$ = merge(interval(300), fromEvent(document, 'keydown')).pipe(
    scan < any,
    any >
      ((xPos, curr) => (curr instanceof KeyboardEvent ? fly(xPos) : fall(xPos)), //vérifie le type d'une variable de type keyboard event
      gameSize - 1)
  );

  const updateGame = (bird: any | number, pipes: any[]) =>
  (game => (
    pipes.forEach((col: any[]) => col.forEach((v: { x: any | number; y: any | number; }) => (game[v.x][v.y] = 2))),
    (game[bird][0] = 1),
    game
  ))(
    Array(gameSize)
      .fill(0)
      .map(e => Array(gameSize).fill(0))
  );