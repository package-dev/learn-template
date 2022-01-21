package com.rnapp;

import com.facebook.react.ReactActivity;

import android.os.Bundle;//react-native-splash-screeen
import org.devio.rn.splashscreen.SplashScreen;//react-native-splash-screeen
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "rnapp";
  }
  @Override //react-native-splash-screeen
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this,true);
    super.onCreate(savedInstanceState);
  }
}
