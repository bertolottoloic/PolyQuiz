import { Profile, Handicap } from '../models/profile.model';

export const PROFILE_LIST: Profile[] = [
    {
        name: 'Dacosta',
        firstName: 'Pedro',
        id:'1',
        trouble: Handicap.Memoire
    },
    {
        name: 'Meulle',
        firstName: 'Nathan',
        id:'2',
        trouble: Handicap.Moteur
    },
    {
        name: 'Delm',
        firstName: 'Vinze',
        id:'3',
        trouble: Handicap.Vue
    }
]