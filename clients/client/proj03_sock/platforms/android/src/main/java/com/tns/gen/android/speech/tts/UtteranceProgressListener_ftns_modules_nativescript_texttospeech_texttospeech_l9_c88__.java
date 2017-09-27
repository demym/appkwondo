package com.tns.gen.android.speech.tts;

public class UtteranceProgressListener_ftns_modules_nativescript_texttospeech_texttospeech_l9_c88__ extends android.speech.tts.UtteranceProgressListener implements com.tns.NativeScriptHashCodeProvider {
	public UtteranceProgressListener_ftns_modules_nativescript_texttospeech_texttospeech_l9_c88__(){
		super();
		com.tns.Runtime.initInstance(this);
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = true;
		com.tns.Runtime.callJSMethod(this, "init", void.class, args);
	}

	public void onStart(java.lang.String param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onStart", void.class, args);
	}

	public void onError(java.lang.String param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onError", void.class, args);
	}

	public void onError(java.lang.String param_0, int param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onError", void.class, args);
	}

	public void onDone(java.lang.String param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onDone", void.class, args);
	}

	public boolean equals__super(java.lang.Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

}
