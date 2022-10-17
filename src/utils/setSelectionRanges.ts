export function setSelectionRanges(range: Range[]) {
    if (range) {
        if (window.getSelection) {
            const selection = window.getSelection();
            selection?.removeAllRanges();
            for (var i = 0, len = range.length; i < len; ++i) {
                selection?.addRange(range[i]);
            }
        }
    }
}