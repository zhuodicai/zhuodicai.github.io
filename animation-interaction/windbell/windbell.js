const ORIGINAL_TITLE = "Zhuodi Cai";
const BELL_TITLE = "⁺⊹ 𓇢𓆸𓏲";

const sound = document.getElementById('windbell-sound');

// 播放结束恢复标题
sound.addEventListener('ended', () => {
    document.title = ORIGINAL_TITLE;
});

function restartGifAnimationAndSound() {
    const gifImage = document.querySelector('.windbell-animation');

    // 获取当前的路径
    const currentSrc = gifImage.src;

    // 获取基础路径，不包含文件名
    const basePath = currentSrc.substring(0, currentSrc.lastIndexOf('/')) + '/';

    // 重新加载GIF，触发动画
    gifImage.src = '';
    gifImage.src = basePath + 'windbell.gif';

    // 修改 tab 标题
    document.title = BELL_TITLE;

    // 从头播放音效
    sound.currentTime = 0;
    sound.play();
}

// 划过/点击 GIF 时触发
const windbell = document.querySelector('.windbell-animation');
windbell.addEventListener('mouseover', restartGifAnimationAndSound);
windbell.addEventListener('click', restartGifAnimationAndSound);