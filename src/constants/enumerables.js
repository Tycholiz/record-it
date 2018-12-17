export const Mode = {
	Normal: 'normal',
	Select: 'select',
	Action: 'action',
	ActionSingle: 'actionSingle'
}
Object.freeze(Mode)

export const Modification = {
	Add: 'add',
	Remove: 'remove',
	Empty: 'empty'
}
Object.freeze(Modification)

export const UnitType = {
	File: 'file',
	Folder: 'folder',
}
Object.freeze(UnitType)

export const ControlView = {
	Record: 'record',
	Playback: 'playback',
}
Object.freeze(ControlView)

export const RecordStatus = {
	NotStarted: 'NOT_STARTED',
	NotRecording: 'NOT_RECORDING',
	Paused: 'PAUSED',
	Recording: 'RECORDING',
	RecordingComplete: 'RECORDING_COMPLETE',
	Buffering: 'BUFFERING',
	Error: 'ERROR'
}
Object.freeze(RecordStatus)

export const PlaybackStatus = {
	NoFileAvailable: 'NO_FILE_AVAILABLE',
	Loading: 'LOADING',
	Playing: 'PLAYING',
	Paused: 'PAUSED',
	Stopped: 'STOPPED',
	Buffering: 'BUFFERING',
	Error: 'ERROR',

}
