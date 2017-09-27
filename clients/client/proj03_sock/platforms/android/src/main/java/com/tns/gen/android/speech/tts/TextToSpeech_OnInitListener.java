package com.tns.gen.android.speech.tts;

public class TextToSpeech_OnInitListener implements android.speech.tts.TextToSpeech.OnInitListener {
	public TextToSpeech_OnInitListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onInit(int param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onInit", void.class, args);
	}

}
