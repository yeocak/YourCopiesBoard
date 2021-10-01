import ClipboardListener from 'react-native-clipboard-listener';

const setClipboardListener = (doWhenCopied: (() => any)) => {
    ClipboardListener.removeListener()
    ClipboardListener.setListener(async () => {
        doWhenCopied()
    })
}
export default setClipboardListener;