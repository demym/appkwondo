package com.tns.gen.android.speech;

public class RecognitionListener implements android.speech.RecognitionListener {
	public RecognitionListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onReadyForSpeech(android.os.Bundle param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onReadyForSpeech", void.class, args);
	}

	public void onBeginningOfSpeech()  {
		java.lang.Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onBeginningOfSpeech", void.class, args);
	}

	public void onRmsChanged(float param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onRmsChanged", void.class, args);
	}

	public void onBufferReceived(byte[] param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onBufferReceived", void.class, args);
	}

	public void onEndOfSpeech()  {
		java.lang.Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onEndOfSpeech", void.class, args);
	}

	public void onError(int param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onError", void.class, args);
	}

	public void onResults(android.os.Bundle param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onResults", void.class, args);
	}

	public void onPartialResults(android.os.Bundle param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onPartialResults", void.class, args);
	}

	public void onEvent(int param_0, android.os.Bundle param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onEvent", void.class, args);
	}

}
