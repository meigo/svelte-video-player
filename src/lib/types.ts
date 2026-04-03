export interface PlayerConfig {
	controlsHeight: string;
	trackHeight: string;
	thumbSize: string;
	centerIconSize: string;
	color: string;
	playerBgColor: string;
	focusColor: string;
	barsBgColor: string;
	iconColor: string;
	loop: boolean;
	borderRadius: string;
	controlsOnPause: boolean;
	timeDisplay: boolean;
}

export interface MediaSessionConfig {
	title?: string;
	artist?: string;
	album?: string;
	artwork?: MediaImage[];
}

export interface TextTrackConfig {
	src: string;
	srclang: string;
	label: string;
	default?: boolean;
}

export interface QualityLevel {
	height: number;
	width?: number;
	bitrate?: number;
	label?: string;
}

export interface SourceAdapter {
	attach(video: HTMLVideoElement, src: string): void;
	detach(): void;
	destroy(): void;
	readonly levels: QualityLevel[];
	readonly currentLevel: number;
	setLevel(index: number): void;
}

export interface VideoSource {
	src: string;
	type?: string;
}

export interface TimeRange {
	start: number;
	end: number;
}

export interface Chapter {
	time: number;
	label: string;
}
