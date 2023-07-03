export interface Square {
    value: string | null;
  }
  
  export interface Game {
    squares: Square[];
    xIsNext: boolean;
    result: string | null;
    xScore: number;
    oScore: number;
  }
  
  export const calculateWinner = (squares: Square[]): string | null => {
    // ... calculateWinner implementation ...
  
    // If no winner is found, return null
    return null;
  };
  