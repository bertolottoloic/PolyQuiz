import { Quiz } from '../models/quiz.models';
import { Handicap } from '../models/handicap.models';

export const QUIZ_LIST: Quiz[] = [
    {
        name: 'football',
        theme: 'sport',
        id:'1',
        trouble: Handicap.Memoire,
        image:"../../../assets/img/Papy-Brossard.jpg",
    },
]