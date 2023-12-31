import classNames from 'classnames/bind';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { BASE_URL } from '../../../api';
import Section from '../../common/Section';
import ClipboardIcon from '../../icons/ClipboardIcon';
import KakaoIcon from '../../icons/KakaoIcon';
import styles from './Share.module.scss';

const cx = classNames.bind(styles);
const IMAGE_URL = 'https://chan9yu.github.io/wedding-invitation_app/assets/images/share_img.png' as const;

type ShareProps = {
	brideName: string;
	date: string;
	groomName: string;
};

export default function Share({ brideName, date, groomName }: ShareProps) {
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js';
		script.async = true;

		document.head.appendChild(script);

		script.onload = () => {
			if (!window.Kakao.isInitialized()) {
				window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY);
			}
		};
	}, []);

	const handleShareKakao = () => {
		window.Kakao.Share?.sendDefault({
			objectType: 'feed',
			content: {
				title: `${groomName} ♥️ ${brideName} 결혼합니다.`,
				description: `${format(parseISO(date), 'M월 d일 eeee aaa h시', { locale: ko })}`,
				imageUrl: IMAGE_URL,
				link: { mobileWebUrl: BASE_URL, webUrl: BASE_URL }
			},
			buttons: [
				{
					title: '청접장 보기',
					link: { mobileWebUrl: BASE_URL, webUrl: BASE_URL }
				}
			]
		});
	};

	const handleCopy = () => {
		alert('복사가 완료되었습니다.');
	};

	return (
		<Section title="공유하기">
			<div className={cx('container')}>
				<button onClick={handleShareKakao}>
					<KakaoIcon className={cx('icon')} />
				</button>
				<CopyToClipboard text={BASE_URL} onCopy={handleCopy}>
					<button>
						<ClipboardIcon className={cx('icon')} />
					</button>
				</CopyToClipboard>
			</div>
		</Section>
	);
}
