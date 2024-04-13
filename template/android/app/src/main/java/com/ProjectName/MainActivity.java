package com.ProjectName;

import com.facebook.react.ReactActivity;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.ContentResolver;
import android.content.Intent;
import android.media.AudioAttributes;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;

import androidx.core.app.NotificationCompat;

import com.rnfs.RNFSPackage;

import org.devio.rn.splashscreen.SplashScreen;//react-native-splash-screeen

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(null);

    }

    @Override
    protected String getMainComponentName() {
        return "ProjectName";
    }
}
