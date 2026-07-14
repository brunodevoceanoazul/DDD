export class Slug {
    public readonly value: string;

    constructor(value: string) {
        this.value = value;
    }

    static createFromText(text: string) {
        const slugText = text
            .normalize("NFKD")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '-')
            .replace(/--+/g, '-')
            .replace(/-$/g, '');

        return new Slug(slugText);
    }
}


