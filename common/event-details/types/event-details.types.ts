export type EventDetails = {
    title: string;
    posterSrc: string;
    dateLabel: string;
    showtimes: string[];
    ageRating?: string;
    location?: {
        label: string;
        map?: {
            title: string;
            src: string;
        };
    };
    description?: string;
    highlight?: {
        title: string;
        text: string;
    };
    registration?: {
        required: boolean;
        url?: string;
    };
};