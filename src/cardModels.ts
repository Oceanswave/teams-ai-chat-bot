/**
 * Adaptive Card data model. Properties can be referenced in an adaptive card via the `${var}`
 * Adaptive Card syntax.
 */
export interface CardData {
  title: string;
  body: string;
}


export interface AudioCardData {
  title: string;
  body: string;
  audioUrl: string;
}

export interface ImageCardData {
  title: string;
  body: string;
  imageUrl: string;
}
