import short from 'short-uuid';

export class Song {

    title: string;
    singer: string;
    lyricist: string;
    composer: string;
    album: string;
    year: string;
    genre: string;
    lyrics: string;
    metaphors: Metaphor[]
    trashed: boolean;

    constructor() {
        this.title = '';
        this.singer = '';
        this.lyricist = '';
        this.composer = '';
        this.album = '';
        this.year = '';
        this.genre = '';
        this.lyrics = '';
        this.metaphors = [];
        this.trashed = false;
    }

    isValid(): string[] {
        let errors = [];
        if (this.title === '') {
            errors.push('Title is required');
        }
        if (this.singer === '') {
            errors.push('Singer is required');
        }
        if (this.lyricist === '') {
            errors.push('Lyricist is required');
        }
        if (this.composer === '') {
            errors.push('Composer is required');
        }
        if (this.album === '') {
            errors.push('Album is required');
        }
        if (this.year === '') {
            errors.push('Year is required');
        }
        if (this.genre === '') {
            errors.push('Genre is required');
        }
        if (this.lyrics === '') {
            errors.push('Lyrics is required');
        }
        return errors;
    }

}

export class Metaphor {

    start: number;
    end: number;
    metaphor: string;
    explanation: string;

    constructor() {
        this.start = 0;
        this.end = 0;
        this.metaphor = '';
        this.explanation = '';
    }

    static fromObject(obj: any): Metaphor {
        const metaphor = new Metaphor();
        metaphor.start = obj.start;
        metaphor.end = obj.end;
        metaphor.metaphor = obj.metaphor;
        metaphor.explanation = obj.explanation || 'No Explanation Provided';
        return metaphor;
    }
}
