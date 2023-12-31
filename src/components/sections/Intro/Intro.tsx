import classNames from 'classnames/bind';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

import Section from '../../common/Section';
import FlowerIcon from '../../icons/FlowerIcon';
import HeartIcon from '../../icons/HeartIcon';
import styles from './Intro.module.scss';

const cx = classNames.bind(styles);

type IntroProps = {
	brideName: string;
	date: string;
	groomName: string;
	locationName: string;
	message: string;
};

export default function Intro({ brideName, date, groomName, locationName, message }: IntroProps) {
	const parsedDate = parseISO(date);
	const weddingDate = format(parsedDate, 'yyyy년 M월 d일 eeee', { locale: ko });

	return (
		<Section className={cx('container')}>
			<div className={cx('wrapper__persons')}>
				<span>{groomName}</span>
				<HeartIcon className={cx('icon__heart')} />
				<span>{brideName}</span>
			</div>
			<div className={cx('wrapper__location')}>
				<span>{weddingDate}</span>
				<span>{locationName}</span>
			</div>
			<FlowerIcon className={cx('icon__flower')} />
			<div className={cx('text')}>{message}</div>
		</Section>
	);
}
