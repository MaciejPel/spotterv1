import { ArtistCardProps } from '../types/types';
import { BsPersonBoundingBox } from 'react-icons/bs';

const ArtistCard: React.FC<ArtistCardProps> = ({ name, image, index, uri }) => {
	return (
		<a href={uri} className="artists__box">
			{image ? (
				<img src={image} alt="Artist" className="artists__image" />
			) : (
				<div className="artists__missing">
					<BsPersonBoundingBox size={48} />
				</div>
			)}
			<div className="artists__name">{index + '. ' + name}</div>
		</a>
	);
};

export default ArtistCard;
