import React, { useState } from 'react';
import './App.css';
import YouTube, { Options, PlayerVars } from 'react-youtube';
import { getVideoID } from './Utils';
import { FaPause, FaPlay } from 'react-icons/fa';
// import { YouTubePlayer } from 'youtube-player/dist/types';

interface Song {
	type: 'Youtube' | 'Spotify' | 'Soundcloud',
	url: string
}

const songList: Song[] = [
	{
		type: 'Youtube',
		url: 'https://www.youtube.com/watch?v=z6-FWJteNLI'
	},
	{
		type: 'Youtube',
		url: 'https://www.youtube.com/watch?v=2_fROfS8FPE'
	},
	{
		type: 'Youtube',
		url: 'https://www.youtube.com/watch?v=z6-FWJteNLI'
	},
	{
		type: 'Youtube',
		url: 'https://www.youtube.com/watch?v=LWSTy-lOnOA'
	}
]

let currentSongIndex = 0;

const App: React.FC = () => {

	console.log(`Width ${window.outerWidth}`);
	console.log(`Height ${window.outerHeight}`);

	const [player, setPlayer] = useState<any>(null);
	const [playerState, setPlayerState] = useState<number>(1);
	const [progress, setProgress] = useState<number>(0);
	const [progressTooltip, setProgressTooltip] = useState<object | any>({ text: '', display: false, location: { x: 0, y: 0 } });

	let progressY = 0;

	const playerVars: PlayerVars = {
		rel: 0,
		disablekb: 1,
		controls: 0
	}

	const opts: Options = {
		height: '390',
		width: '640',
		playerVars: playerVars
	};

	let visibility: string = 'v';

	const onReady = (e: { target: YouTubePlayer }) => {
		setInterval(() => {
			updateProgressBar(e.target);
		})
		setPlayer(e.target);
		console.log('ready');
	};

	const onPlay = () => {
		if(!player) return;
		player.playVideo();
	};

	const onPause = () => {
		if(!player) return;
		player.pauseVideo();
	};

	const onStateChange = (e: any) => {
		if(e.data === 1 || e.data === 2) {
			setPlayerState((e.data === 1) ? 2 : 1);
		} else if(e.data === 0) {
			setProgress(100);
			setPlayerState(1);
			if((currentSongIndex+1) < songList.length) {
				currentSongIndex++;
				player.loadVideoById(getVideoID(songList[currentSongIndex].url));
				console.log(player);
			}
		}
	}

	const onProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if(!player) return;
		const percent = (e.nativeEvent.offsetX/parseInt(opts.width));
		player.seekTo(percent*player.getDuration());
		updateProgressBar(player);
	}

	const updateProgressBar = (player: any) => {
		if(!player) return;
		setProgress((player.getCurrentTime()/player.getDuration())*100);
	}

	const onProgressBarMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if(!player) return;
		const time: number = (e.nativeEvent.offsetX/parseInt(opts.width))*player.getDuration();
		const formattedTime: string = (Math.floor(time / 60)) + ':' + (Math.floor(time % 60)).toString().padStart(2, '0');
		setProgressTooltip({...progressTooltip, text: formattedTime, display: true, location: { x: e.nativeEvent.x, y: progressY } });
	}

	const onProgressBarOut = (e: React.MouseEvent<HTMLDivElement>) => {
		if(!player) return;
		setProgressTooltip({...progressTooltip, display: false});
	}

	const formatTime = (time: number) => {
		if(!player) return '0:00';
		return (Math.floor(time / 60)) + ':' + (Math.floor(time % 60)).toString().padStart(2, '0');
	}

	return (
		<>
			<div className="barTooltip" 
				style={{
					display: (progressTooltip.display ? 'initial' : 'none'),
					top: `${progressTooltip.location.y-30}px`,
					left: `${progressTooltip.location.x}px`,
					textAlign: 'center' 
				}}
			>
				{progressTooltip.text}
			</div>
			<div className="App">
				<header className="App-header">
					<YouTube
						videoId={getVideoID(songList[0].url)}
						opts={opts}
						className={visibility}
						onReady={onReady}
						onStateChange={onStateChange}
					/>
				</header>
					<div className="controls">
						<div className="progressBar" 
							ref={(el) => {
								if(!el) return;
								progressY = el.getClientRects()[0].top;
							}}
							onClick={onProgressBarClick}
							onMouseMove={onProgressBarMove}
							onMouseOut={onProgressBarOut}
						>
							<div className="fillerBar" style={{ width: `${progress}%` }} />
						</div>
						<div className="timeControls">
							{
								(() => {
									if(playerState === 1) {
										return (<FaPlay onClick={onPlay} className="toggle" />);
									} else {
										return (<FaPause onClick={onPause} className="toggle" />);
									}
								})()
							}
							<div className="time">
								{
									(() => {
										if(!player) return '0:00';
										return (formatTime(player.getCurrentTime()) ? (formatTime(player.getCurrentTime()) + ' / ' + formatTime(player.getDuration())) : '0:00');
									})()
								}
							</div>
						</div>
					</div>
			</div>
		</>
	);
}

export default App;
