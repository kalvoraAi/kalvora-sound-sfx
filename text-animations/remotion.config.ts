import {Config} from '@remotion/cli/config';

// PNG frames are required so transparency is preserved.
Config.setVideoImageFormat('png');
Config.setOverwriteOutput(true);
