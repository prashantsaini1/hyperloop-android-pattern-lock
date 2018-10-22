


var Activity                = require('android.app.Activity');
var ViewGroupLayoutParams   = require('android.view.ViewGroup.LayoutParams');
var LayoutParams            = require('android.widget.FrameLayout.LayoutParams');
var Gravity                 = require('android.view.Gravity');
var Color                   = require('android.graphics.Color');
var List                    = require('java.util.List');
var PatternLockView         = require('com.andrognito.patternlockview.PatternLockView');
var PatternLockViewListener = require('com.andrognito.patternlockview.listener.PatternLockViewListener');
var PatternLockUtils        = require('com.andrognito.patternlockview.utils.PatternLockUtils');
var ResourceUtils           = require('com.andrognito.patternlockview.utils.ResourceUtils');


var activity = new Activity(Ti.Android.currentActivity);
var mPatternLockView = new PatternLockView(activity);
var layoutParams = new LayoutParams(720, 720, Gravity.CENTER);

mPatternLockView.setLayoutParams(layoutParams);
mPatternLockView.setDotCount(3);
mPatternLockView.setDotNormalSize(24);
mPatternLockView.setDotSelectedSize(36);
mPatternLockView.setPathWidth(18);
mPatternLockView.setNormalStateColor(Color.parseColor("#000000"));
mPatternLockView.setCorrectStateColor(Color.parseColor("#159ec9"));
mPatternLockView.setWrongStateColor(Color.parseColor("#c81010"));
mPatternLockView.setDotAnimationDuration(150);
mPatternLockView.setPathEndAnimationDuration(100);

mPatternLockView.addPatternLockListener(new PatternLockViewListener({
    'onStarted' : function () {
        Ti.API.info('** Pattern drawing started...');
    },
    'onProgress' : function (progressPattern) {
        Ti.API.info('** onProgress - ' + PatternLockUtils.patternToString(mPatternLockView, progressPattern));
    },
    'onComplete' : function (progressPattern) {
        // returns index of the dots starting from top-left to top-right and then from top-bottom
        alert('** onComplete - ' + PatternLockUtils.patternToString(mPatternLockView, progressPattern));
    },
    'onCleared' : function () {
        Ti.API.info('** onCleared...');
    }
}));

$.view.add(mPatternLockView);


function showWrongPattern(e){
    mPatternLockView.setViewMode(PatternLockView.PatternViewMode.WRONG);
}

function showCorrectPattern(e){
    mPatternLockView.setViewMode(PatternLockView.PatternViewMode.CORRECT);
}

function clearPattern() {
    mPatternLockView.clearPattern();
}
