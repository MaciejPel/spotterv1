export type currentSongProps = {
	currently_playing_type: string;
	is_playing: boolean;
	item: {
		id: string;
		uri: string;
		name: string;
		album: {
			name: string;
			images: { height: number; url: string }[];
		};
		artists: { id: string; name: string; uri: string; href: string }[];
	};
};

export type TrackProps = {
	id: string;
	name: string;
	uri: string;
	album: {
		images: { url: string }[];
	};
	artists: {
		id: string;
		name: string;
		uri: string;
	}[];
};

export type currentArtistsProps = {
	id: string;
	name: string;
	uri: string;
	href: string;
};

export enum AsideType {
	GRAPH,
	DATA,
}

export type ArtistCardProps = {
	name: string;
	image: string | null;
	index: number;
	uri: string;
};

export type ArtistsProps = {
	id: string;
	name: string;
	images: { url: string }[];
	uri: string;
};

export type ParentCompProps = {
	children: JSX.Element;
};

export type AsideProps = {
	type: AsideType;
	size?: number;
	setSize?: React.Dispatch<React.SetStateAction<number>>;
	legend?: boolean;
	setLegend?: React.Dispatch<React.SetStateAction<boolean>>;
};
