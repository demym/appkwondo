package com.tns.gen.android.media;

public class MediaRecorder_OnInfoListener implements android.media.MediaRecorder.OnInfoListener {
	public MediaRecorder_OnInfoListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onInfo(android.media.MediaRecorder param_0, int param_1, int param_2)  {
		java.lang.Object[] args = new java.lang.Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		com.tns.Runtime.callJSMethod(this, "onInfo", void.class, args);
	}

}
