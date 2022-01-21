## 1. react-native splash
```js
npm i react-native-splash-screen
react-native link react-native-splash-screen

implementation project(':react-native-splash-screen') //add app/build.gradle
```
- Thủ công
```gradle
include ':react-native-splash-screen'   
project(':react-native-splash-screen').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-splash-screen/android')
//settings.gradle
```
```java
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
//MainAppliaction.java
```

```java
import android.os.Bundle; 
import org.devio.rn.splashscreen.SplashScreen;  
import com.cboy.rn.splashscreen.SplashScreen; 

public class MainActivity extends ReactActivity {
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this,true);   
        super.onCreate(savedInstanceState);
    }
}
```
- layout/launch_screen.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <ImageView android:layout_width="match_parent" android:layout_height="match_parent" android:src="@drawable/launch_screen" android:scaleType="centerCrop" />
</RelativeLayout>

```
- [ios]() https://github.com/crazycodeboy/react-native-splash-screen/tree/master/examples
- Update AppDelegate.m
```m
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"  // here

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // ...other code

    [RNSplashScreen show];  // here
    // or
    //[RNSplashScreen showSplash:@"LaunchScreen" inRootView:rootView];
    return YES;
}

@end


```
