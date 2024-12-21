function restartGifAnimationAndSound() {
    const gifImage = document.querySelector('.windbell-animation');
    const sound = document.getElementById('windbell-sound');

    // 获取当前的路径
    const currentSrc = gifImage.src;

    // 获取基础路径，不包含文件名
    const basePath = currentSrc.substring(0, currentSrc.lastIndexOf('/')) + '/';

    // 重新加载GIF，动态构建路径并重置src，触发动画
    gifImage.src = ''; // 清空当前src
    gifImage.src = basePath + 'windbell.gif'; // 重新设置src，触发动画

    // 强制音效从头开始播放
    sound.currentTime = 0;  // 设置音效的播放时间为0
    sound.play();           // 播放音效
}

// 划过/点击 在GIF上触发音效
document.querySelector('.windbell-animation').addEventListener('mouseover', restartGifAnimationAndSound);
document.querySelector('.windbell-animation').addEventListener('click', restartGifAnimationAndSound);

